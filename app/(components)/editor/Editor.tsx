"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { CommentPayload, User } from "@/app/(shared)/types/comments";
import { Placeholder } from "@tiptap/extensions";
import buildSuggestion from "../mention/suggestions";
import { useEffect } from "react";

const Editor = ({
  handleOnSubmit,
  placeholder,
  author,
}: {
  handleOnSubmit: (content: CommentPayload) => Promise<void>;
  editable: boolean;
  placeholder: string;
  author: User;
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
        placeholder,
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

  useEffect(() => {
    if (author) {
      console.log(author)
      editor?.commands.setContent({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "mention",
                attrs: { id: author.id, label: author.username },
              },
              {
                type: "text",
                text: " ",
              },
            ],
          },
        ],
      });
      editor?.commands.focus();
    }
  }, [author, editor]);

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
