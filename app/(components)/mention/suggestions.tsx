import { ReactRenderer } from "@tiptap/react";
import MentionList from "./MentionList";
import { SuggestionOptions } from "@tiptap/suggestion";
import { apiClient } from "@/lib/api";
import { AllUserResponse } from "@/app/(shared)/types/users";
import { useSuggestionStore } from "./hooks/useSuggestionState";

const buildSuggestion = (): Partial<SuggestionOptions> => {
  return {
    char: "@",
    minQueryLength: 0,
    debounce: 300,
    allowSpaces: true,
    initialItems: [
      { id: "loading-placeholder", label: "Đang tìm kiếm dữ liệu..." },
    ],
    items: async ({ query }: { query: string }) => {
      try {
        useSuggestionStore.getState().setLoading(true);
        const search = Boolean(query) ? `&search=${query}` : "";

        const data = await apiClient<AllUserResponse>(
          `/api/users/mentions?limit=10${search}`,
        );

        const mentioners = data.data.content;

        const items = mentioners.map((m) => ({
          id: m.id,
          label: m.username,
          avatar: m.avatar_url,
        }));

        return items;
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        useSuggestionStore.getState().setLoading(false);
      }
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
  };
};

export default buildSuggestion;
