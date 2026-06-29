import { DocumentType, NodeType, TextType } from "@tiptap/core";

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
  content: CommentPayload;
  created_at: string;
  updated_at: string;
  reply_user_id: number | null;
  total_replies: number;
  user: User;
  replies?: IComment[];
  depth: number;
  resources: Array<{
    id: number;
    url: string;
    alt_text: string | null;
  }>;
}

export interface User {
  id: number;
  username: string;
  avatar: string;
}
export interface CreateCommentPayload {
  content: CommentPayload;
  postId: number;
  parentId?: number;
  file?: File;
}

export interface CreateCommentRespone {
  status: number;
  message: string;
  data: IComment;
}

export type CommentPayload = DocumentType<
  Record<string, any> | undefined,
  NodeType<
    string,
    undefined | Record<string, any>,
    any,
    (NodeType | TextType)[]
  >[]
>;

export interface EditCommentPayload {
  commentId: number;
  content: CommentPayload;
  postId: number;
  file?: File;
  oldImgSrc: string;
}
