'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Avatar, Tag } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  ShareAltOutlined,
  BookOutlined,
  HomeOutlined,
  AppstoreOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/lib/auth-context';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';

// Mock post data
const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Sarah Mitchell',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      verified: true,
    },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop',
    title: 'Urban Spaces',
    description:
      'The contrast of teal against white creates a sophisticated, calming atmosphere perfect for any modern interior.',
    likes: 234,
    comments: 12,
    timestamp: '2h ago',
    liked: false,
  },
  {
    id: 2,
    author: {
      name: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      verified: true,
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    title: 'Alpine Reflection',
    description:
      'The majesty of mountains captured in complete serenity during early summer mornings.',
    likes: 456,
    comments: 23,
    timestamp: '4h ago',
    liked: true,
  },
  {
    id: 3,
    author: {
      name: 'Emily Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      verified: false,
    },
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
    title: 'Open Road',
    description: 'Sometimes the journey matters more than the destination. Embracing the freedom of the open highway.',
    likes: 189,
    comments: 8,
    timestamp: '6h ago',
    liked: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeFilter, setActiveFilter] = useState('following');
  const [posts, setPosts] = useState(mockPosts);

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

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: 240,
          background: '#fff',
          padding: '24px 16px',
          borderRight: '1px solid #f0f0f0',
          position: 'fixed',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Title level={4} style={{ marginBottom: 32 }}>
          Mini Social
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <Button
            type="primary"
            icon={<HomeOutlined />}
            size="large"
            style={{ justifyContent: 'flex-start', fontWeight: 500 }}
          >
            Home
          </Button>
          <Button
            type="text"
            icon={<AppstoreOutlined />}
            size="large"
            style={{ justifyContent: 'flex-start' }}
          >
            Explore
          </Button>
          <Button
            type="text"
            icon={<BellOutlined />}
            size="large"
            style={{ justifyContent: 'flex-start' }}
          >
            Notifications
          </Button>
          <Button
            type="text"
            icon={<UserOutlined />}
            size="large"
            style={{ justifyContent: 'flex-start' }}
          >
            Profile
          </Button>
          <Button
            type="text"
            icon={<SettingOutlined />}
            size="large"
            style={{ justifyContent: 'flex-start' }}
          >
            Settings
          </Button>
        </div>

        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar size={40} icon={<UserOutlined />} />
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Text strong style={{ display: 'block', fontSize: 14 }}>
                {user?.name}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                @{user?.email?.split('@')[0]}
              </Text>
            </div>
          </div>
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            loading={isLoggingOut}
            block
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 240, flex: 1, padding: '24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ marginBottom: 16 }}>
              Curated Feed
            </Title>
            <div style={{ display: 'flex', gap: 8 }}>
              {['following', 'discover', 'popular', 'latest'].map((filter) => (
                <Button
                  key={filter}
                  type={activeFilter === filter ? 'primary' : 'default'}
                  onClick={() => setActiveFilter(filter)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {posts.map((post) => (
              <Card key={post.id} style={{ overflow: 'hidden' }}>
                {/* Post Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <Avatar size={40} src={post.author.avatar} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Text strong>{post.author.name}</Text>
                      {post.author.verified && (
                        <Tag color="blue" style={{ margin: 0, fontSize: 10, padding: '0 4px' }}>
                          ✓
                        </Tag>
                      )}
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {post.timestamp}
                    </Text>
                  </div>
                </div>

                {/* Post Image */}
                <div
                  style={{
                    width: '100%',
                    height: 360,
                    background: `url(${post.image}) center/cover`,
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                />

                {/* Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: 12,
                    paddingBottom: 12,
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <Button
                    type="text"
                    icon={post.liked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                    onClick={() => toggleLike(post.id)}
                  >
                    {post.likes}
                  </Button>
                  <Button type="text" icon={<CommentOutlined />}>
                    {post.comments}
                  </Button>
                  <Button type="text" icon={<ShareAltOutlined />} />
                  <Button type="text" icon={<BookOutlined />} style={{ marginLeft: 'auto' }} />
                </div>

                {/* Post Content */}
                <div>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    {post.title}
                  </Title>
                  <Paragraph style={{ marginBottom: 0, color: '#666' }}>
                    {post.description}
                  </Paragraph>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
