import { Modal } from "antd";
import { useModalStore } from "./StoreProvider";

export default function ModalProvider() {
  const { title, isOpen, close, content } = useModalStore(
    (state) => state,
  );

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={close}
      footer={null}
      styles={{
        container: {
          paddingBottom: '4px'
        },
        title: {
          fontSize: 20
        },
      }}
    >
      {content}
    </Modal>
  );
}
