import { useAuth } from "@/app/(shared)/provider/authProvider";
import {
  AppstoreOutlined,
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
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
  const [expanded, setExpanded] = useState(false);
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
    <Sider
      style={siderStyle}
      width={expanded ? 240 : 80}
      trigger={null}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Layout
        style={{
          display: "flex",
          height: "100%",
          background: "white",
        }}
      >
        <Menu
          items={menuItems.map((item) => ({
            ...item,
            label: expanded ? item.label : "",
          }))}
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
            },
          }}
        />
        <div className="flex mt-auto ml-1 w-full">
          <Button
            type='text'
            size="large"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            loading={isLoggingOut}
            className="w-full text-left!"
          >
            {expanded && "Logout"}
          </Button>
        </div>
      </Layout>
    </Sider>
  );
}
