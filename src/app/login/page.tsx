"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { AuthCard } from "@/components/ui/AuthCard";
import { FormField, inputClasses } from "@/components/ui/FormField";

const easeOut = [0.22, 1, 0.36, 1] as const;

const formContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
};

const formItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to manage your bookings."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-accent-dark">
            Sign up
          </Link>
        </>
      }
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
        initial="hidden"
        animate="visible"
        variants={formContainer}
      >
        <motion.div variants={formItem}>
          <FormField label="Email">
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className={inputClasses}
            />
          </FormField>
        </motion.div>
        <motion.div variants={formItem}>
          <FormField label="Password">
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className={inputClasses}
            />
          </FormField>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="flex items-center gap-2 overflow-hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={submitting}
          variants={formItem}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-background transition-colors duration-200 hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log In"}
        </motion.button>
      </motion.form>
    </AuthCard>
  );
}
