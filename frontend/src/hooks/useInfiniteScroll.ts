import { useState, useCallback, useRef } from 'react';

export const useInfiniteScroll = (
  fetchMore: () => Promise<void>,
  hasMore: boolean
) => {
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          await fetchMore();
          setLoading(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMore]
  );

  return { lastElementRef, loading };
};
