export interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  images: Array<{
    id: number;
    url: string;
    alt_text: string | null;
  }>;
  user: {
    id: number;
    username: string;
    avatar_url: string | null;
  };
}

export interface CreatePostResponse {
  post: Post;
  success?: boolean;
  message?: string;
}

export interface AllPostsResponse {
  data: {
    totalCount: number;
    content: Post[];
    page: number;
    totalPages: number;
  };
  success?: boolean;
  message?: string;
}
