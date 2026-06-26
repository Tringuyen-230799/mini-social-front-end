"use client";

import { useComment } from "@/app/(shared)/hooks/useComment";
import { CreateCommentPayload, IComment } from "@/app/(shared)/types/comments";
import { useEffect, useState } from "react";
import { useParentComment } from "@/app/(shared)/hooks/useParentComment";
import useCreateComment from "@/app/(shared)/hooks/useCreateComment";
import { cn } from "@/app/(shared)/utils/clsx";
import { Comment } from "@/app/(components)/comment";
import CommentInput from "./CommentInput";

const CommentList = ({
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
        depth={0}
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
    <>
      <div
        className={cn(`mb-4`, classNames, {
          "mb-0 ": depth > 0,
          "pl-10 pt-2": depth > 0,
          "depth-0": depth === 0,
          "comment-row": depth > 0,
        })}
      >
        <div className="li-comment">
          <Comment
            comment={comment}
            setShowReply={setShowReply}
            showReply={showReply}
            setShowReplyInput={setShowReplyInput}
            showReplyInput={showReplyInput}
            totalReplies={totalReplies}
          />

          {showReply && replies?.length > 0 && (
            <div className={`depth-${comment.depth + 1} ul-comment`}>
              <>
                {replies.map((rep) => (
                  <CommentItem
                    key={rep.id}
                    comment={rep}
                    postId={rep.post_id}
                    depth={rep.depth}
                    onIncreaseTotalComment={onIncreaseTotalComment}
                  />
                ))}
                {showReplyInput && (
                  <CommentInput
                    postId={postId}
                    depth={comment.depth + 1}
                    isCreating={isCreating}
                    onCreate={handleOncreate}
                    reachLimit={reachLimitDepth}
                    parentId={comment.id}
                    rootCommentId={comment.parent_comment_id!}
                    className="comment-row"
                    author={comment.user}
                  />
                )}
              </>
            </div>
          )}

          {showReplyInput && replies?.length === 0 && !reachLimitDepth && (
            <div className={`depth-${comment.depth + 1} ul-comment`}>
              <>
                {replies.map((rep) => (
                  <CommentItem
                    key={rep.id}
                    comment={rep}
                    postId={rep.post_id}
                    depth={rep.depth}
                    onIncreaseTotalComment={onIncreaseTotalComment}
                  />
                ))}
                <CommentInput
                  postId={postId}
                  depth={comment.depth + 1}
                  isCreating={isCreating}
                  onCreate={createComment}
                  reachLimit={reachLimitDepth}
                  parentId={comment.id}
                  rootCommentId={comment.parent_comment_id!}
                  className="comment-row"
                  author={comment.user}
                />
              </>
            </div>
          )}
        </div>
      </div>

      {showReplyInput && reachLimitDepth && (
        <div
          className={cn(`mb-4 comment-row pl-10`, classNames, {
            "mb-0 ": depth > 0,
            "pt-2": depth > 0,
          })}
        >
          <CommentInput
            postId={postId}
            depth={comment.depth + 1}
            isCreating={isCreating}
            onCreate={createComment}
            reachLimit={reachLimitDepth}
            parentId={comment.id}
            rootCommentId={comment.parent_comment_id!}
          />
        </div>
      )}
    </>
  );
};

export default CommentList;

{
  /* {showReplyInput && (
        <CommentInput
          postId={postId}
          depth={comment.depth}
          isCreating={isCreating}
          onCreate={createComment}
          reachLimit={reachLimitDepth}
          parentId={comment.id}
          rootCommentId={comment.parent_comment_id!}
        />
      )} */
}
