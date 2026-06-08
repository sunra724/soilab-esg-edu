"use client";

import { HelpCircle, Save, Sparkles, Upload } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { factorOrder } from "@/lib/esg/factors";
import type { EmissionFactors, ESGInputs, FactorKey } from "@/lib/esg/types";

type Props = {
  data: ESGInputs;
  factors: EmissionFactors;
  onDataChange: (data: ESGInputs) => void;
  onFactorsChange: (factors: EmissionFactors) => void;
  onLoadScenario: () => void;
  onSaveJson: () => void;
  onLoadJson: (file: File) => void;
};

function toNumber(value: string) {
  if (value.trim() === "") return 0;
  return Number(value);
}

function FieldHelp({ text }: { text: string }) {
  return (
    <span className="inline-flex" aria-label={text} title={text}>
      <HelpCircle size={15} className="text-[var(--ink-faint)]" aria-hidden="true" />
    </span>
  );
}

function TextField({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
        {label}
        {help && <FieldHelp text={help} />}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring min-h-12 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--canvas)] px-4 text-[var(--ink)]"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  unit,
  help,
  step = "any",
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  help?: string;
  step?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
        {label}
        {help && <FieldHelp text={help} />}
      </span>
      <span className="flex overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--canvas)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--green-800)]">
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(event) => onChange(toNumber(event.target.value))}
          className="min-h-12 min-w-0 flex-1 bg-transparent px-4 font-mono text-[var(--ink)] outline-none"
        />
        {unit && (
          <span className="grid min-w-16 place-items-center border-l border-[var(--border)] px-3 text-xs font-semibold text-[var(--ink-mid)]">
            {unit}
          </span>
        )}
      </span>
    </label>
  );
}

function InputGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="mb-5 text-xl">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}

