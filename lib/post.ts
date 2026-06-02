import { ApiResponse } from "@/app/(shared)/types/common";
import { apiClient } from "./api";
import { CreatePostResponse } from "@/app/(shared)/types/post";
import { API_ENDPOINTS } from "@/app/(shared)/constant/endpoint";

export async function createPost(
  form: FormData,
): Promise<ApiResponse<CreatePostResponse>> {
  const response = await apiClient<ApiResponse<CreatePostResponse>>(
    API_ENDPOINTS.POST.LIST,
    {
      method: "POST",
      body: form,
    },
  );

  return response;
}
