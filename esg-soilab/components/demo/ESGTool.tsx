"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InputForm } from "@/components/demo/InputForm";
import { ReportView } from "@/components/demo/ReportView";
import { ResultPanel } from "@/components/demo/ResultPanel";
import { calcESG } from "@/lib/esg/calc";
import { defaultFactors, factorOrder } from "@/lib/esg/factors";
import { formatNumber } from "@/lib/esg/format";
import { emptyInputs, emptyNarratives, scenarioInputs } from "@/lib/esg/scenario";
import { createTemplateNarratives } from "@/lib/esg/templates";
import type { EmissionFactors, ESGInputs, Narratives } from "@/lib/esg/types";
import { cn } from "@/lib/utils";

type TabId = "overview" | "input" | "result" | "write" | "report";

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

type SavePayload = {
  version: string;
  savedAt: string;
  data: ESGInputs;
  factors: EmissionFactors;
  narratives: Narratives;
};

const tabs: Tab[] = [
  { id: "overview", label: "개요", icon: BookOpen },
  { id: "input", label: "데이터 입력", icon: ClipboardList },
  { id: "result", label: "지표 산정", icon: BarChart3 },
  { id: "write", label: "보고서 작성", icon: PenLine },
  { id: "report", label: "리포트 출력", icon: FileText },
];

function fileName(companyName: string) {
  const name = companyName.trim() || "esg-practice";
  return `${name.replace(/[^\p{L}\p{N}-]+/gu, "-")}-data.json`;
}

