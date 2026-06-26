export interface AllUserResponse {
  data: {
    totalCount: number;
    content: User[];
    page: number;
    totalPages: number;
  };
  success?: boolean;
  message?: string;
}

export interface User {
  id: number | string;
  username: string;
  email: string;
  avatar_url: string;
}
