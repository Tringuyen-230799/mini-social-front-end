import { IComment } from "@/app/(shared)/types/comments";
import { cn } from "@/app/(shared)/utils/clsx";
import { getTimeOfComment } from "@/app/(shared)/utils/time";
import { UserOutlined } from "@ant-design/icons";
import Mention from "@tiptap/extension-mention";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
  const editor = new Editor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
      }),
    ],
    content: comment.content,

    editable: false,
  });

  return (
    <div className={cn("flex items-start gap-2 comment", classNames)}>
      <Avatar
        size={32}
        src={comment.user.avatar}
        icon={!comment.user.avatar && <UserOutlined />}
        className="shrink-0"
      />
      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block max-w-full capitalize">
          <p className="font-semibold text-sm">{comment.user.username}</p>
          <EditorContent editor={editor} />
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
