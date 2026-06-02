"use client";

import useCreateComment from "@/app/(shared)/hooks/useCreateComment";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import { CreateCommentPayload } from "@/app/(shared)/types/comments";
import {
  UserOutlined,
  SendOutlined,
  SmileOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface CommentInputProps {
  postId: number;
  parentId?: number;
  placeholder?: string;
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  className?: string;
}

const CommentInput = ({
  postId,
  parentId,
  placeholder = "Write a comment...",
  autoFocus = true,
  className = "",
}: CommentInputProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const { createComment, isCreating } = useCreateComment();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    const newComment = {
      content,
      parentId,
      postId,
    } as CreateCommentPayload;

    try {
      createComment(newComment);
      setContent("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`flex items-start gap-2 pb-2 ${className}`}>
      <Avatar
        size={32}
        src={user?.avatar_url}
        icon={!user?.avatar_url && <UserOutlined />}
        className="flex-shrink-0"
      />

      <div className="w-full bg-neutral-100 rounded-2xl p-1">
        <TextArea
          value={content}
          autoSize
          disabled={isCreating}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border-transparent! focus:border-transparent!"
          variant="borderless"
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
        />
        <div className="self-end pl-2.5 flex justify-between">
          <div className="flex">
            <Button
              disabled={isCreating}
              variant="text"
              className="bg-transparent! border-none!"
              icon={<SmileOutlined className="text-base! cursor-pointer" />}
              onClick={handleSubmit}
            />
            <Button
              disabled={isCreating}
              variant="text"
              className="bg-transparent! border-none!"
              icon={<PictureOutlined className="text-base! cursor-pointer" />}
              onClick={handleSubmit}
            />
          </div>
          <Button
            disabled={isCreating}
            variant="text"
            className="bg-transparent! border-none!"
            icon={<SendOutlined className="text-blue-900!" />}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
