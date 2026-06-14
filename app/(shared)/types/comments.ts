export interface AllCommentsResponse {
  status: number;
  message: string;
  data: {
    content: IComment[];
    nextCursor: string | null;
    totalCount: number;
    hasMore: boolean;
  };
}

export interface IComment {
  id: number;
  post_id: number;
  user_id: number;
  parent_comment_id: number | null;
  content: string;
  created_at: string;
  updated_at: string;
  reply_user_id: number | null;
  total_replies: number;
  user: User;
  replies?: IComment[];
  depth: number;
}

export interface User {
  id: number;
  username: string;
  avatar: string;
}

export interface CreateCommentPayload {
  content: string;
  postId: number;
  mentions?: Array<number>;
  parentId?: number;
}

export interface CreateCommentRespone {
  status: number;
  message: string;
  data: IComment;
}
