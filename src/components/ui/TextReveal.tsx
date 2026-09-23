"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: prefersReducedMotion ? 0 : "110%" },
    visible: { y: "0%", transition: { duration: 0.65, ease: easeOut } },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em]">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
