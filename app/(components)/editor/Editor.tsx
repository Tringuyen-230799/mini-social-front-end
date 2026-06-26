"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { useCallback } from "react";
import { CommentPayload } from "@/app/(shared)/types/comments";
import { Placeholder } from "@tiptap/extensions";
import buildSuggestion from "../mention/suggestions";

const Editor = ({
  handleOnSubmit,
}: {
  handleOnSubmit: (content: CommentPayload) => Promise<void>;
  editable: boolean;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: buildSuggestion(),
      }),
      Placeholder.configure({
        placeholder: "Write your comment..",
        showOnlyCurrent: false,
      }),
    ],
    injectCSS: true,
    immediatelyRender: false,
    editable: true,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none! pl-2",
      },
    },
  });

  return (
    <EditorContent
      editor={editor}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          if (!editor?.getText().trim().length) {
            return false;
          }

          const rawJson = editor.getJSON();
          const content = rawJson.content;

          if (content && content.length > 0) {
            const lastNode = content[content.length - 1];

            if (lastNode.type === "paragraph" && !lastNode.content) {
              content.pop();
            }
          }

          handleOnSubmit(rawJson);
          editor?.commands.clearContent(true);
        }
      }}
    />
  );
};

export default Editor;
