"use client";

import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";
import { CommentPayload, User } from "@/app/(shared)/types/comments";
import { Placeholder } from "@tiptap/extensions";
import buildSuggestion from "../mention/suggestions";
import { RefObject, useEffect } from "react";
import clsx from "clsx";

const Editor = ({
  handleOnSubmit,
  placeholder,
  author,
  content,
  editable,
  containerRef,
  onUndo,
}: {
  handleOnSubmit: (content: CommentPayload) => Promise<void>;
  editable?: boolean;
  placeholder: string;
  author?: User;
  content?: CommentPayload;
  onUndo?: () => void;
  containerRef?: RefObject<HTMLDivElement | null>;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        renderHTML({ options, node }) {
          return [
            "a",
            mergeAttributes(
              { href: "/profile/1", target: "_blank" },
              options.HTMLAttributes,
            ),
            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
          ];
        },
        suggestion: buildSuggestion(),
      }),
      Placeholder.configure({
        placeholder,
        showOnlyCurrent: false,
      }),
    ],
    ...(!content ? {} : { content }),
    injectCSS: true,
    immediatelyRender: false,
    editable: editable,
    autofocus: true,
    editorProps: {
      attributes: {
        class: clsx("focus:outline-none!", {
          "pl-2": editable,
        }),
      },
    },
  });

  useEffect(() => {
    if (author) {
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

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        containerRef?.current &&
        !containerRef?.current.contains(event.target)
      ) {
        if (onUndo) {
          onUndo();
        }
        editor?.commands?.setContent(content!);
        editor?.setEditable(false);
      }
    };

    if (editable) {
      editor?.setEditable(true);
      editor?.commands?.focus("end");

      document.addEventListener("mousedown", handleClick);
    }

    if (!editable) {
      editor?.commands?.setContent(content!);
      editor?.setEditable(false);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [editable, editor, content, containerRef, onUndo]);

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

          if (!editable) {
            editor?.commands.clearContent(true);
          }
        }
      }}
    />
  );
};

export default Editor;
