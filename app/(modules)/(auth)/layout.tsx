import { Flex } from "antd";
import Banner from "./(container)/banner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
