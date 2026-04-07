'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Tag, Button, Spin } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/lib/auth-context';

const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f5f5f5' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={2} style={{ marginBottom: 0 }}>
                  <UserOutlined /> Dashboard
                </Title>
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  loading={isLoggingOut}
                >
                  Logout
                </Button>
              </div>

              <Paragraph>
                Welcome to your protected dashboard! This page is only accessible to authenticated users.
              </Paragraph>

              <Card style={{ background: '#fafafa' }}>
                <Title level={4}>User Information</Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <strong>Name:</strong> {user.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>User ID:</strong> <Tag color="blue">{user.id}</Tag>
                  </div>
                </div>
              </Card>

              <Card style={{ background: '#e6f7ff', borderColor: '#1890ff' }}>
                <Title level={5}>🎉 Express Backend Integration!</Title>
                <Paragraph>
                  This Next.js app is connected to your Express backend:
                </Paragraph>
                <ul>
                  <li>✅ Client-side API calls</li>
                  <li>✅ Cookie-based authentication</li>
                  <li>✅ Protected routes with redirect</li>
                  <li>✅ Auth context with React hooks</li>
                  <li>✅ Form validation with Ant Design</li>
                </ul>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
