import { Card, Button, Avatar, Tag } from "antd";
import { CommentOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import { Post as PostType } from "@/app/(shared)/types/post";
import Image from "next/image";
import { getTimeAgo } from "@/app/(shared)/utils/time";

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
        padding: "12px 0px",
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
          <Card
            key={post.id}
            style={{ overflow: "hidden" }}
            styles={{
              body: {
                paddingBottom: 0,
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
                height={400}
                unoptimized
              />
            )}

            <div
              style={{
                display: "flex",
                gap: 4,
                marginBottom: 12,
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
            </div>
          </Card>
        );
      })}
    </div>
  );
}
