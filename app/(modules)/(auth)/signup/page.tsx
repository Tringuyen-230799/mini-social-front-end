"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Typography, Alert, Button } from "antd";
import Link from "next/link";
import { useAuth } from "@/app/(shared)/provider/authProvider";
import Background from "../(container)/background";

const { Title, Text } = Typography;

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      await signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.confirmPassword,
      );
      router.push("/");
    } catch (err: any) {
      console.log(err);
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      <Background />
      <div className="min-w-[400px]! flex flex-col gap-6">
        <Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
          Join with VibeMem Family
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
          <div className="flex gap-2 w-full">
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
              className="w-full!"
            >
              <Input placeholder="First name" />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
              className="w-full!"
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </div>
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
            validateFirst={true}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
              { max: 25, message: "Password must be less than 25 characters" },
              {
                pattern: /^(?=.*[A-Z])(?=.*@)(?=.*[0-9]).+$/,
                message:
                  "Must contain at least one uppercase letter, one number, and the @ symbol.",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please enter your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "center", display: "block" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#1890ff" }}>
            Login
          </Link>
        </Text>
      </div>
    </div>
  );
}
