'use client';
import { apiClient } from "@/lib/api";
import { SWRConfig, SWRConfiguration } from "swr";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const swrFetcher = (key: string | [string, RequestInit]) => {
    if (Array.isArray(key)) {
      const [endpoint, options] = key;
      return apiClient(endpoint, options);
    }
    return apiClient(key);
  };

  const SWR_CONFIG: SWRConfiguration = {
    fetcher: swrFetcher,
    onError: (error) => {
      console.error("SWR Error:", error);
    },
  };

  return <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>;
}
