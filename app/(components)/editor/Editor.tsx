"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { useCallback, useMemo } from "react";
import { CommentPayload } from "@/app/(shared)/types/comments";
import { Placeholder } from "@tiptap/extensions";
import buildSuggestion from "@/app/(components)/mention/Suggestions";

const Editor = ({
  content,
  onChange,
  handleOnSubmit,
}: {
  content: CommentPayload | undefined;
  onChange: (value: CommentPayload) => void;
  handleOnSubmit: () => void;
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
      handleKeyDown: (...args) => {
        const [, e] = args;
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!editor?.getText().trim().length) {
            return false;
          }

          handleOnSubmit();
          editor?.commands.clearContent(true);

          return true;
        }
      },
    },
    content,
    onUpdate: useCallback(
      ({ editor }) => {
        onChange(editor.getJSON());
      },
      [onChange],
    ),
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
