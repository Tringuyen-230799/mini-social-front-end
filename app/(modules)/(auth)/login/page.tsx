"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Typography, Alert, Button } from "antd";
import Link from "next/link";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import Background from "../(container)/background";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      await login(values.email, values.password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      <Background />
      <div className="min-w-[400px]! flex flex-col gap-6">
        <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
          Welcome To VibeMem
        </Title>

        {error && (
          <Alert
            title={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "center", display: "block" }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "#1890ff" }}>
            Sign up
          </Link>
        </Text>
      </div>
    </div>
  );
}
