import { Card, Button, Avatar, Tag, Dropdown } from "antd";
import {
  CommentOutlined,
  DeleteFilled,
  EditFilled,
  EllipsisOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Post as PostType } from "@/app/(shared)/types/post";
import Image from "next/image";
import { getTimeAgo } from "@/app/(shared)/utils/time";
import { useState } from "react";

export default function Post({
  post,
  isCanModify = false,
  onEdit,
}: {
  post: PostType;
  isCanModify?: boolean;
  onEdit?: (type: string, postId: string | number) => void;
}) {
  const [showComments, setShowComments] = useState(false);

  const {
    user: { username, id, avatar_url },
    created_at,
    resources,
    content,
  } = post;

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Card
      key={post.id}
      style={{ overflow: "hidden" }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div className="p-4 space-y-2 relative">
        {isCanModify && (
          <div className="absolute right-4 cursor-pointer">
            <Dropdown
              className="rounded-none!"
              menu={{
                items: [
                  {
                    key: post.id + "edit",
                    label: "Edit",
                    icon: <EditFilled />,
                    onClick: () => onEdit?.("edit", post.id),
                  },
                  {
                    key: post.id + "delete",
                    label: "Delete",
                    icon: <DeleteFilled />,
                    onClick: () => console.log("clicked delete"),
                  },
                ],
              }}
              placement="bottomRight"
            >
              <EllipsisOutlined className="text-xl" />
            </Dropdown>
          </div>
        )}
        <div className="flex items-center gap-2" id={`user-${id}`}>
          <Avatar
            size={36}
            src={avatar_url}
            icon={!avatar_url && <UserOutlined />}
          />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <Text strong>{username}</Text>

              {avatar_url && (
                <Tag color="blue" className="m-0 text-xs px-1">
                  ✓
                </Tag>
              )}
            </div>
            <Text
              style={{ fontSize: 12 }}
              className="font-medium! text-neutral-500!"
            >
              {getTimeAgo(created_at)}
            </Text>
          </div>
        </div>
        <Paragraph className="mb-0!">{content}</Paragraph>
      </div>

      {!resources?.length ? null : (
        <Image
          src={`${resources[0].url}`}
          alt="preview"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          width={400}
          style={{
            width: "100%",
            objectFit: "cover",
          }}
          className="h-100"
          height={400}
          unoptimized
        />
      )}

      <div
        style={{
          display: "flex",
        }}
      >
        <Button
          style={{
            color: "#1c1e21",
          }}
          className="rounded-none!"
          type="text"
          icon={<LikeOutlined style={{ fontSize: 18 }} />}
        >
          1000
        </Button>
        <Button
          className="rounded-none!"
          style={{
            color: "#1c1e21",
          }}
          type="text"
          icon={<CommentOutlined style={{ fontSize: 18 }} />}
          onClick={handleShowComments}
        >
          100
        </Button>
      </div>
    </Card>
  );
}
