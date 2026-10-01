"use client";

import { useEffect, useRef, useState } from "react";

/** Width of an element, tracked with ResizeObserver — windows resize independently of the viewport. */
export function useWidth<T extends HTMLElement>(initial = 1000) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}
