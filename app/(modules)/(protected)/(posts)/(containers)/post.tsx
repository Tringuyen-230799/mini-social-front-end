import { Card, Button, Avatar, Tag } from "antd";
import { CommentOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Post as PostType } from "@/app/(shared)/types/post";
import Image from "next/image";
import { getTimeAgo } from "@/app/(shared)/utils/time";
import Comment from "./comment";
import { useState } from "react";

export default function Post({
  post,
  toggleLike,
}: {
  post: PostType;
  toggleLike: (id: number) => void;
}) {
  const [showComments, setShowComments] = useState(false);

  const {
    user: { username, id, avatar_url },
    created_at,
    images,
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
          paddingBottom: 12,
          paddingTop: 12,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
        id={`user-${id}`}
      >
        <Avatar
          size={40}
          src={avatar_url}
          icon={!avatar_url && <UserOutlined />}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Text strong>{username}</Text>

            {avatar_url && (
              <Tag
                color="blue"
                style={{ margin: 0, fontSize: 10, padding: "0 4px" }}
              >
                ✓
              </Tag>
            )}
          </div>
          <Text style={{ fontSize: 12 }}>{getTimeAgo(created_at)}</Text>
        </div>
      </div>

      <Paragraph>{content}</Paragraph>

      {!images?.length ? null : (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${images[0].url}`}
          alt="preview"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          width={400}
          style={{
            width: "100%",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          className='h-100'
          height={400}
          unoptimized
        />
      )}

      <div
        style={{
          display: "flex",
          marginBottom: 12,
        }}
      >
        <Button
          style={{
            color: "#1c1e21",
          }}
          type="text"
          icon={<LikeOutlined style={{ fontSize: 20 }} />}
          onClick={() => toggleLike(post.id)}
        >
          1000
        </Button>
        <Button
          style={{
            color: "#1c1e21",
          }}
          type="text"
          icon={<CommentOutlined style={{ fontSize: 20 }} />}
          onClick={handleShowComments}
        >
          100
        </Button>
      </div>

      <Comment showComments={showComments} postId={post.id}/>
    </Card>
  );
}
