"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimateIn({
  children,
  delay = 0,
  duration = 600,
  className = "",
  style = {},
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        // Let animation handle opacity — don't override it here
        ...(visible ? {} : { opacity: 0 }),
        animation: visible
          ? `fadeInUp ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`
          : "none",
      }}
    >
      {children}
    </div>
  );
}
