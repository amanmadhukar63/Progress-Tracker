import { useEffect, useState, useCallback } from "react";

type UseFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  skip?: boolean;
};

type UseFetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  execute: (override?: Partial<UseFetchOptions>) => Promise<T | null>;
};

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {},
  deps: any[] = []
): UseFetchResponse<T> {
  const { method = "GET", headers = {}, body, skip = false } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  const fetchData = useCallback(
    async (override?: Partial<UseFetchOptions>) => {
      const finalMethod = override?.method || method;
      const finalHeaders = { ...headers, ...(override?.headers || {}) };
      const finalBody = override?.body ?? body;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          method: finalMethod,
          headers: {
            "Content-Type": "application/json",
            ...finalHeaders,
          },
          credentials: "include",
          body: finalBody ? JSON.stringify(finalBody) : undefined,
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const result = await res.json();
        setData(result);
        return result;
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, method, headers, body]
  );

  const refetch = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, [reload, skip, ...deps]);

  return { data, loading, error, refetch, execute: fetchData };
}