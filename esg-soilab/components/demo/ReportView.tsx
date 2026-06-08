"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatNumber, formatPct } from "@/lib/esg/format";
import type { ESGInputs, ESGResults, Narratives } from "@/lib/esg/types";

export function ReportView({
  data,
  results,
  narratives,
}: {
  data: ESGInputs;
  results: ESGResults;
  narratives: Narratives;
}) {
  return (
    <div className="grid gap-4">
      <div className="no-print flex justify-end">
        <Button type="button" onClick={() => window.print()}>
          <Printer size={17} aria-hidden="true" />
          PDF 인쇄
        </Button>
      </div>

      <article className="print-sheet rounded-[var(--radius-md)] border border-[var(--border-md)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
        <div className="border-b border-[var(--border-md)] pb-6">
          <p className="text-sm font-semibold text-[var(--green-800)]">교육용 지속가능경영보고서</p>
          <h2 className="mt-3">
            {data.companyName || "대상 기업"} {data.reportYear} ESG 실습 리포트
          </h2>
          <p className="ko-readable mt-4 text-[var(--ink-mid)]">
            본 리포트는 입력된 실습 데이터를 바탕으로 산정한 교육용 결과입니다. 공식 공시,
            제3자 검증, 인증 자료로 사용할 수 없습니다.
          </p>
        </div>

        <section className="py-6">
          <h3 className="text-xl">기업 개요</h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              ["업종", data.industry || "-"],
              ["설립연도", `${data.foundedYear}년`],
              ["매출액", `${formatNumber(data.revenueMil, 0)} 백만원`],
              ["임직원 수", `${formatNumber(data.employees, 0)} 명`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[var(--radius-sm)] bg-[var(--canvas)] p-4">
                <dt className="text-xs font-semibold text-[var(--ink-mid)]">{label}</dt>
                <dd className="mt-1 font-mono text-[var(--ink)]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-[var(--border)] py-6">
          <h3 className="text-xl">핵심 지표</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["총배출량", `${formatNumber(results.total, 1)} tCO₂eq`],
              ["매출액 원단위", `${formatNumber(results.intensity, 2)} tCO₂eq/억`],
              ["재생E 비율", formatPct(results.renewPct)],
              ["여성 비율", formatPct(results.femPct)],
              ["사외이사 비율", formatPct(results.outDirPct)],
              ["간이 등급", `${results.scores.grade} (${formatNumber(results.scores.total, 1)}점)`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[var(--radius-sm)] bg-[var(--canvas)] p-4">
                <p className="text-xs font-semibold text-[var(--ink-mid)]">{label}</p>
                <p className="mt-1 font-mono text-lg font-bold text-[var(--green-900)]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-6">
          <h3 className="text-xl">환경(E)</h3>
          <p className="ko-readable mt-4 text-[var(--ink-mid)]">
            {narratives.environment || "환경 영역 문안을 작성해 주세요."}
          </p>
        </section>

        <section className="border-t border-[var(--border)] py-6">
          <h3 className="text-xl">사회(S)</h3>
          <p className="ko-readable mt-4 text-[var(--ink-mid)]">
            {narratives.social || "사회 영역 문안을 작성해 주세요."}
          </p>
        </section>

        <section className="border-t border-[var(--border)] pt-6">
          <h3 className="text-xl">지배구조(G)</h3>
          <p className="ko-readable mt-4 text-[var(--ink-mid)]">
            {narratives.governance || "지배구조 영역 문안을 작성해 주세요."}
          </p>
        </section>
      </article>
    </div>
  );
}
