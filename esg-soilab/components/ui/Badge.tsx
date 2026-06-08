import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 text-xs font-semibold text-[var(--ink-mid)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
