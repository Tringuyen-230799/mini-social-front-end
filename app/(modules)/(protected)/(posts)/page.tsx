"use client";
import Sidebar from "@/app/(components)/sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useIntersection } from "@/app/(shared)/hooks/useInfiniteScroll";
import { useCallback, useEffect, useState } from "react";
import { UPDATE_POST_EVENT } from "@/app/(shared)/constant/event";
import PostList from "./(containers)/PostList";
import { usePosts } from "@/app/(shared)/hooks/usePosts";
import CreatePostModal from "./(containers)/CreatePostModal";
import EditPostModal from "./(containers)/EditPostModal";
import DeletePostModal from "./(containers)/DeletePostModal";

export default function HomePage() {
  const { data, size, setSize, isValidating, mutate } = usePosts();
  const [modal, setModal] = useState<{
    type: "edit" | "create" | "delete" | null;
    postId?: string | number;
    open: boolean;
  }>({
    type: null,
    postId: undefined,
    open: false,
  });

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

  const handleOpenModal = (
    type: "edit" | "create" | "delete" | null,
    postId?: string | number,
  ) => {
    switch (type) {
      case "create":
        setModal({ type, postId: undefined, open: true });
        break;

      case "edit":
        setModal({ type, postId, open: true });
        break;

      case "delete":
        setModal({ type, postId, open: true });
        break;
    }
  };

  return (
    <>
      {modal.open && modal.type === "create" && (
        <CreatePostModal
          onClose={() =>
            setModal({ type: "create", postId: undefined, open: false })
          }
        />
      )}
      {modal.open && modal.type === "edit" && (
        <EditPostModal
          postId={modal.postId!}
          onClose={() =>
            setModal({ type: "edit", postId: undefined, open: false })
          }
        />
      )}
      {modal.open && modal.type === "delete" && (
        <DeletePostModal
          open={modal.open}
          postId={modal.postId!}
          onClose={() =>
            setModal({ type: "delete", postId: undefined, open: false })
          }
        />
      )}
      <Layout style={{ height: "100dvh", overflowY: "scroll" }}>
        <Sidebar onOpenCreatePostModal={() => handleOpenModal("create")} />
        <Layout style={{ height: "100%" }}>
          <Content
            style={{
              margin: "0px auto",
              maxWidth: 620,
              minWidth: 620,
              height: "100%",
            }}
          >
            <PostList
              posts={posts}
              onEdit={handleOpenModal}
              onDelete={handleOpenModal}
            />
            <div
              ref={targetRef}
              style={{ height: "10px", visibility: "hidden" }}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
