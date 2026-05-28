import useRemovePost from "@/app/(shared)/hooks/useRemovePost";
import { Modal } from "antd";
import Title from "antd/es/typography/Title";
import { toast } from "sonner";

const DeletePostModal = ({
  open,
  onClose,
  postId,
}: {
  open: boolean;
  onClose: () => void;
  postId: number | string;
}) => {
  const { removePost, isRemoving } = useRemovePost(() => {
    toast.success("Your post have been remove to the trash", {
      position: "bottom-left",
    });
    onClose();
  });

  const handleOnDelete = () => {
    removePost({ postId });
  };

  return (
    <Modal
      open={open}
      onCancel={isRemoving ? undefined : () => onClose()}
      onOk={handleOnDelete}
      className="translate-y-[200%]"
      closeIcon={null}
      okText="Remove"
      width={300}
      okButtonProps={{
        color: "danger",
        danger: true,
        loading: isRemoving,
        size: "medium",
      }}
      cancelButtonProps={{
        disabled: isRemoving,
      }}
    >
      <Title level={5}>Are you sure you want to remove the post?</Title>
    </Modal>
  );
};

export default DeletePostModal;
