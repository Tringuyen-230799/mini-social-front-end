import { SWRConfig, SWRConfiguration } from "swr";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const SWR_CONFIG: SWRConfiguration = {
    fetcher: (resource, init) =>
      fetch(resource, init).then((res) => res.json()),
    onError: (error) => {
      console.error("SWR Error:", error);
    }
  };

  return <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>;
}
