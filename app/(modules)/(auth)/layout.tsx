"use client";
import { Flex } from "antd";
import Banner from "./(container)/banner";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  console.log(user)

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        background: "#f5f5f5",
      }}
    >
      <Flex className="w-full! h-full!  ">
        <Banner />
        {children}
      </Flex>
    </div>
  );
}
