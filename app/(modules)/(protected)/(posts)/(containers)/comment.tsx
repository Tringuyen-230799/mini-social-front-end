"use client";

import { useComment } from "@/app/(shared)/hooks/useComment";
import { IComment } from "@/app/(shared)/types/comments";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useState } from "react";

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

  if(!data?.[0]?.data?.content?.length) {
    return (
      <p className="text-neutral-500">Chưa có bình luận nào</p>
    );
  }

  const comments =
    data
      ?.flatMap((data) => data.data.content)
      .map((comment) => comment) || [];
  

  return (
    <>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </>
  );
};

const CommentItem = ({
  comment,
}: {
  comment: IComment;
  isParent?: boolean;
}) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="mb-4">
      <div>
        <div className="flex items-center gap-2">
          <Avatar
            size={32}
            src={comment.user.avatar}
            icon={!comment.user.avatar && <UserOutlined />}
          />
          <p>{comment.content}</p>
        </div>
        {!comment?.comments?.length ? null : (
          <Button
            type="text"
            className="p-0! hover:bg-transparent! hover:text-neutral-950! ml-10 text-neutral-600!"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies
              ? "Ẩn bình luận"
              : `Xem bình luận (${comment?.comments?.length || 0})`}
          </Button>
        )}
      </div>

      {comment?.comments && comment.comments.length > 0 && showReplies && (
        <div style={{ marginLeft: "35px" }}>
          {comment.comments.map((reply) => {
            return <CommentItem key={reply.id} comment={reply} />;
          })}
        </div>
      )}
    </div>
  );
};

// const ReplyItem = ({ comment }: { comment: IComment[] }) => {
//   return (
//     <>
//       <div style={{ marginLeft: "35px" }}>
//         {comment.map((reply) => {
//           return (
//             <div key={reply.id}>
//               <div className="mb-4">
//                 <div className="flex items-center gap-2">
//                   <Avatar
//                     size={32}
//                     src={reply.user.avatar}
//                     icon={!reply.user.avatar && <UserOutlined />}
//                   />
//                   <p>{reply.content}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };
export default Comment;
