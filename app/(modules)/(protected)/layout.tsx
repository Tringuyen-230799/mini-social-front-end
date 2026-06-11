"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import { socket } from "@/app/socket";
import { notification, Spin } from "antd";
import { SendCommentNotiPayload } from "@/app/(shared)/types/socket";
import Notifications from "@/app/(components)/notifications";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user && !socket.connected) {
      socket.connect();
    }
  }, [user, loading, router]);

  useEffect(() => {
    socket.on("notification", (data: SendCommentNotiPayload) => {
      notification.open({
        placement: "bottomRight",
        description: <Notifications payload={data} />,
        closeIcon: false,
        duration: 5,
        styles: {
          root: {
            padding: "12px",
          },
        },
      });
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
