import { Card, Button, Avatar, Tag, Dropdown } from "antd";
import {
  CommentOutlined,
  DeleteFilled,
  EditFilled,
  EllipsisOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Post as PostType } from "@/app/(shared)/types/post";
import Image from "next/image";
import { getTimeAgo } from "@/app/(shared)/utils/time";
import { useState } from "react";
import Comment from "./comment";

export default function Post({
  post,
  isCanModify = false,
  onEdit,
  onDelete,
  onToggleLike,
}: {
  post: PostType;
  isCanModify?: boolean;
  onEdit?: (type: "edit", postId: string | number) => void;
  onDelete?: (type: "delete", postId: string | number) => void;
  onToggleLike: (id: number, isLiked: boolean) => void;
}) {
  const {
    user: { username, id, avatar_url },
    created_at,
    resources,
    content,
    total_likes,
    isliked,
  } = post;

  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(isliked);
  const [totalLikes, setTotalLikes] = useState(total_likes);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    onToggleLike(post.id, !isLiked);
    setTotalLikes((total) => (isLiked ? total - 1 : total + 1));
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
                    onClick: () => onDelete?.("delete", post.id),
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
          style={{
            width: "100%",
            objectFit: "cover",
            height: "auto",
          }}
          width={400}
          height={400}
          className="h-100"
          unoptimized
          loading="eager"
        />
      )}

      <div
        style={{
          display: "flex",
        }}
      >
        <Button
          className="rounded-none! text-neutral-700! min-w-20!"
          type="text"
          icon={
            !isLiked ? (
              <LikeOutlined style={{ fontSize: 18 }} />
            ) : (
              <LikeFilled
                style={{ fontSize: 18 }}
                className=" text-blue-700!"
              />
            )
          }
          onClick={handleToggleLike}
        >
          {totalLikes ? totalLikes : null}
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
      <Comment showComments={showComments} postId={post.id} />
    </Card>
  );
}
