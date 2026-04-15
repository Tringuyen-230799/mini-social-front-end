// src/stores/counter-store.ts
import React, { JSX } from "react";
import { createStore } from "zustand/vanilla";

export type ModalState = {
  isOpen: boolean;
  title: string;
  content: React.ReactNode | JSX.Element;
};

export type ModalCounterActions = {
  open: ({
    title,
    content,
  }: {
    title: string;
    content: React.ReactNode | JSX.Element;
  }) => void;
  close: () => void;
};

export type ModalStore = ModalState & ModalCounterActions;

export const defaultInitState: ModalState = {
  content: null,
  isOpen: false,
  title: "",
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    open: ({ title, content }) => set({ isOpen: true, title, content }),
    close: () =>
      set({ isOpen: false, content: null, title: "" }),
  }));
};
