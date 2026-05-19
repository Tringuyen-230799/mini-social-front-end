"use client";
import Sidebar from "@/app/(components)/sidebar";
import Header from "@/app/(components)/header";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useIntersection } from "@/app/(shared)/hooks/useInfiniteScroll";
import { useCallback, useEffect } from "react";
import { UPDATE_POST_EVENT } from "@/app/(shared)/constant/event";
import PostList from "./(containers)/PostList";
import { usePost } from "@/app/(shared)/hooks/usePost";

export default function HomePage() {
  const { data, size, setSize, isValidating, mutate } = usePost();

  const handleRefreshPosts = useCallback(() => {
    setSize(1);
    mutate();
  }, [setSize, mutate]);

  useEffect(() => {
    window.addEventListener(UPDATE_POST_EVENT, handleRefreshPosts);
    return () => {
      window.removeEventListener(UPDATE_POST_EVENT, handleRefreshPosts);
    };
  }, [handleRefreshPosts]);

  const onLoadMore = useCallback(() => {
    if (isValidating || size === data?.[0]?.data?.totalPages) return;
    setSize(size + 1);
  }, [size, setSize, data, isValidating]);

  const { targetRef } = useIntersection(onLoadMore);

  const posts = data?.flatMap((page) => page?.data?.content || []) || [];

  return (
    <Layout style={{ height: "100dvh", overflowY: "scroll" }}>
      <Sidebar />
      <Layout style={{ height: "100%" }}>
        <Header />
        <Content
          style={{
            margin: "0px auto",
            maxWidth: 620,
            minWidth: 620,
            height: "100%",
          }}
        >
          <PostList posts={posts} toggleLike={() => {}} />
          <div
            ref={targetRef}
            style={{ height: "10px", visibility: "hidden" }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
