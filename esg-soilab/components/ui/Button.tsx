import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--green-800)] bg-[var(--green-800)] text-[var(--canvas)] hover:border-[var(--green-700)] hover:bg-[var(--green-700)]",
  outline:
    "border-[var(--border-md)] bg-transparent text-[var(--ink)] hover:border-[var(--green-800)] hover:bg-[var(--green-50)]",
  ghost:
    "border-transparent bg-transparent text-[var(--ink-mid)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-[0.96rem]",
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] border font-medium transition duration-200 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-55";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
