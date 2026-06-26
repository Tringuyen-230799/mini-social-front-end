import useSWRInfinite from "swr/infinite";
import { apiClient } from "@/lib/api";
import { AllUserResponse } from "@/app/(shared)/types/users";

export const useMentions = ({ search }: { search?: string }) => {
  const getKey = (pageIndex: number, previousPageData: AllUserResponse) => {
    if (previousPageData && !previousPageData?.data?.content?.length) {
      return null;
    }

    const query = `${search!.length > 0 ? `&search=${search}` : ""}`;

    return `/api/users/mentions?page=${pageIndex + 1}&limit=10${query}`;
  };

  const { data, size, setSize, isValidating, mutate, error } = useSWRInfinite<
    AllUserResponse,
    Error
  >(getKey, apiClient, {
    shouldRetryOnError: false,
    errorRetryCount: 0,
    onErrorRetry: undefined,
  });

  return { data, size, setSize, isValidating, mutate, error };
};
