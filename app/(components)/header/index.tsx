'use client';
import PostModal from "@/app/(protected)/(main)/(containers)/postModal";
import { useModalStore } from "@/app/(shared)/provider/StoreProvider";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Title from "antd/es/typography/Title";

export default function Header() {
  const { open, content } = useModalStore((state) => state);

  const handleOpenModal = () => {
    open({
      content: <PostModal />,
      title: "Create Post",
    });
  };

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "white",
        padding: "24px",
        fontSize: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Mini Social
        </Title>
        <Button
          type="primary"
          size="large"
          styles={{
            root: {
              fontSize: 16,
            },
          }}
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
        >
          Create Post
        </Button>
      </div>
    </Layout.Header>
  );
}
