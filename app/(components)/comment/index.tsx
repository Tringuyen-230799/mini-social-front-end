import {
  CommentPayload,
  EditCommentPayload,
  IComment,
} from "@/app/(shared)/types/comments";
import { cn } from "@/app/(shared)/utils/clsx";
import { getTimeOfComment } from "@/app/(shared)/utils/time";
import {
  CloseCircleFilled,
  EllipsisOutlined,
  PictureOutlined,
  SendOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Text from "antd/es/typography/Text";
import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Editor from "../editor/Editor";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import useEditComment from "@/app/(shared)/hooks/useEditComment";

export const Comment = ({
  comment,
  setShowReplyInput,
  showReplyInput,
  showReply,
  totalReplies,
  setShowReply,
  classNames,
}: {
  comment: IComment;
  showReplyInput: boolean;
  showReply: boolean;
  setShowReplyInput: Dispatch<SetStateAction<boolean>>;
  setShowReply: Dispatch<SetStateAction<boolean>>;
  totalReplies: number;
  classNames?: string;
}) => {
  const originalImgSrc = comment.resources?.[0].url;
  const { user } = useAuth();
  const isOwner = user?.id === comment.user.id;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isCanEdit, setIsCanEdit] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [src, setSrc] = useState<string>(originalImgSrc);
  const [content, setContent] = useState(comment?.content);

  const { editComment } = useEditComment({
    commentId: comment.id,
    onSuccess: (data) => {
      setSrc(data?.resource?.url);
      setContent(data.content);
    },
  });

  const handleOpenFileInput = () => {
    inputRef?.current?.click();
  };

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const files = e.target?.files;
    if (files) {
      const imgSrc = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setSrc(imgSrc);
    }
  };

  const handleSubmit = async (content: CommentPayload) => {
    if (!content) return;

    const newComment = {
      content,
      postId: comment.post_id,
      ...(comment?.parent_comment_id
        ? {
            parentId: comment.parent_comment_id,
          }
        : null),
      ...(file
        ? { image: file, oldImgSrc: originalImgSrc }
        : { oldImgSrc: src }),
    } as EditCommentPayload;

    try {
      editComment(newComment);
      setIsCanEdit(false);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleRemoveImgSrc = () => {
    setFile(undefined);
    if (src) {
      URL.revokeObjectURL(src);
    }
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
    setSrc("");
  };

  const handleUndoContent = () => {
    setIsCanEdit(false);
    setSrc(originalImgSrc);
    setFile(undefined);
    setContent(comment.content);
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("flex items-start gap-2 comment", classNames)}
      onMouseEnter={() => {
        if (isOwner) {
          setShowEdit(true);
        }
      }}
      onMouseLeave={() => {
        if (isOwner) {
          setShowEdit(false);
        }
      }}
    >
      <Avatar
        size={32}
        src={comment.user.avatar}
        icon={!comment.user.avatar && <UserOutlined />}
        className="shrink-0"
      />
      <div className={clsx("flex-1", comment.resources && "space-y-2")}>
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "bg-gray-100 rounded-2xl px-3 py-2 inline-block max-w-full capitalize",
              isCanEdit && "w-full",
            )}
          >
            {!isCanEdit && (
              <p className="font-semibold text-sm">{comment.user.username}</p>
            )}
            <Editor
              editable={isCanEdit}
              handleOnSubmit={handleSubmit}
              placeholder={"Change your comment"}
              content={content}
              key={comment.id}
              containerRef={containerRef}
              onUndo={handleUndoContent}
            />

            {isCanEdit && (
              <div className="self-end flex justify-between">
                <div className="flex">
                  <Button
                    variant="text"
                    className="bg-transparent! border-none!"
                    icon={
                      <SmileOutlined className="text-base! cursor-pointer" />
                    }
                  />
                  <Button
                    variant="text"
                    className="bg-transparent! border-none!"
                    onClick={handleOpenFileInput}
                    icon={
                      <PictureOutlined className="text-base! cursor-pointer" />
                    }
                  />
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleOnchange}
                    style={{ display: "none" }}
                  />
                </div>
                <Button
                  // disabled={isCreating}
                  variant="text"
                  className="bg-transparent! border-none!"
                  icon={<SendOutlined className="text-blue-900!" />}
                />
              </div>
            )}
          </div>
          {!isCanEdit && showEdit && (
            <Button
              shape="circle"
              size="small"
              icon={<EllipsisOutlined className="text-xs!" />}
              onClick={() => setIsCanEdit(true)}
            />
          )}
        </div>

        {src && (
          <div className="w-full h-full flex items-start gap-2">
            <Image
              src={src}
              alt="img-cmt"
              width={200}
              height={200}
              className="object-cover rounded-xl"
              unoptimized
            />
            {isCanEdit && (
              <CloseCircleFilled
                style={{ fontSize: 24 }}
                className="text-neutral-300! cursor-pointer"
                onClick={handleRemoveImgSrc}
              />
            )}
          </div>
        )}

        <div>
          <div className="flex gap-4">
            <Text
              style={{ fontSize: 12 }}
              className="font-medium! text-neutral-500!"
            >
              {getTimeOfComment(comment.created_at)}
            </Text>
            <Text
              style={{ fontSize: 12 }}
              className="font-medium! text-neutral-500! hover:text-blue-600! hover:underline cursor-pointer"
            >
              like
            </Text>
            <Text
              style={{ fontSize: 12 }}
              className="font-medium! text-neutral-500! cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowReplyInput(!showReplyInput);
              }}
            >
              reply
            </Text>
            {totalReplies > 0 && (
              <Text
                style={{ fontSize: 12 }}
                className="font-medium! text-neutral-500! cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReply(!showReply);
                }}
              >
                {showReply
                  ? "Hide all the comments"
                  : `See all the comments (${totalReplies})`}
              </Text>
            )}
          </div>

          {isCanEdit && (
            <Text
              style={{ fontSize: 12 }}
              className="font-medium!  text-blue-500! hover:text-blue-600! cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleUndoContent();
              }}
            >
              Click here to <span className="font-bold!">undo</span>
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};
