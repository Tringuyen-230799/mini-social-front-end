"use client";
import Title from "antd/es/typography/Title";

export default function Header() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
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
      </div>
    </div>
  );
}
