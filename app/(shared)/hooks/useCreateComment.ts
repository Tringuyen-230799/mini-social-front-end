import useSWRMutation from "swr/mutation";
import { API_ENDPOINTS } from "../constant/endpoint";
import { CreateCommentPayload, CreateCommentRespone, IComment } from "../types/comments";
import { apiClient } from "@/lib/api";

const fetcher = async (
  url: string,
  { arg }: { arg: CreateCommentPayload },
): Promise<CreateCommentRespone> => {
  return await apiClient(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
};

const useCreateComment = (onSuccess?: (data: IComment) => void) => {
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
    createComment: trigger,
    isCreating: isMutating,
  };
};

export default useCreateComment;
