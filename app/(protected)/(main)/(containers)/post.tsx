import { Card, Button, Avatar, Tag } from "antd";
import {
  CommentOutlined,
  ShareAltOutlined,
  BookOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Post as PostType } from "@/app/(shared)/types/post";

export default function Post({
  posts,
  toggleLike,
}: {
  posts: PostType[];
  toggleLike: (id: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {posts.map((post) => {
        const {
          user: { username, id, avatar_url },
          created_at,
          images,
          content,
        } = post!;
        return (
          <Card key={post.id} style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
              id={`user-${id}`}
            >
              <Avatar size={40} src={avatar_url} />
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
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {new Date(created_at)?.toISOString()}
                </Text>
              </div>
            </div>

            <div>
              <Paragraph style={{ marginBottom: 16, color: "#666" }}>
                {content}
              </Paragraph>
            </div>

            {!images?.length ? null : (
              <div
                style={{
                  width: "100%",
                  height: 360,
                  background: `url(${process.env.NEXT_PUBLIC_API_URL}${images[0].url}) center/cover`,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              />
            )}

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
                icon={<LikeOutlined />}
                onClick={() => toggleLike(post.id)}
              >
                1000
              </Button>
              <Button type="text" icon={<CommentOutlined />}>
                100
              </Button>
              <Button type="text" icon={<ShareAltOutlined />} />
              <Button
                type="text"
                icon={<BookOutlined />}
                style={{ marginLeft: "auto" }}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
