import { ReactNode, SVGProps } from "react";
import { IconName } from "@/types";

const paths: Record<IconName, ReactNode> = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8.6 7.4 19 18" />
      <path d="M8.6 16.6 19 6" />
    </>
  ),
  razor: (
    <>
      <path d="M6 4h6l2 3-2 3H6z" />
      <path d="M9 10v9.5a1.5 1.5 0 0 0 3 0V10" />
      <path d="M6 4 4.5 6" />
    </>
  ),
  comb: (
    <>
      <path d="M4 6h16v3H4z" />
      <path d="M6 9v9M9 9v9M12 9v9M15 9v9M18 9v9" />
    </>
  ),
  beard: (
    <>
      <path d="M7 4c0 3-1 4-1 8a6 6 0 0 0 12 0c0-4-1-5-1-8" />
      <path d="M9 12c1 2 5 2 6 0" />
    </>
  ),
  clipper: (
    <>
      <rect x="9" y="3" width="6" height="9" rx="1.2" />
      <path d="M10 12h4l1 8H9z" />
      <path d="M9.5 6h5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
