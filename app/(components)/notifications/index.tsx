import { SendCommentNotiPayload } from "@/app/(shared)/types/socket";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Title from "antd/es/typography/Title";

const Notifications = ({
  payload,
}: {
  payload: SendCommentNotiPayload | null;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center ">
        <Avatar
          size={42}
          src={payload?.user?.avatar_url}
          icon={
            !payload?.user?.avatar_url && (
              <UserOutlined className="text-white" />
            )
          }
        />
        <Title level={5}>{payload?.user?.username}</Title>
      </div>
      {payload?.message && (
        <div dangerouslySetInnerHTML={{ __html: payload?.message }} />
      )}
    </div>
  );
};

export default Notifications;