export function InputForm({
  data,
  factors,
  onDataChange,
  onFactorsChange,
  onLoadScenario,
  onSaveJson,
  onLoadJson,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof ESGInputs>(field: K, value: ESGInputs[K]) {
    onDataChange({ ...data, [field]: value });
  }

  function updateFactor(key: FactorKey, value: number) {
    onFactorsChange({
      ...factors,
      [key]: {
        ...factors[key],
        value,
      },
    });
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--terra-50)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="ko-readable text-sm text-[var(--ink-mid)]">
          실습 데이터로 시작하거나, 직접 수집한 값을 입력해 산정 결과를 비교해보세요.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={onLoadScenario}>
            <Sparkles size={16} aria-hidden="true" />
            시나리오
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onSaveJson}>
            <Save size={16} aria-hidden="true" />
            JSON 저장
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload size={16} aria-hidden="true" />
            JSON 불러오기
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            aria-label="JSON 파일 불러오기"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onLoadJson(file);
              event.currentTarget.value = "";
            }}
          />
        </div>
      </div>

      <InputGroup title="기본 정보">
        <TextField
          label="기업명"
          value={data.companyName}
          onChange={(value) => update("companyName", value)}
          help="보고서 제목과 문안에 표시되는 기업명입니다."
        />
        <TextField
          label="업종"
          value={data.industry}
          onChange={(value) => update("industry", value)}
          help="제조업, 서비스업 등 기업의 주요 업종입니다."
        />
        <NumberField
          label="보고연도"
          value={data.reportYear}
          onChange={(value) => update("reportYear", value)}
          step="1"
        />
        <NumberField
          label="설립연도"
          value={data.foundedYear}
          onChange={(value) => update("foundedYear", value)}
          step="1"
        />
        <NumberField
          label="매출액"
          value={data.revenueMil}
          onChange={(value) => update("revenueMil", value)}
          unit="백만원"
          help="매출액 원단위 산정에 사용합니다."
        />
        <NumberField
          label="임직원 수"
          value={data.employees}
          onChange={(value) => update("employees", value)}
          unit="명"
          help="1인당 배출량과 여성 비율 산정에 사용합니다."
        />
      </InputGroup>

      <InputGroup title="환경(E) 활동 데이터">
        <NumberField label="전력" value={data.electricityKwh} onChange={(value) => update("electricityKwh", value)} unit="kWh" />
        <NumberField label="도시가스 LNG" value={data.lngM3} onChange={(value) => update("lngM3", value)} unit="N㎥" />
        <NumberField label="경유" value={data.dieselL} onChange={(value) => update("dieselL", value)} unit="L" />
        <NumberField label="휘발유" value={data.gasolineL} onChange={(value) => update("gasolineL", value)} unit="L" />
        <NumberField label="LPG" value={data.lpgKg} onChange={(value) => update("lpgKg", value)} unit="kg" />
        <NumberField label="용수" value={data.waterTon} onChange={(value) => update("waterTon", value)} unit="톤" />
        <NumberField label="폐기물" value={data.wasteTon} onChange={(value) => update("wasteTon", value)} unit="톤" />
        <NumberField
          label="재생에너지"
          value={data.renewableKwh}
          onChange={(value) => update("renewableKwh", value)}
          unit="kWh"
          help="재생E 비율 = 재생에너지 ÷ (전력 + 재생에너지) × 100"
        />
      </InputGroup>

      <InputGroup title="사회(S) 데이터">
        <NumberField label="여성 임직원" value={data.femaleEmployees} onChange={(value) => update("femaleEmployees", value)} unit="명" />
        <NumberField label="신규채용" value={data.newHires} onChange={(value) => update("newHires", value)} unit="명" />
        <NumberField label="산업재해" value={data.injuries} onChange={(value) => update("injuries", value)} unit="건" />
        <NumberField label="1인당 교육시간" value={data.trainingHours} onChange={(value) => update("trainingHours", value)} unit="h" />
        <NumberField label="사회공헌" value={data.socialContributionMil} onChange={(value) => update("socialContributionMil", value)} unit="백만원" />
        <NumberField label="협력사 점검" value={data.supplierAudits} onChange={(value) => update("supplierAudits", value)} unit="개사" />
      </InputGroup>

      <InputGroup title="지배구조(G) 데이터">
        <NumberField label="이사회 인원" value={data.boardMembers} onChange={(value) => update("boardMembers", value)} unit="명" />
        <NumberField label="사외이사" value={data.outsideDirectors} onChange={(value) => update("outsideDirectors", value)} unit="명" />
        <NumberField label="여성이사" value={data.femaleDirectors} onChange={(value) => update("femaleDirectors", value)} unit="명" />
        <NumberField label="이사회 개최" value={data.boardMeetings} onChange={(value) => update("boardMeetings", value)} unit="회" />
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">윤리강령</span>
          <span className="flex min-h-12 items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--canvas)] px-4">
            <input
              type="checkbox"
              checked={data.ethicsCode}
              onChange={(event) => update("ethicsCode", event.target.checked)}
              className="h-5 w-5 accent-[var(--green-800)]"
            />
            <span className="text-sm text-[var(--ink-mid)]">문서화되어 있음</span>
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">ESG 공시</span>
          <select
            value={data.esgDisclosure}
            onChange={(event) => update("esgDisclosure", event.target.value as ESGInputs["esgDisclosure"])}
            className="focus-ring min-h-12 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--canvas)] px-4 text-[var(--ink)]"
          >
            <option>공개</option>
            <option>미공개</option>
          </select>
        </label>
      </InputGroup>

      <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="mb-5">
          <h3 className="text-xl">배출계수</h3>
          <p className="ko-readable mt-2 text-sm text-[var(--ink-mid)]">
            교육용 기본값입니다. 수업에서 최신 공표값을 비교할 때 숫자를 바꾸면 즉시
            재계산됩니다.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {factorOrder.map((key) => (
            <label
              key={key}
              className="grid gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--canvas)] p-4"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                {factors[key].label}
                <FieldHelp text={factors[key].source} />
              </span>
              <span className="flex overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--surface)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--green-800)]">
                <input
                  type="number"
                  min={0}
                  step="0.0001"
                  value={factors[key].value}
                  onChange={(event) => updateFactor(key, toNumber(event.target.value))}
                  className="min-h-12 min-w-0 flex-1 bg-transparent px-4 font-mono text-[var(--ink)] outline-none"
                />
                <span className="grid min-w-32 place-items-center border-l border-[var(--border)] px-3 text-xs font-semibold text-[var(--ink-mid)]">
                  {factors[key].unit}
                </span>
              </span>
              <span className="text-xs text-[var(--ink-mid)]">{factors[key].source}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
