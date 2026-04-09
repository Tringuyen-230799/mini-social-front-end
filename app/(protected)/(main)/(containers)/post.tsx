import { Card, Button, Avatar, Tag } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  ShareAltOutlined,
  BookOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Post as PostType } from "@/app/(shared)/types/post";

export default function Post({
  posts,
  toggleLike,
}: {
  posts: PostType;
  toggleLike: (id: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {posts.map((post) => (
        <Card key={post.id} style={{ overflow: "hidden" }}>
          {/* Post Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <Avatar size={40} src={post.author.avatar} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Text strong>{post.author.name}</Text>
                {post.author.verified && (
                  <Tag
                    color="blue"
                    style={{ margin: 0, fontSize: 10, padding: "0 4px" }}
                  >
                    ✓
                  </Tag>
                )}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {post.timestamp}
              </Text>
            </div>
          </div>

          {/* Post Image */}
          <div
            style={{
              width: "100%",
              height: 360,
              background: `url(${post.image}) center/cover`,
              borderRadius: 8,
              marginBottom: 16,
            }}
          />

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Button
              type="text"
              icon={
                post.liked ? (
                  <HeartFilled style={{ color: "#ff4d4f" }} />
                ) : (
                  <HeartOutlined />
                )
              }
              onClick={() => toggleLike(post.id)}
            >
              {post.likes}
            </Button>
            <Button type="text" icon={<CommentOutlined />}>
              {post.comments}
            </Button>
            <Button type="text" icon={<ShareAltOutlined />} />
            <Button
              type="text"
              icon={<BookOutlined />}
              style={{ marginLeft: "auto" }}
            />
          </div>

          {/* Post Content */}
          <div>
            <Title level={5} style={{ marginBottom: 8 }}>
              {post.title}
            </Title>
            <Paragraph style={{ marginBottom: 0, color: "#666" }}>
              {post.description}
            </Paragraph>
          </div>
        </Card>
      ))}
    </div>
  );
}
