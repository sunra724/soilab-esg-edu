import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Card key={feature.title} padding="md" className="h-full">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] bg-[var(--green-100)] text-[var(--green-900)]">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3 className="text-xl">{feature.title}</h3>
            <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">
              {feature.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
