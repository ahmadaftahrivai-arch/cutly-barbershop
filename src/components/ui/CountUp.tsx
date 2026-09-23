"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  duration = 1.4,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Positive bottom margin so elements sitting near the initial viewport
  // edge (e.g. a hero stat badge) still trigger on load, not just on scroll.
  const inView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [inView, target, duration, decimals, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}
      {suffix}
    </span>
  );
}
