import { useEffect, useState, useCallback } from "react";

type UseFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  skip?: boolean; // optional: to prevent auto fetch
};

type UseFetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
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

  const refetch = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (skip) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, reload, skip, ...deps]);

  return { data, loading, error, refetch };
}