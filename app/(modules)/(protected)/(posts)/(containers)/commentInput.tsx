"use client";
import Editor from "@/app/(components)/editor/Editor";
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
} from "@ant-design/icons";
import { Avatar, Button } from "antd";

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

  const handleSubmit = async (content: CommentPayload) => {
    if (!content) return;

    const newComment = {
      content,
      parentId: reachLimit ? rootCommentId : parentId,
      postId,
    };

    try {
      onCreate(newComment);
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
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
              className="bg-transparent! border-none!"
              icon={<PictureOutlined className="text-base! cursor-pointer" />}
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
    </div>
  );
};

export default CommentInput;
