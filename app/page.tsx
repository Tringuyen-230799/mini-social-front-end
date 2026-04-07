import { Button, Card } from "antd";
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Title from "antd/es/typography/Title";

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <main style={{ padding: '2rem', width: '100%', maxWidth: '600px' }}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: "100%" }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 0 }}>
              Mini Social Network
            </Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
              <Link href="/login" style={{ width: '100%', display: 'block' }}>
                <Button type="primary" size="large" icon={<LoginOutlined />} block>
                  Login
                </Button>
              </Link>
              <Link href="/signup" style={{ width: '100%', display: 'block' }}>
                <Button size="large" icon={<UserAddOutlined />} block>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}