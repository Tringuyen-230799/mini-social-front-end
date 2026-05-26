import useSWRMutation from "swr/mutation";
import { API_ENDPOINTS } from "../constant/endpoint";
import { apiClient } from "@/lib/api";
import { UPDATE_POST_EVENT } from "../constant/event";
import { Post } from "../types/post";
import { mutate } from "swr";

export interface EditPostPayload {
  postId: string | number;
  content?: string;
  images?: File;
  oldImgIds?: string[] | number[];
}

const fetcher = async (
  url: string,
  { arg }: { arg: EditPostPayload },
): Promise<Post> => {
  const formData = new FormData();
  if (arg.content) {
    formData.append("content", arg.content);
  }
  if (arg.images) {
    formData.append("images", arg.images);
  }
  if (arg?.oldImgIds?.length) {
    arg?.oldImgIds?.forEach((id) => {
      formData.append("oldImageIds", id?.toString());
    });
  }
  return apiClient(`${url}/${arg.postId}`, {
    method: "PATCH",
    body: formData,
  });
};

const useEditPost = (onSuccess?: () => void) => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.POST.LIST}`,
    fetcher,
    {
      onSuccess: (data) => {
        onSuccess?.();
        mutate(`${API_ENDPOINTS.POST.DETAIL}/${data.id}`);
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
