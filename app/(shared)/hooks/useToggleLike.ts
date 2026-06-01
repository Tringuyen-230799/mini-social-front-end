import useSWRMutation from "swr/mutation";
import { API_ENDPOINTS } from "../constant/endpoint";
import { Post } from "../types/post";
import { apiClient } from "@/lib/api";
import { UPDATE_POST_EVENT } from "../constant/event";

const fetcher = async (
  url: string,
  { arg }: { arg: { id: number; isLiked: boolean } },
): Promise<Post> => {
  return apiClient(`${url}/${arg.isLiked ? "like" : "unlike"}/${arg.id}`, {
    method: "POST",
  });
};

const useToggleLike = (onSuccess?: () => void) => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.POST.LIST}`,
    fetcher,
    {
      onSuccess: () => {
        onSuccess?.();
        window.dispatchEvent(new Event(UPDATE_POST_EVENT));
      },
    },
  );

  return {
    toggleLike: trigger,
    isMutating,
  };
};

export default useToggleLike;
