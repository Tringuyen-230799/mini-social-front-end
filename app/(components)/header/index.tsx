import { Layout } from "antd";

export default function Header() {
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      hello
    </Layout.Header>
  );
}
