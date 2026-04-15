import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/app/(shared)/provider/authProvider";
import "./globals.css";
import SWRProvider from "./(shared)/provider/swrProvider";

export const metadata: Metadata = {
  title: "Mini Social - Next.js + Express",
  description: "Authentication with Next.js and Express backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AntdRegistry>
          <AuthProvider>
            <SWRProvider>{children}</SWRProvider>
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
