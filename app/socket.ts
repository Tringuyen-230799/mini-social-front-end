"use client";
import { io } from "socket.io-client";
import { getToken } from "@/lib/api";
import { API_URL } from "@/app/(shared)/constant/endpoint";

const token = getToken();

export const socket = io(API_URL, {
  auth: {
    token: token
  },
  autoConnect: false
});

if (token) {
  socket.connect();
}

export function reconnectSocket() {
  const token = getToken();
  if (token) {
    socket.auth = { token };
    if (!socket.connected) {
      socket.connect();
    }
  }
}
