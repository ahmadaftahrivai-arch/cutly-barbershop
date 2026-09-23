"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const logo: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28, scale: prefersReducedMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut, delay: 0.1 },
    },
  };

  const footerVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut, delay: 0.35 },
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={logo}>
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          CUTLY
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={card}
        className="mt-8 w-full max-w-md rounded-[1.75rem] border border-line bg-background p-8 shadow-xl shadow-ink/5 sm:p-10"
      >
        <h1 className="font-display text-2xl font-semibold text-ink">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>

        <div className="mt-8">{children}</div>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={footerVariants}
        className="mt-6 text-sm text-ink-muted"
      >
        {footer}
      </motion.p>
    </main>
  );
}
