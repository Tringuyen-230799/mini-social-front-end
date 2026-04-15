"use client";
import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import {
  type ModalStore,
  createModalStore,
} from "@/app/(shared)/stores/useOpenModal";
import ModalProvider from "./ModalProvider";

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(
  undefined,
);

export interface ModalStoreProviderProps {
  children: ReactNode;
}

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
  const [store] = useState(() => createModalStore());
  return (
    <ModalStoreContext.Provider value={store}>
      <ModalProvider />
      {children}
    </ModalStoreContext.Provider>
  );
};

export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext);
  if (!modalStoreContext) {
    throw new Error(`useModalStore must be used within ModalStoreProvider`);
  }

  return useStore(modalStoreContext, selector);
};
