"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener?.("change", callback);
  return () => mq.removeEventListener?.("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * MotionReveal
 * 
 * Lightweight, GPU-accelerated scroll reveal wrapper using IntersectionObserver.
 * Triggers clean, smooth Apple-style fade-and-lift transitions with stagger support.
 * Automatically respects prefers-reduced-motion.
 */
export default function MotionReveal({
  children,
  delay = 0,
  duration = 600,
  distance = 24,
  direction = "up", // "up" | "down" | "left" | "right" | "none"
  threshold = 0.15,
  className = "",
  as: Component = "div",
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, prefersReducedMotion]);

  // Compute translation based on direction
  let transformHidden = "none";
  if (!prefersReducedMotion) {
    if (direction === "up") transformHidden = `translate3d(0, ${distance}px, 0)`;
    else if (direction === "down") transformHidden = `translate3d(0, -${distance}px, 0)`;
    else if (direction === "left") transformHidden = `translate3d(${distance}px, 0, 0)`;
    else if (direction === "right") transformHidden = `translate3d(-${distance}px, 0, 0)`;
  }

  const isRevealed = prefersReducedMotion || isVisible;

  const style = prefersReducedMotion
    ? {}
    : {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "translate3d(0, 0, 0)" : transformHidden,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isRevealed ? "auto" : "opacity, transform",
      };

  return (
    <Component
      ref={ref}
      className={`motion-reveal ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
