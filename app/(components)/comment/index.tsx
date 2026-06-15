import { IComment } from "@/app/(shared)/types/comments";
import { cn } from "@/app/(shared)/utils/clsx";
import { getTimeOfComment } from "@/app/(shared)/utils/time";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Text from "antd/es/typography/Text";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <div className={cn("flex items-start gap-2 comment", classNames)}>
      <Avatar
        size={32}
        src={comment.user.avatar}
        icon={!comment.user.avatar && <UserOutlined />}
        className="shrink-0"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block max-w-full">
          <p className="font-semibold text-sm">{comment.user.username}</p>
          <p className="text-sm wrap-break-word">{comment.content}</p>
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
      </div>
    </div>
  );
};
