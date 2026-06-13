"use client";

import { useComment } from "@/app/(shared)/hooks/useComment";
import { CreateCommentPayload, IComment } from "@/app/(shared)/types/comments";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import CommentInput from "./commentInput";
import { getTimeOfComment } from "@/app/(shared)/utils/time";
import Text from "antd/es/typography/Text";
import { useParentComment } from "@/app/(shared)/hooks/useParentComment";
import useCreateComment from "@/app/(shared)/hooks/useCreateComment";

const Comment = ({
  showComments,
  postId,
  onIncreaseTotalComment,
}: {
  showComments: boolean;
  postId: number;
  onIncreaseTotalComment: () => void;
}) => {
  const { data, mutate } = useComment({
    postId,
    enabled: showComments,
  });

  useEffect(() => {
    const handleRefetch = () => {
      mutate();
    };
    window.addEventListener("REFETCH_REPLIES", handleRefetch);
    return () => window.removeEventListener("REFETCH_REPLIES", handleRefetch);
  }, [mutate]);

  const { createComment, isCreating } = useCreateComment(() => {
    window.dispatchEvent(new Event("REFETCH_REPLIES"));
    onIncreaseTotalComment?.();
  });

  const handleOncreate = (payload: CreateCommentPayload) => {
    createComment(payload);
  };

  if (!showComments) {
    return null;
  }

  const comments =
    data?.flatMap((data) => data.data.content).map((comment) => comment) || [];

  return (
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
                depth={comment.depth}
                onIncreaseTotalComment={onIncreaseTotalComment}
              />
            );
          })}
        </div>
      )}
      <CommentInput
        postId={postId}
        autoFocus
        className="px-3"
        isCreating={isCreating}
        onCreate={handleOncreate}
      />
    </div>
  );
};

const CommentItem = ({
  comment,
  postId,
  classNames,
  depth,
  onIncreaseTotalComment,
}: {
  comment: IComment;
  postId: number;
  depth: number;
  classNames?: string;
  onIncreaseTotalComment: () => void;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const MAX_LEVEL_DEPTH = 3;
  const { data, mutate } = useParentComment({
    parentId: comment.id,
    enabled: showReply,
  });

  useEffect(() => {
    const handleRefetch = () => {
      mutate();
    };
    window.addEventListener("REFETCH_REPLIES", handleRefetch);
    return () => window.removeEventListener("REFETCH_REPLIES", handleRefetch);
  }, [mutate]);

  const replies =
    data?.flatMap((data) => data.data.content).map((comment) => comment) || [];

  const { createComment, isCreating } = useCreateComment(() => {
    window.dispatchEvent(new Event("REFETCH_REPLIES"));
    setShowReplyInput(false);
    setShowReply(true);
    onIncreaseTotalComment?.();
  });

  const totalReplies = comment.total_replies;

  const reachLimitDepth = depth >= MAX_LEVEL_DEPTH;

  const handleOncreate = (payload: CreateCommentPayload) => {
    createComment(payload);
  };

  return (
    <div className={`mb-4 ${classNames} `}>
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

          {showReply && replies?.length > 0 && (
            <>
              {replies.map((rep) => (
                <CommentItem
                  key={rep.id}
                  comment={rep}
                  postId={rep.post_id}
                  classNames="mt-2 !mb-0"
                  depth={rep.depth}
                  onIncreaseTotalComment={onIncreaseTotalComment}
                />
              ))}
            </>
          )}

          {showReplyInput && !reachLimitDepth && (
            <CommentInput
              postId={postId}
              parentId={comment.id}
              className="mt-2"
              onCreate={handleOncreate}
              isCreating={isCreating}
            />
          )}
        </div>
      </div>
      {showReplyInput && reachLimitDepth && (
        <CommentInput
          postId={postId}
          parentId={comment.id}
          className="mt-2"
          reachLimit={reachLimitDepth}
          rootCommentId={comment.parent_comment_id!}
          onCreate={handleOncreate}
          isCreating={isCreating}
        />
      )}
    </div>
  );
};

export default Comment;
