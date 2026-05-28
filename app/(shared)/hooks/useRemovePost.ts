import { apiClient } from "@/lib/api";
import useSWRMutation from "swr/mutation";
import { API_ENDPOINTS } from "../constant/endpoint";
import { UPDATE_POST_EVENT } from "../constant/event";

const fetcher = async (
  url: string,
  { arg }: { arg: { postId: string | number } },
): Promise<unknown> => {
  return apiClient(`${url}/${arg.postId}`, {
    method: "DELETE",
  });
};

const useRemovePost = (onSuccess?: () => void) => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.POST.REMOVE}`,
    fetcher,
    {
      onSuccess: () => {
        onSuccess?.();
        window.dispatchEvent(new Event(UPDATE_POST_EVENT));
      },
    },
  );

  return {
    removePost: trigger,
    isRemoving: isMutating,
  };
};

export default useRemovePost;
