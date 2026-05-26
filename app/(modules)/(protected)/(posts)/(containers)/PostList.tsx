import { Post as PostTypes } from "@/app/(shared)/types/post";
import Post from "./Post";
import { useAuth } from "@/app/(shared)/provider/authProvider";

export default function PostList({
  posts,
  onEdit,
}: {
  posts: PostTypes[];
  isCanModify?: boolean;
  onEdit?: (type: string, postId: string | number) => void;
}) {
  const { user } = useAuth();
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
        return (
          <Post
            post={post}
            key={post.id}
            isCanModify={!!user && user.id === post.user.id}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
}
