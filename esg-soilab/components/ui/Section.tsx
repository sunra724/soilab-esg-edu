import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tint = "none" | "green" | "terra";

const tintMap: Record<Tint, string> = {
  none: "",
  green: "bg-[var(--green-50)]",
  terra: "bg-[var(--terra-50)]",
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  tint?: Tint;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Section({
  tint = "none",
  eyebrow,
  title,
  description,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", tintMap[tint], className)} {...props}>
      <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-6">
        {(eyebrow || title || description) && (
          <div className="mb-8 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold text-[var(--green-800)]">{eyebrow}</p>
            )}
            {title && <h2>{title}</h2>}
            {description && (
              <p className="ko-readable mt-4 text-[var(--ink-mid)]">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
