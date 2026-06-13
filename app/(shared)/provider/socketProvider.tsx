import { socket } from "@/app/socket";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./authProvider";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { NOTIFICATION_EVENT } from "../constant/notification";
import { notification } from "antd";
import Notifications from "@/app/(components)/notifications";
import { Notification } from "../types/notification";

const SocketContext = createContext<{
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
} | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const openNotification = (data: Notification) => {
    notification.open({
      placement: "bottomRight",
      description: <Notifications payload={data} />,
      closeIcon: false,
      duration: 5,
      styles: {
        root: {
          padding: "12px",
          maxWidth: "280px",
          cursor: "pointer",
        },
        title: {
          display: "none",
        },
        description: {
          margin: "0px",
        },
      },
    });
  };

  useEffect(() => {
    if (userId && !socket.connected) {
      socket.connect();
    } else if (!userId && socket.connected) {
      socket.disconnect();
    }
  }, [userId]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected");
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

  useEffect(() => {
    socket.on(NOTIFICATION_EVENT.COMMENT, openNotification);

    return () => {
      socket.off(NOTIFICATION_EVENT.COMMENT);
    };
  }, []);

  useEffect(() => {
    socket.on(NOTIFICATION_EVENT.LIKE, openNotification);

    return () => {
      socket.off(NOTIFICATION_EVENT.LIKE);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("Out of the scope");
  }
  return context;
};
