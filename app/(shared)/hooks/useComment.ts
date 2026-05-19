import { apiClient } from "@/lib/api";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "../constant/endpoint";
import { AllCommentsResponse } from "../types/comments";

const getKey = (
  pageIndex: number,
  previousPageData: AllCommentsResponse | null,
  postId: number,
  shouldFetch: boolean,
) => {
  if (!shouldFetch || !postId) return null;
  
  if (previousPageData && !previousPageData?.data?.content?.length) return null;
  
  if (pageIndex === 0)
    return `${API_ENDPOINTS.COMMENT.LIST}/${postId}?limit=10`;

  return `${API_ENDPOINTS.COMMENT.LIST}/${postId}?cursor=${previousPageData?.data?.nextCursor}&limit=10`;
};

export const useComment = ({
  postId,
  enabled,
}: {
  postId: number;
  enabled?: boolean;
}) => {
  const { data, isValidating, isLoading, size, setSize, mutate, error } =
    useSWRInfinite<AllCommentsResponse, Error>(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, postId, !!enabled),
      apiClient,
    );

  return {
    data,
    isValidating,
    isLoading,
    size,
    setSize,
    mutate,
    error,
  };
};
