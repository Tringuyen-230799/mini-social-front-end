"use client";
import Sidebar from "@/app/(components)/sidebar";
import Header from "@/app/(components)/header";
import Post from "./(containers)/post";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import useSWRInfinite from "swr/infinite";
import { apiClient } from "@/lib/api";
import { AllPostsResponse } from "@/app/(shared)/types/post";
import { useIntersection } from "@/app/(shared)/hooks/useInfiniteScroll";
import { useCallback } from "react";

const getKey = (pageIndex: number, previousPageData: AllPostsResponse) => {
  if (previousPageData && !previousPageData?.data?.content?.length) {
    return null;
  }
  return `/api/posts?page=${pageIndex + 1}&limit=10`;
};

export default function HomePage() {
  const { data, size, setSize, isValidating } = useSWRInfinite<
    AllPostsResponse,
    Error
  >(getKey, apiClient);

  const onLoadMore = useCallback(() => {
    if (isValidating || size === data?.[0]?.data?.totalPages) return;
    setSize(size + 1);
  }, [size, setSize, data, isValidating]);

  const { targetRef } = useIntersection(onLoadMore);

  if (!data) {
    return null;
  }

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
          <Post posts={posts} toggleLike={() => {}} />
          <div
            ref={targetRef}
            style={{ height: "10px", visibility: "hidden" }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
