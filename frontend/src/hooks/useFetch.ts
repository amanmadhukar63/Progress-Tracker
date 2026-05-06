import { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

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

  const { getToken } = useLocalStorage();
  const token = getToken();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  const fetchData = useCallback(
    async (override?: Partial<UseFetchOptions>) => {
      const finalMethod = override?.method || method;
      const finalHeaders = { ...headers, ...(override?.headers || {}) };
      const finalBody = override?.body ?? body;

      let tokenHeader = {};
      if(token) {
        tokenHeader = {
          "Authorization": `Bearer ${token}`
        }
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          method: finalMethod,
          headers: {
            "Content-Type": "application/json",
            ...tokenHeader,
            ...finalHeaders,
          },
          credentials: "include",
          body: finalBody ? JSON.stringify(finalBody) : undefined,
        });

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }

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