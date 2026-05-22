import Upload from "@/app/(components)/upload";
import useEditPost from "@/app/(shared)/hooks/useEditPost";
import usePostDetail from "@/app/(shared)/hooks/usePostDetail";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import { Post } from "@/app/(shared)/types/post";
import { CameraFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import Text from "antd/es/typography/Text";
import { useState } from "react";

const EditForm = ({ post }: { post: Post }) => {
  const { content: initialContent, images } = post;
  const { user } = useAuth();
  const [openUpload, setOpenUpload] = useState(true);
  const { editPost, isEditing } = useEditPost();
  const [content, setContent] = useState(initialContent || "");
  const [file, setFile] = useState<File>();
  const handleSubmit = () => {};
  const imageUrl = images?.[0]?.url
    ? process.env.NEXT_PUBLIC_API_URL + `${images[0]?.url}`
    : undefined;

  return (
    <Form
      id="upload-post"
      initialValues={{ remember: true }}
      autoComplete="off"
      className="space-y-4!"
      onFinish={handleSubmit}
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
        placeholder="Create your post..."
        autoSize={{ minRows: 1, maxRows: 5 }}
        styles={{
          root: {
            marginBottom: 16,
          },
        }}
        variant="borderless"
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

      {openUpload && <Upload value={imageUrl} onChange={setFile} />}
      <Flex justify="flex-end" gap={8}>
        <FormItem label={null} className="w-full!">
          <Button type="primary" htmlType="submit" className="w-full!">
            Edit
          </Button>
        </FormItem>
      </Flex>
    </Form>
  );
};

const EditPostModal = ({ postId }: { postId: number | string }) => {
  const { post, isLoading } = usePostDetail(postId);

  if (isLoading || !post) {
    return <div>Loading...</div>;
  }

  return <EditForm post={post!} />;
};

export default EditPostModal;
