import { Post as PostTypes } from "@/app/(shared)/types/post";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import Post from "./post";

export default function PostList({
  posts,
  onEdit,
  onDelete,
  onToggleLike,
}: {
  posts: PostTypes[];
  isCanModify?: boolean;
  onEdit?: (type: "edit", postId: string | number) => void;
  onDelete?: (type: "delete", postId: string | number) => void;
  onToggleLike: (id: number, isLiked: boolean) => void;
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
            onDelete={onDelete}
            onToggleLike={onToggleLike}
          />
        );
      })}
    </div>
  );
}
