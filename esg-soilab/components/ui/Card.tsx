import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: "sm" | "md" | "lg";
  children: ReactNode;
};

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({ padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]",
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
