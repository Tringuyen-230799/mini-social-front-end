import useSWRMutation from "swr/mutation";
import { API_ENDPOINTS } from "../constant/endpoint";
import {
  CreateCommentRespone,
  EditCommentPayload,
  IComment,
} from "../types/comments";
import { apiClient } from "@/lib/api";

const fetcher = async (
  url: string,
  { arg }: { arg: EditCommentPayload },
): Promise<CreateCommentRespone> => {
  const form = new FormData();

  for (const key in arg) {
    const validKey = key as keyof typeof arg;
    const value = arg[validKey];

    if (!value) continue;

    if (value instanceof Blob) {
      form.append(validKey, value);
    }

    if (typeof value === "object") {
      form.append(validKey, JSON.stringify(value));
    } else {
      form.append(validKey, value.toString());
    }
  }

  return await apiClient(`${url}/${arg.commentId}`, {
    method: "PATCH",
    body: form,
  });
};

const useEditComment = (onSuccess?: (data: IComment) => void) => {
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.COMMENT.LIST}`,
    fetcher,
    {
      onSuccess: (data) => {
        onSuccess?.(data.data);
      },
    },
  );

  return {
    editComment: trigger,
    isEditing: isMutating,
  };
};

export default useEditComment;
