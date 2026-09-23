"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";

export function FloatingBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 lg:hidden"
        >
          <Link
            href="#booking"
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-background shadow-xl shadow-ink/20"
          >
            <CalendarCheck2 size={16} />
            Book a Cut
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
