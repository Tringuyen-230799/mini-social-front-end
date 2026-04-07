'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Input, Typography, Alert, Button } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

const { Title, Text } = Typography;

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      await signup(values.name, values.email, values.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 0 }}>
          Create Account
        </Title>

        {error && <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} />}

        <Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please enter your name' },
              { min: 2, message: 'Name must be at least 2 characters' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: 'center', display: 'block' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#1890ff' }}>
            Login
          </Link>
        </Text>
      </div>
    </Card>
  );
}
