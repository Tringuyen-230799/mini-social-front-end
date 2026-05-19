import { Post as PostTypes } from "@/app/(shared)/types/post";
import Post from "./post";

export default function PostList({
  posts,
  toggleLike,
}: {
  posts: PostTypes[];
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
        return <Post post={post} key={post.id} toggleLike={toggleLike}/>;
      })}
    </div>
  );
}
