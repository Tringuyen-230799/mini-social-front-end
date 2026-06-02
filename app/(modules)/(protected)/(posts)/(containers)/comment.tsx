"use client";

import { useComment } from "@/app/(shared)/hooks/useComment";
import { IComment } from "@/app/(shared)/types/comments";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useState } from "react";
import CommentInput from "./commentInput";
import { getTimeAgo } from "@/app/(shared)/utils/time";
import Text from "antd/es/typography/Text";

const Comment = ({
  showComments,
  postId,
}: {
  showComments: boolean;
  postId: number;
}) => {
  const { data, isValidating, isLoading } = useComment({
    postId,
    enabled: showComments,
  });

  if (!showComments) {
    return null;
  }

  const comments =
    data?.flatMap((data) => data.data.content).map((comment) => comment) || [];

  return (
    <div className="">
      <div className="">
        {!comments.length ? (
          <div className="text-neutral-500 text-center py-4">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="pt-2 px-4">
            {comments.map((comment) => {
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                />
              );
            })}
          </div>
        )}
        <CommentInput postId={postId} autoFocus className="px-3"/>
      </div>
    </div>
  );
};

const CommentItem = ({
  comment,
  postId,
}: {
  comment: IComment;
  postId: number;
}) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-start gap-2">
        <Avatar
          size={32}
          src={comment.user.avatar}
          icon={!comment.user.avatar && <UserOutlined />}
          className="flex-shrink-0"
        />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block max-w-full">
            <p className="font-semibold text-sm">{comment.user.username}</p>
            <p className="text-sm break-words">{comment.content}</p>
          </div>
          <div className="flex gap-4">
            <Text
              style={{ fontSize: 12 }}
              className="font-medium! text-neutral-500!"
            >
              {getTimeAgo(comment.created_at)}
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
              onClick={() => setShowReply(!showReply)}
            >
              reply
            </Text>
          </div>
          {showReply && <CommentInput postId={postId} parentId={comment.id} className="mt-2"/>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
