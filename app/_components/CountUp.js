"use client";

import { useEffect, useRef } from "react";

/**
 * CountUp
 * Smoothly animates numbers directly via DOM textContent when entering the viewport.
 * Zero React re-renders during animation loop.
 */
export default function CountUp({
  end,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
}) {
  const spanRef = useRef(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      el.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * end;
            const formatted =
              decimals > 0
                ? currentVal.toFixed(decimals)
                : Math.floor(currentVal).toLocaleString();
            if (el) {
              el.textContent = `${prefix}${formatted}${suffix}`;
            }
            if (progress < 1) {
              requestAnimationFrame(step);
            } else if (el) {
              el.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, prefix, suffix, decimals]);

  return (
    <span ref={spanRef} className="count-up-number">
      {prefix}0{suffix}
    </span>
  );
}
