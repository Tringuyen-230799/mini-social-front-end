"use client";
import Upload from "@/app/(components)/upload";
import { API_ENDPOINTS } from "@/app/(shared)/constant/endpoint";
import { UPDATE_POST_EVENT } from "@/app/(shared)/constant/event";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import { apiClient } from "@/lib/api";
import { CameraFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import Text from "antd/es/typography/Text";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

export default function PostModal() {
  const { user } = useAuth();
  const [openUpload, setOpenUpload] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    `${API_ENDPOINTS.POST.LIST}`,
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

  return (
    <Form
      id="upload-post"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={createNewPost}
      className="space-y-4!"
    >
      <div className="flex items-center gap-2" id={`user`}>
        <Avatar
          size={48}
          src={user?.avatar_url}
          icon={!user?.avatar_url && <UserOutlined />}
        />
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <Text strong className="text-xl!">
              {user?.username}
            </Text>
          </div>
        </div>
      </div>

      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="borderless"
        placeholder="Create your post..."
        autoSize={{ minRows: 1, maxRows: 5 }}
        className="p-0! text-xl!"
      />

      <FormItem label={null} className="w-full! flex! justify-end!">
        <Button
          onClick={() => setOpenUpload(!openUpload)}
          type="text"
          size="large"
          icon={<CameraFilled className="text-xl! text-neutral-500!" />}
        />
      </FormItem>

      {openUpload && <Upload value={file} onChange={setFile} />}

      <Flex justify="flex-end" gap={8}>
        {/* <Button
          type="default"
          onClick={() => {
            setFile(undefined);
            setContent("");
            close();
          }}
        >
          Cancel
        </Button> */}
        <FormItem label={null} className="w-full!">
          <Button
            type="primary"
            htmlType="submit"
            loading={isMutating}
            disabled={!!contentError.length}
            className="w-full!"
          >
            Post
          </Button>
        </FormItem>
      </Flex>
    </Form>
  );
}
