import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipVariant = "e" | "s" | "g";

const styles: Record<ChipVariant, string> = {
  e: "border-[var(--green-100)] bg-[var(--green-50)] text-[var(--green-900)]",
  s: "border-[var(--terra-100)] bg-[var(--terra-50)] text-[var(--terra-800)]",
  g: "border-[var(--border-md)] bg-[var(--surface-2)] text-[var(--ink)]",
};

const dots: Record<ChipVariant, string> = {
  e: "bg-[var(--green-800)]",
  s: "bg-[var(--terra-600)]",
  g: "bg-[var(--ink-mid)]",
};

export function Chip({
  variant,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant: ChipVariant; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-sm font-medium",
        styles[variant],
        className,
      )}
      {...props}
    >
      <span className={cn("h-2 w-2 rounded-full", dots[variant])} aria-hidden="true" />
      {children}
    </span>
  );
}
