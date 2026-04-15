import { useAuth } from "@/app/(shared)/provider/authProvider";
import {
  AppstoreOutlined,
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useState } from "react";

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: "thin",
  background: "#fff",
  padding: "24px 16px",
  flexDirection: "column",
  display: "flex",
};

const menuItems = [
  { key: "home", icon: <HomeOutlined />, label: "Home" },
  { key: "explore", icon: <AppstoreOutlined />, label: "Explore" },
  { key: "notifications", icon: <BellOutlined />, label: "Notifications" },
  { key: "profile", icon: <UserOutlined />, label: "Profile" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <Sider style={siderStyle} width={300}>
      <Layout
        style={{
          display: "flex",
          height: "100%",
          background: "white",
        }}
      >
        <Title level={4} style={{ marginBottom: 16, textAlign: "center" }}>
          Mini Social
        </Title>
        <Menu
          items={menuItems}
          mode="inline"
          defaultSelectedKeys={["home"]}
          styles={{
            root: {
              border: "none",
            },
            itemContent: {
              fontSize: 16,
            },
            item: {
              padding: "12px",
            },
            itemIcon: {
              fontSize: 18,
            }
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              alignItems: "center",
              gap: 4,
              marginBottom:12
            }}
          >
            <Avatar size={40} icon={<UserOutlined />} />
            <Text strong style={{ display: "block", fontSize: 14 }}>
              {user?.name}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              @{user?.email?.split("@")[0]}
            </Text>
          </div>
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            loading={isLoggingOut}
            block
          >
            Logout
          </Button>
        </div>
      </Layout>
    </Sider>
  );
}
