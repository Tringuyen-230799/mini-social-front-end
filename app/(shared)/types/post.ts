export type Post = Array<{
  id: number;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  image: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}>;

export interface CreatePostResponse {
  post: Post;
  success?: boolean;
  message?: string;
}
