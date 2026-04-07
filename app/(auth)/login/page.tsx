"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Input, Typography, Alert, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if(user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      await login(values.email, values.password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
          Welcome Back
        </Title>

        {error && (
          <Alert
            message={error}
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
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
    </Card>
  );
}
