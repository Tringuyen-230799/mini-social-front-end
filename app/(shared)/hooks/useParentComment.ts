import { apiClient } from "@/lib/api";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "../constant/endpoint";
import { AllCommentsResponse } from "../types/comments";

const getKey = (
  pageIndex: number,
  previousPageData: AllCommentsResponse | null,
  parentId: number,
  shouldFetch: boolean,
) => {
  if (!shouldFetch || !parentId) return null;
  if (previousPageData && !previousPageData?.data?.content?.length) {
    return null;
  }

  return `${API_ENDPOINTS.COMMENT.REPLY}/${parentId}?page=${pageIndex + 1}&limit=10`;
};

export const useParentComment = ({
  parentId,
  enabled
}: {
  parentId: number;
  enabled?: boolean;
}) => {
  const { data, isValidating, isLoading, size, setSize, mutate, error } =
    useSWRInfinite<AllCommentsResponse, Error>(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, parentId, !!enabled),
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
