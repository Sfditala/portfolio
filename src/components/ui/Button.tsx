import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "inline";

const base =
  "group/btn inline-flex items-center gap-x-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-solid text-text shadow-[0_8px_30px_-8px] shadow-accent/50 hover:bg-accent",
  outline: "border border-border bg-surface/60 text-text hover:border-text-dim",
  ghost: "text-text-muted hover:text-text",
};

const sizes: Record<Size, string> = {
  sm: "h-9 justify-center px-4 text-sm whitespace-nowrap",
  md: "h-11 justify-center px-5 text-sm whitespace-nowrap",
  lg: "h-13 justify-center px-7 text-base whitespace-nowrap",
  // Wraps like text; for sentence-length CTAs.
  inline: "flex-wrap text-left text-sm",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant, size, className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
