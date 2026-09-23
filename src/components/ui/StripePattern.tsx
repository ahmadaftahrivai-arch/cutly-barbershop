import { cn } from "@/lib/cn";

interface StripePatternProps {
  className?: string;
  id: string;
}

/** Decorative diagonal barber-pole stripe pattern used as subtle background texture. */
export function StripePattern({ className, id }: StripePatternProps) {
  return (
    <svg
      className={cn("absolute", className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="7" height="14" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
