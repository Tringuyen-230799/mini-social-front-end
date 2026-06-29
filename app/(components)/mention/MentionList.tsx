import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSuggestionStore } from "./hooks/useSuggestionState";
import { Avatar, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import clsx from "clsx";
import Loading from "./Loading";

interface MentionListProps {
  items: Array<{ id: string; label: string; avatar: string }>;
  command: (item: { id: string; label: string; avatar: string }) => void;
  query: string;
}

export interface MentionListRef {
  onKeyDown: (args: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListRef, MentionListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const isLoading = useSuggestionStore((state) => state.isLoading);

    const selectItem = (index: number) => {
      const item = items[index];

      if (item.label === "Đang tìm kiếm dữ liệu...") return;

      if (item) {
        command({ id: item.id, label: item.label, avatar: item.avatar });
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="dropdown-menu">
        {items[0]?.id == "loading-placeholder" ? (
          <Loading size={3.5} />
        ) : isLoading ? (
          <Loading size={3.5} />
        ) : items.length > 0 ? (
          items.map((item, index) => (
            <MentionItem
              index={index}
              item={item}
              selectItem={selectItem}
              key={item.id}
              selectedIndex={selectedIndex}
            />
          ))
        ) : (
          <Empty>There is no values</Empty>
        )}
      </div>
    );
  },
);

const MentionItem = ({
  item,
  index,
  selectItem,
  selectedIndex,
}: {
  item: { id: string; label: string; avatar: string };
  index: number;
  selectItem: (index: number) => void;
  selectedIndex: number;
}) => {
  const { avatar, label } = item;
  return (
    <button
      className={clsx(
        "cursor-pointer, px-2",
        selectedIndex === index && "is-selected",
      )}
      key={index}
      onClick={() => selectItem(index)}
    >
      <Avatar size={36} src={avatar} icon={!avatar && <UserOutlined />} />
      <div className="flex-1">
        <div className="flex items-center gap-1 capitalize">
          <Text strong className="max-w-30 truncate">
            {label}
          </Text>
        </div>
      </div>
    </button>
  );
};

MentionList.displayName = "MentionList";

export default MentionList;
