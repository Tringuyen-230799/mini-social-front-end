export type SendCommentNotiPayload = {
  user: {
    id: number | string;
    username: string;
    avatar_url: string | null;
  };
  type: string;
  entityId: number;
  message: string;
};
