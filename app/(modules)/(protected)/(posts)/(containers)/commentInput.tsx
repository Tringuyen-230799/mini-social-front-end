"use client";
import Editor from "@/app/(components)/editor/Editor";
import Upload from "@/app/(components)/upload";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import {
  CommentPayload,
  CreateCommentPayload,
  User,
} from "@/app/(shared)/types/comments";
import { cn } from "@/app/(shared)/utils/clsx";
import {
  UserOutlined,
  SendOutlined,
  SmileOutlined,
  PictureOutlined,
  CloseOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

interface CommentInputProps {
  postId: number;
  parentId?: number;
  placeholder?: string;
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  className?: string;
  reachLimit?: boolean;
  rootCommentId?: number;
  onCreate: (payload: CreateCommentPayload) => void;
  isCreating: boolean;
  depth: number;
  author?: User;
}

const CommentInput = ({
  postId,
  parentId,
  placeholder = "Write a comment...",
  className = "",
  reachLimit,
  rootCommentId,
  onCreate,
  isCreating,
  depth,
  author,
}: CommentInputProps) => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [src, setSrc] = useState<string>();

  const handleSubmit = async (content: CommentPayload) => {
    if (!content) return;

    const newComment = {
      content,
      parentId: reachLimit ? rootCommentId : parentId,
      postId,
      ...(file ? { image: file } : null),
    };

    try {
      onCreate(newComment);
      setFile(undefined);
      if (src) {
        URL.revokeObjectURL(src);
      }
      setSrc("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

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

  return (
    <div
      className={cn(
        "flex items-start gap-2 pb-2",
        {
          "pl-10 pt-2": !reachLimit && depth != 0,
        },
        className,
      )}
    >
      <Avatar
        size={32}
        src={user?.avatar_url}
        icon={!user?.avatar_url && <UserOutlined />}
        className="flex-shrink-0"
      />

      <div className="w-full space-y-2">
        <div className="w-full bg-neutral-100 rounded-2xl p-1">
          <Editor
            editable
            handleOnSubmit={handleSubmit}
            placeholder={placeholder}
            author={author!}
          />

          <div className="self-end flex justify-between">
            <div className="flex">
              <Button
                disabled={isCreating}
                variant="text"
                className="bg-transparent! border-none!"
                icon={<SmileOutlined className="text-base! cursor-pointer" />}
              />
              <Button
                disabled={isCreating}
                variant="text"
                onClick={handleOpenFileInput}
                className="bg-transparent! border-none!"
                icon={<PictureOutlined className="text-base! cursor-pointer" />}
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
              disabled={isCreating}
              variant="text"
              className="bg-transparent! border-none!"
              icon={<SendOutlined className="text-blue-900!" />}
            />
          </div>
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
            <CloseCircleFilled
              style={{ fontSize: 24 }}
              className="text-neutral-300! cursor-pointer"
              onClick={handleRemoveImgSrc}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
