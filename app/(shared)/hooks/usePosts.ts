import useSWRInfinite from "swr/infinite";
import { AllPostsResponse } from "../types/post";
import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "../constant/endpoint";

const getKey = (pageIndex: number, previousPageData: AllPostsResponse) => {
  if (previousPageData && !previousPageData?.data?.content?.length) {
    return null;
  }
  return `${API_ENDPOINTS.POST.LIST}?page=${pageIndex + 1}&limit=10`;
};

export const usePosts = () => {
  const { data, size, setSize, isValidating, mutate } = useSWRInfinite<
    AllPostsResponse,
    Error
  >(getKey, apiClient);

  return { data, size, setSize, isValidating, mutate };
};
