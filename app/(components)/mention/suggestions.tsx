import { computePosition, flip, shift } from "@floating-ui/dom";
import { posToDOMRect, ReactRenderer } from "@tiptap/react";
import MentionList from "./MentionList";
import type { Editor } from "@tiptap/react";
import { MentionOptions } from "@tiptap/extension-mention";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

export const updatePosition = (editor: Editor, element: HTMLElement) => {
  const virtualElement = {
    getBoundingClientRect: () =>
      posToDOMRect(
        editor.view,
        editor.state.selection.from,
        editor.state.selection.to,
      ),
  };

  computePosition(virtualElement, element, {
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = "max-content";
    element.style.position = strategy;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  });
};

const suggestionConfigs = [
  {
    char: "@",
    items: ({ query }: { query: string }) => {
      const allUsers = [
        { id: "102", name: "Tri nguyễn" },
        { id: "104", name: "Bảo Lân" },
        { id: "105", name: "Hashi Lân" },
      ];

      return allUsers
        .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRenderer | null = null;
      let unmount: (() => void) | null = null;

      const applyPosition = (props: any) => {
        if (!component || !props.floatingUi) return;

        const { x, y, strategy } = props.floatingUi;
        component.element.style.position = strategy;
        component.element.style.left = `${x}px`;
        component.element.style.top = `${y}px`;
        component.element.style.width = "max-content";
      };

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStart: (props: any) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          unmount = props.mount(component.element);
          applyPosition(props);
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate(props: any) {

          component?.updateProps(props);

          applyPosition(props);
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onKeyDown(props: any) {
          if (props.event.key === "Enter" && !props.event.shiftKey) {
            props.event?.stopPropagation();
          }

          if (props.event.key === "Escape") {
            component?.destroy();

            return true;
          }

          // @ts-expect-error - TipTap internal API not fully typed
          return component?.ref?.onKeyDown(props);
        },

        onExit() {
          unmount?.();
          component?.destroy();
        },
      };
    },

    renderLabel({
      options,
      node,
    }: {
      options: MentionOptions;
      node: ProseMirrorNode;
    }) {
      return `${options.suggestion.char}${node.attrs.label || node.attrs.id}`;
    },
  },
  {
    char: "#",
    items: ({ query }: { query: string }) => {
      return ["Dirty Dancing", "Pirates of the Caribbean", "The Matrix"]
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 5);
    },

    render: () => {
      let component: ReactRenderer | null = null;

      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStart: (props: any) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          component.element.style.position = "absolute";

          document.body.appendChild(component.element);

          updatePosition(props.editor, component.element);
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate(props: any) {
          component?.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          updatePosition(props.editor, component!.element);
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onKeyDown(props: any) {
          if (props.event.key === "Escape") {
            component?.destroy();

            return true;
          }

          // @ts-expect-error - TipTap internal API not fully typed
          return component?.ref?.onKeyDown(props);
        },

        onExit() {
          component?.destroy();
        },
      };
    },
  },
];

export default suggestionConfigs;
