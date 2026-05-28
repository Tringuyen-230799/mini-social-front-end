import Upload from "@/app/(components)/upload";
import useEditPost, { EditPostPayload } from "@/app/(shared)/hooks/useEditPost";
import usePostDetail from "@/app/(shared)/hooks/usePostDetail";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import { Post } from "@/app/(shared)/types/post";
import { CameraFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Modal } from "antd";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { toast } from "sonner";

const EditForm = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  const { content: initialContent, resources } = post;
  const { user } = useAuth();
  const [openUpload, setOpenUpload] = useState(true);
  const [content, setContent] = useState(initialContent || "");
  const [isOpenDiscardModal, setIsOpenDiscardModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [oldImgIds, setOldImgIds] = useState<Array<number | string> | null>(
    null,
  );
  const isDirty =
    content !== initialContent || Boolean(file) || Boolean(oldImgIds);

  const { editPost, isEditing } = useEditPost(() => {
    toast.success("Your post have been edited", {
      position: "bottom-left",
    });
    onClose();
  });

  const handleSubmit = () => {
    if (!isDirty) return;
    const isContentChange = content !== initialContent;
    const payload = {
      ...(isContentChange && {
        content: content,
      }),
      ...(file && {
        images: file,
      }),
      ...(oldImgIds?.length && {
        oldImgIds,
      }),
      postId: post.id,
    } as EditPostPayload;
    editPost(payload);
  };

  const handleOnClose = () => {
    if (isDirty) {
      setIsOpenDiscardModal(true);
    } else {
      onClose();
    }
  };

  const handleOnEdit = (id: string | number) => {
    if (!id) return;
    setOldImgIds([id]);
  };

  return (
    <>
      <Modal
        open={isOpenDiscardModal}
        onCancel={() => setIsOpenDiscardModal(false)}
        onOk={() => onClose()}
        className="translate-y-[200%]"
        closeIcon={null}
        okText="Discard"
        width={380}
        okButtonProps={{ color: "danger", danger: true }}
      >
        <Title level={5}>
          Are you sure you want to discard changes to this post?
        </Title>
      </Modal>
      <Modal
        open={true}
        onCancel={!isEditing ? handleOnClose : undefined}
        footer={null}
        closeIcon={null}
      >
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
            disabled={isEditing}
          />

          <FormItem label={null} className="w-full! flex! justify-end!">
            <Button
              onClick={() => setOpenUpload(!openUpload)}
              type="text"
              disabled={isEditing}
              size="large"
              icon={<CameraFilled className="text-xl! text-neutral-500!" />}
            />
          </FormItem>

          {openUpload && (
            <Upload
              imgId={resources?.[0].id}
              value={resources?.[0].url}
              onChange={setFile}
              onEdit={handleOnEdit}
              isEdit
              loading={isEditing}
            />
          )}
          <Flex justify="flex-end" gap={8}>
            <FormItem label={null} className="w-full!">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full!"
                loading={isEditing}
                disabled={!isDirty}
              >
                Edit
              </Button>
            </FormItem>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

const EditPostModal = ({
  postId,
  onClose,
}: {
  postId: number | string;
  onClose: () => void;
}) => {
  const { post, isLoading, isValidating } = usePostDetail(postId);

  if (isLoading || !post || isValidating) {
    return <Modal open={true}>Loading...</Modal>;
  }

  return <EditForm post={post!} onClose={onClose} />;
};

export default EditPostModal;
