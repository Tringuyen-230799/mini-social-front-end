import {
  Notification,
  NotificationType,
} from "@/app/(shared)/types/notification";
import { CommentOutlined, LikeFilled, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Notifications = ({ payload }: { payload: Notification | null }) => {
  const handleNavigateToEntity = () => {
    console.log(payload?.entityId);
  };

  return (
    <div className="flex gap-2" onClick={handleNavigateToEntity}>
      <div className="w-10.5 h-10.5">
        <Avatar
          size={42}
          src={payload?.user?.avatar_url}
          icon={
            !payload?.user?.avatar_url && (
              <UserOutlined className="text-white" />
            )
          }
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <b className="mb-0! truncate w-36.25">{payload?.user?.username}</b>
          <NotificationIcon type={payload?.type || "comment"} />
        </div>
        {payload?.message && (
          <div dangerouslySetInnerHTML={{ __html: payload?.message }} />
        )}
      </div>
    </div>
  );
};

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  const icon: Record<NotificationType, React.ReactNode> = {
    comment: <CommentOutlined />,
    like: <LikeFilled />,
    follow: "",
    mention: "",
  };

  const bgColor: Record<NotificationType, string> = {
    comment: "bg-green-300  text-neutral-700",
    like: "bg-blue-700 text-white",
    follow: "",
    mention: "",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full w-8 h-8 ${bgColor[type]}`}
    >
      {icon[type]}
    </div>
  );
};

export default Notifications;
