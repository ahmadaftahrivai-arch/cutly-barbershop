import { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  children: ReactNode;
}

const inputClasses =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export function FormField({
  label,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <label className={cn("block", className)} {...props}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export { inputClasses };
