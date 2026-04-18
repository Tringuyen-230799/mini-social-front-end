"use client";
import Upload from "@/app/(components)/upload";
import { UPDATE_POST_EVENT } from "@/app/(shared)/constant/event";
import { useModalStore } from "@/app/(shared)/provider/StoreProvider";
import { API_ENDPOINTS, apiClient } from "@/lib/api";
import { Button, Flex } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

export default function PostModal() {
  const { close, isOpen } = useModalStore((state) => state);
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.post.list}`,
    async (url, { arg }: { arg: RequestInit }) => {
      return apiClient(url, arg);
    },
    {
      onSuccess: () => {
        setFile(undefined);
        setContent("");
        close();
        window.dispatchEvent(new Event(UPDATE_POST_EVENT));
      },
    },
  );

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const contentError =
    content.trim().length === 0 ? "Content cannot be empty" : "";

  const createNewPost = async () => {
    const newPost = new FormData();
    if (contentError.length) return;

    newPost.append("content", content);
    if (file) {
      newPost.append("images", file);
    }
    try {
      await trigger({
        method: "POST",
        body: newPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <Form
      id="upload-post"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={createNewPost}
    >
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Create your post..."
        autoSize={{ minRows: 1, maxRows: 5 }}
        styles={{
          root: {
            marginBottom: 16,
          },
        }}
      />

      <Upload value={file} onChange={setFile} />

      <Flex justify="flex-end" gap={8} style={{ marginTop: 16 }}>
        <Button
          type="default"
          onClick={() => {
            setFile(undefined);
            setContent("");
            close();
          }}
        >
          Cancel
        </Button>
        <FormItem label={null}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isMutating}
            disabled={!!contentError.length}
          >
            Submit
          </Button>
        </FormItem>
      </Flex>
    </Form>
  );
}
