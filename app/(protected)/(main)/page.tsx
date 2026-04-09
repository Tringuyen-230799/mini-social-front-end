"use client";

import { useState } from "react";

import Sidebar from "@/app/(components)/sidebar";
import Header from "@/app/(components)/header";
import Post from "./(containers)/post";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Mitchell",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      verified: true,
    },
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop",
    title: "Urban Spaces",
    description:
      "The contrast of teal against white creates a sophisticated, calming atmosphere perfect for any modern interior.",
    likes: 234,
    comments: 12,
    timestamp: "2h ago",
    liked: false,
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      verified: true,
    },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    title: "Alpine Reflection",
    description:
      "The majesty of mountains captured in complete serenity during early summer mornings.",
    likes: 456,
    comments: 23,
    timestamp: "4h ago",
    liked: true,
  },
  {
    id: 3,
    author: {
      name: "Emily Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      verified: false,
    },
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
    title: "Open Road",
    description:
      "Sometimes the journey matters more than the destination. Embracing the freedom of the open highway.",
    likes: 189,
    comments: 8,
    timestamp: "6h ago",
    liked: false,
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState(mockPosts);
  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <Post posts={posts} toggleLike={toggleLike} />
        </Content>
      </Layout>
    </Layout>
  );
}
