import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "accent" | "outlineLight" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-background hover:bg-accent-dark hover:text-background",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-background",
  accent: "bg-accent text-ink hover:bg-accent-dark hover:text-background",
  outlineLight:
    "bg-transparent text-background border border-background/25 hover:bg-background hover:text-ink",
  ghost: "bg-transparent text-ink hover:text-accent-dark",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  href: string;
}

export function Button({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