export function ESGTool() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [data, setData] = useState<ESGInputs>(emptyInputs);
  const [factors, setFactors] = useState<EmissionFactors>(defaultFactors);
  const [narratives, setNarratives] = useState<Narratives>(emptyNarratives);
  const [status, setStatus] = useState("실습 시나리오를 불러오거나 직접 입력해보세요.");

  const results = useMemo(() => calcESG(data, factors), [data, factors]);

  function loadScenario() {
    const scenarioResults = calcESG(scenarioInputs, factors);
    setData(scenarioInputs);
    setNarratives(createTemplateNarratives(scenarioInputs, scenarioResults));
    setStatus("충남정밀㈜ 실습 시나리오를 불러왔습니다.");
    setActiveTab("input");
  }

  function loadTemplates() {
    setNarratives(createTemplateNarratives(data, results));
    setStatus("현재 입력값을 기준으로 표준 문안을 불러왔습니다.");
  }

  function saveJson() {
    const payload: SavePayload = {
      version: "0.1.0",
      savedAt: new Date().toISOString(),
      data,
      factors,
      narratives,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName(data.companyName);
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("현재 실습 데이터를 JSON 파일로 저장했습니다.");
  }

  async function loadJson(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<SavePayload>;
      const loadedData = { ...emptyInputs, ...(parsed.data || {}) } as ESGInputs;
      const nextFactors = { ...defaultFactors };

      if (parsed.factors) {
        for (const key of factorOrder) {
          const loadedFactor = parsed.factors[key];
          if (loadedFactor && typeof loadedFactor.value === "number") {
            nextFactors[key] = {
              ...defaultFactors[key],
              ...loadedFactor,
            };
          }
        }
      }

      setData(loadedData);
      setFactors(nextFactors);
      setNarratives({ ...emptyNarratives, ...(parsed.narratives || {}) });
      setStatus(`${file.name} 파일을 불러왔습니다.`);
      setActiveTab("input");
    } catch {
      setStatus("JSON 파일을 읽지 못했습니다. 저장 형식을 확인해 주세요.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Badge>클라이언트 계산</Badge>
          <h1 className="mt-4">ESG 분석·평가 실습실</h1>
          <p className="ko-readable mt-4 text-[var(--ink-mid)]">
            입력한 데이터는 서버로 전송되지 않습니다. 브라우저 안에서 계산하고, 필요한
            경우 JSON 파일이나 PDF 인쇄로 결과를 남깁니다.
          </p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-mid)]">
          <p className="font-semibold text-[var(--ink)]">현재 요약</p>
          <p className="mt-1">
            총배출량{" "}
            <span className="font-mono font-bold text-[var(--green-900)]">
              {formatNumber(results.total, 1)}
            </span>{" "}
            tCO₂eq
          </p>
          <p className="mt-1">{status}</p>
        </div>
      </div>

      <div className="no-print mb-6 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2">
        <div className="flex min-w-max gap-2" role="tablist" aria-label="ESG 실습 단계">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "focus-ring inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-4 text-sm font-semibold transition",
                  selected
                    ? "bg-[var(--green-800)] text-[var(--canvas)]"
                    : "text-[var(--ink-mid)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2>수업에서 다루는 흐름</h2>
            <p className="ko-readable mt-4 text-[var(--ink-mid)]">
              과업 문서의 핵심 요구사항인 ESG 공시 데이터 입력, 정량 지표 산정, 보고서
              작성 시뮬레이션을 MVP 범위로 구현했습니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="button" onClick={loadScenario}>
                <Sparkles size={17} aria-hidden="true" />
                충남정밀㈜ 불러오기
              </Button>
              <Button type="button" variant="outline" onClick={() => setActiveTab("input")}>
                직접 입력
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ["1", "활동 데이터 입력", "전력, 연료, 인력, 이사회 등 기초 데이터를 넣습니다."],
              ["2", "계산 과정 확인", "활동량 × 배출계수 ÷ 1000 표를 보며 결과를 해석합니다."],
              ["3", "보고서 문안 작성", "표준 문안을 불러온 뒤 학생이 기업 상황에 맞게 수정합니다."],
              ["4", "PDF 인쇄", "수업 결과물을 리포트 형식으로 출력하거나 저장합니다."],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                className="grid grid-cols-[3rem_1fr] gap-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--green-100)] font-mono font-bold text-[var(--green-900)]">
                  {num}
                </span>
                <div>
                  <h3 className="text-xl">{title}</h3>
                  <p className="ko-readable mt-2 text-sm text-[var(--ink-mid)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "input" && (
        <InputForm
          data={data}
          factors={factors}
          onDataChange={setData}
          onFactorsChange={setFactors}
          onLoadScenario={loadScenario}
          onSaveJson={saveJson}
          onLoadJson={loadJson}
        />
      )}

      {activeTab === "result" && <ResultPanel results={results} />}

      {activeTab === "write" && (
        <div className="grid gap-5">
          <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--green-50)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="ko-readable text-sm text-[var(--ink-mid)]">
              표준 문안은 시작점입니다. 학생이 계산 결과를 읽고 기업 상황에 맞게 근거와
              개선 과제를 덧붙이는 것이 학습의 핵심입니다.
            </p>
            <Button type="button" onClick={loadTemplates}>
              <ShieldCheck size={17} aria-hidden="true" />
              표준 문안 불러오기
            </Button>
          </div>
          {[
            ["environment", "환경(E) 서술", "온실가스, 에너지, 용수, 폐기물 관련 해석을 작성합니다."],
            ["social", "사회(S) 서술", "고용, 안전, 교육, 협력사 관리 관련 해석을 작성합니다."],
            ["governance", "지배구조(G) 서술", "이사회, 윤리강령, 공시 관련 해석을 작성합니다."],
          ].map(([key, label, help]) => (
            <label
              key={key}
              className="grid gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <span>
                <span className="block text-lg font-semibold text-[var(--ink)]">{label}</span>
                <span className="ko-readable mt-1 block text-sm text-[var(--ink-mid)]">{help}</span>
              </span>
              <textarea
                rows={6}
                value={narratives[key as keyof Narratives]}
                onChange={(event) =>
                  setNarratives((current) => ({
                    ...current,
                    [key]: event.target.value,
                  }))
                }
                className="focus-ring resize-y rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--canvas)] px-4 py-3 text-[var(--ink)]"
              />
            </label>
          ))}
        </div>
      )}

      {activeTab === "report" && (
        <ReportView data={data} results={results} narratives={narratives} />
      )}
    </div>
  );
}
