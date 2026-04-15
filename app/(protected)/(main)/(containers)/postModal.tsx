"use client";
import Upload from "@/app/(components)/upload";
import { useModalStore } from "@/app/(shared)/provider/StoreProvider";
import { createPost } from "@/lib/post";
import { Button, Flex } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function PostModal() {
  const { close, isOpen } = useModalStore((state) => state);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>();
  const { pending } = useFormStatus();

  const createNewPost = async () => {
    const newPost = new FormData();
    newPost.append("content", content);
    if (file) {
      newPost.append("images", file);  
    }
    try {
      await createPost(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (!isOpen) return null;

  if (pending) {
    return "loading";
  }

  return (
    <Form
      id="upload-post"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={createNewPost}
    >
      <FormItem
        name="content"
        rules={[
          { max: 1000, message: "Post content cannot exceed 1000 characters." },
        ]}
      >
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Create your post..."
          autoSize={{ minRows: 1, maxRows: 5 }}
        />
      </FormItem>

      <Upload value={file} onChange={setFile} />

      <Flex justify="flex-end" gap={8} style={{ marginTop: 16 }}>
        <Button
          type="default"
          onClick={() => {
            setFile(undefined);
            close();
          }}
        >
          Cancel
        </Button>
        <FormItem label={null}>
          <Button type="primary" htmlType="submit" loading={pending}>
            Submit
          </Button>
        </FormItem>
      </Flex>
    </Form>
  );
}
