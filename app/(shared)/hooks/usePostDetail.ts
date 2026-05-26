import { apiClient } from "@/lib/api";
import useSWR from "swr";
import { API_ENDPOINTS } from "../constant/endpoint";
import { PostDetailResponse } from "../types/post";

const usePostDetail = (
  postId: string | number,
): {
  post: PostDetailResponse["data"] | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: () => void;
} => {
  const { data, error, isValidating, mutate } = useSWR<PostDetailResponse>(
    postId ? `${API_ENDPOINTS.POST.DETAIL}/${postId}` : null,
    apiClient,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    post: data?.data,
    isLoading: !error && !data,
    isValidating,
    mutate,
  };
};

export default usePostDetail;
