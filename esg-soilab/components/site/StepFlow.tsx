import type { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li
            key={step.title}
            className="relative rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-bold text-[var(--green-800)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon size={22} className="text-[var(--terra-600)]" aria-hidden="true" />
            </div>
            <h3 className="text-xl">{step.title}</h3>
            <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
