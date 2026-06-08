import { BarChart3, Gauge, Leaf, Users } from "lucide-react";
import { formatNumber, formatPct } from "@/lib/esg/format";
import type { ESGResults } from "@/lib/esg/types";

const metricClass =
  "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5";

export function ResultPanel({ results }: { results: ESGResults }) {
  const metrics = [
    {
      label: "총배출량",
      value: formatNumber(results.total, 1),
      unit: "tCO₂eq",
      icon: Leaf,
    },
    {
      label: "매출액 원단위",
      value: formatNumber(results.intensity, 2),
      unit: "tCO₂eq/억",
      icon: Gauge,
    },
    {
      label: "1인당 배출량",
      value: formatNumber(results.perCapita, 2),
      unit: "tCO₂eq/인",
      icon: Users,
    },
    {
      label: "간이 ESG 점수",
      value: formatNumber(results.scores.total, 1),
      unit: `Grade ${results.scores.grade}`,
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className={metricClass}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--ink-mid)]">{metric.label}</p>
                <Icon size={20} className="text-[var(--green-800)]" aria-hidden="true" />
              </div>
              <p className="font-mono text-3xl font-bold text-[var(--green-900)]">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-[var(--ink-mid)]">{metric.unit}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["E", results.scores.e, "재생E·폐기물 기반"],
          ["S", results.scores.s, "여성비율·안전·교육 기반"],
          ["G", results.scores.g, "이사회·윤리·공시 기반"],
        ].map(([label, value, desc]) => (
          <div
            key={label as string}
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--canvas)] p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-mono text-sm font-bold text-[var(--terra-600)]">{label}</p>
              <p className="font-mono text-sm font-bold text-[var(--ink)]">
                {formatNumber(value as number, 1)}
              </p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-2)]">
              <div
                className="h-full rounded-full bg-[var(--green-800)]"
                style={{ width: `${Math.min(100, value as number)}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-[var(--ink-mid)]">{desc as string}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl">연료별 계산표</h3>
            <p className="ko-readable mt-2 text-sm text-[var(--ink-mid)]">
              배출량은 활동량 × 배출계수 ÷ 1000으로 계산합니다.
            </p>
          </div>
          <div className="text-sm text-[var(--ink-mid)]">
            Scope 1 {formatNumber(results.scope1, 1)} / Scope 2{" "}
            {formatNumber(results.scope2, 1)} tCO₂eq
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-[var(--border-md)] text-[var(--ink-mid)]">
                <th className="py-3 pr-4 font-semibold">항목</th>
                <th className="py-3 pr-4 font-semibold">활동량</th>
                <th className="py-3 pr-4 font-semibold">배출계수</th>
                <th className="py-3 pr-4 font-semibold">배출량</th>
                <th className="py-3 font-semibold">비중</th>
              </tr>
            </thead>
            <tbody>
              {results.rows.map((row) => (
                <tr key={row.key} className="border-b border-[var(--border)]">
                  <td className="py-3 pr-4 font-semibold text-[var(--ink)]">{row.label}</td>
                  <td className="py-3 pr-4 font-mono">
                    {formatNumber(row.activity, 2)} {row.activityUnit}
                  </td>
                  <td className="py-3 pr-4 font-mono">
                    {formatNumber(row.factor, 4)} {row.factorUnit}
                  </td>
                  <td className="py-3 pr-4 font-mono">
                    {formatNumber(row.emission, 2)} tCO₂eq
                  </td>
                  <td className="py-3 font-mono">{formatPct(row.share)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <details className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--green-50)] p-5">
        <summary className="cursor-pointer font-semibold text-[var(--ink)]">계산 방법 보기</summary>
        <div className="ko-readable mt-4 space-y-2 text-sm text-[var(--ink-mid)]">
          <p>Scope 1 = 도시가스 + 경유 + 휘발유 + LPG</p>
          <p>Scope 2 = 전력 사용량에 전력 배출계수를 곱해 산정합니다.</p>
          <p>매출액 원단위 = 총배출량 ÷ (매출액[백만원] ÷ 100)</p>
          <p>교육용 간이 점수는 실제 평가기관 방법론이 아니라 수업 토론을 위한 단순화 모델입니다.</p>
        </div>
      </details>
    </div>
  );
}
