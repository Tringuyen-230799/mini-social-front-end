import { ApiResponse } from "@/app/(shared)/types/common";
import { API_ENDPOINTS, apiClient } from "./api";
import { CreatePostResponse } from "@/app/(shared)/types/post";

export async function createPost(
  form: FormData,
): Promise<ApiResponse<CreatePostResponse>> {
  const response = await apiClient<ApiResponse<CreatePostResponse>>(
    API_ENDPOINTS.post.create,
    {
      method: "POST",
      body: form,
    },
  );

  return response;
}
