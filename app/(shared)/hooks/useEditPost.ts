import useSWRMutation from "swr/mutation";
import { API_ENDPOINTS } from "../constant/endpoint";
import { apiClient } from "@/lib/api";
import { UPDATE_POST_EVENT } from "../constant/event";

const useEditPost = (onSuccess?: () => void) => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.POST.LIST}`,
    async (url, { arg }: { arg: RequestInit }) => {
      return apiClient(url, {
        ...arg,
        method: "PATCH",
      });
    },
    {
      onSuccess: () => {
        onSuccess?.();
        window.dispatchEvent(new Event(UPDATE_POST_EVENT));
      },
    },
  );

  return {
    editPost: trigger,
    isEditing: isMutating,
  };
};

export default useEditPost;
