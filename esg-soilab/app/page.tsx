import {
  ArrowRight,
  BarChart3,
  Calculator,
  ClipboardList,
  Database,
  Download,
  Factory,
  FileText,
  GraduationCap,
  HelpCircle,
  Landmark,
  Play,
  School,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Section } from "@/components/ui/Section";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { StepFlow } from "@/components/site/StepFlow";

const features = [
  {
    icon: Database,
    title: "데이터 입력",
    description: "전력, 연료, 인력, 이사회 등 학생이 이해할 수 있는 활동 데이터부터 시작합니다.",
  },
  {
    icon: Calculator,
    title: "계산 과정 공개",
    description: "활동량과 배출계수, 원단위 계산식을 함께 보여줘 블랙박스처럼 느껴지지 않습니다.",
  },
  {
    icon: ShieldCheck,
    title: "공식 계수 기반",
    description: "전력·연료 배출계수와 순발열량 근거를 학습 자료처럼 확인할 수 있습니다.",
  },
  {
    icon: FileText,
    title: "보고서까지 연결",
    description: "정량 지표와 정성 서술을 묶어 간단한 지속가능경영보고서 형태로 출력합니다.",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "입력",
    description: "가상 기업 시나리오나 직접 수집한 데이터를 E·S·G 영역별로 넣습니다.",
  },
  {
    icon: Calculator,
    title: "산정",
    description: "온실가스 배출량, 매출액 원단위, 비율 지표와 간이 점수를 자동 계산합니다.",
  },
  {
    icon: HelpCircle,
    title: "작성",
    description: "계산 결과를 해석하며 환경·사회·지배구조 서술 문안을 직접 다듬습니다.",
  },
  {
    icon: Download,
    title: "출력",
    description: "보고서 미리보기에서 PDF 인쇄와 JSON 저장으로 수업 결과물을 남깁니다.",
  },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden border-b border-[var(--border)]">
        <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1fr_0.92fr] md:items-center md:py-18">
          <div className="animate-rise">
            <Badge>MVP 교육용 데모</Badge>
            <h1 className="mt-5">온라인 ESG 분석·평가 교육 도구</h1>
            <p className="ko-readable mt-5 text-lg text-[var(--ink-mid)]">
              복잡한 ESG 지표를 강의 자료로만 설명하지 않고, 학생이 직접 기업 데이터를
              입력하고 계산하며 보고서까지 만들어보는 실습형 소프트웨어입니다.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/demo">
                직접 해보기
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                도입 문의
              </ButtonLink>
            </div>
          </div>

          <div className="animate-rise rounded-[var(--radius-lg)] border border-[var(--border-md)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)] [animation-delay:140ms]">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">충남정밀㈜ 실습 결과</p>
                <p className="text-xs text-[var(--ink-mid)]">2026 교육용 시나리오</p>
              </div>
              <span className="rounded-full bg-[var(--green-100)] px-3 py-1 text-xs font-semibold text-[var(--green-900)]">
                자동 산정
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["총배출량", "181.6", "tCO₂eq"],
                ["원단위", "1.51", "tCO₂eq/억"],
                ["재생E", "4.76", "%"],
              ].map(([label, value, unit]) => (
                <div
                  key={label}
                  className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--canvas)] p-4"
                >
                  <p className="text-xs font-semibold text-[var(--ink-mid)]">{label}</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-[var(--green-900)]">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--ink-mid)]">{unit}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["전력", "240,000 kWh × 0.4541 ÷ 1000"],
                ["도시가스", "18,000 N㎥ × 2.182 ÷ 1000"],
                ["보고서", "정량 지표 + 학생 서술 문안"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-[var(--ink)]">{label}</span>
                  <span className="font-mono text-xs text-[var(--ink-mid)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        tint="green"
        eyebrow="Problem"
        title="왜 ESG 교육이 어려운가"
        description="비전문가 학습자에게 ESG는 용어, 계산, 보고서 작성이 한꺼번에 등장하는 영역입니다. 그래서 설명보다 직접 해보는 구조가 중요합니다."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["전문용어의 벽", "Scope, 원단위, 공시 기준처럼 처음 듣는 단어가 많아 개념이 멀게 느껴집니다."],
            ["계산 장벽", "활동 데이터가 어떤 계수와 연결되는지 모르면 결과값을 믿기 어렵습니다."],
            ["실습 도구 부재", "보고서 예시는 많지만 학생이 직접 입력하고 수정해보는 교육 환경은 부족합니다."],
          ].map(([title, description]) => (
            <Card key={title} padding="lg">
              <h3 className="text-xl">{title}</h3>
              <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Features"
        title="입력부터 보고서까지 한 흐름으로"
        description="MVP는 입찰 문서의 핵심 과업 중 교육 효과가 큰 기능을 먼저 구현했습니다. 서버 없이 브라우저에서 계산하므로 수업 중 실험과 변형이 쉽습니다."
      >
        <FeatureGrid features={features} />
      </Section>

      <Section
        tint="green"
        eyebrow="ESG 101"
        title="E·S·G를 나눠 보고, 다시 연결합니다"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card padding="lg">
            <Chip variant="e">Environment</Chip>
            <h3 className="mt-5 text-xl">환경</h3>
            <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">
              전력, 연료, 용수, 폐기물 데이터를 통해 온실가스와 자원 사용을 계산합니다.
            </p>
          </Card>
          <Card padding="lg">
            <Chip variant="s">Social</Chip>
            <h3 className="mt-5 text-xl">사회</h3>
            <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">
              구성원 다양성, 안전, 교육, 협력사 점검처럼 기업이 사람을 대하는 방식을 봅니다.
            </p>
          </Card>
          <Card padding="lg">
            <Chip variant="g">Governance</Chip>
            <h3 className="mt-5 text-xl">지배구조</h3>
            <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">
              이사회 독립성, 윤리강령, ESG 공시 여부를 통해 의사결정 체계를 살펴봅니다.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="How it works"
        title="수업 한 차시 안에 끝나는 실습 흐름"
        description="가상 기업 데이터를 불러온 뒤 숫자를 바꿔보면, 계산 결과와 보고서 문장이 어떻게 달라지는지 즉시 확인할 수 있습니다."
      >
        <StepFlow steps={steps} />
      </Section>

      <Section tint="terra" eyebrow="For who" title="이런 수업과 조직에 맞습니다">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [School, "대학·계약학과", "ESG 기초 이론과 데이터 산정 실습을 한 화면에서 연결합니다."],
            [Landmark, "공공기관 교육", "지역 중소기업 지원 교육에서 공통 실습 자료로 활용할 수 있습니다."],
            [Factory, "중소기업 입문자", "자사 데이터를 어떻게 ESG 지표로 바꾸는지 감을 잡을 수 있습니다."],
          ].map(([Icon, title, description]) => {
            const TypedIcon = Icon as typeof GraduationCap;
            return (
              <Card key={title as string} padding="lg">
                <TypedIcon className="mb-4 text-[var(--green-800)]" size={28} aria-hidden="true" />
                <h3 className="text-xl">{title as string}</h3>
                <p className="ko-readable mt-3 text-sm text-[var(--ink-mid)]">
                  {description as string}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 rounded-[var(--radius-lg)] border border-[var(--border-md)] bg-[var(--green-800)] p-7 text-[var(--canvas)] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--green-100)]">MVP 체험</p>
            <h2 className="text-[var(--canvas)]">실습 시나리오를 바로 열어보세요</h2>
            <p className="ko-readable mt-4 text-[var(--green-100)]">
              충남 제조업 가상 데이터를 불러오고, 입력값을 바꿔보며 산정 결과와 보고서가
              어떻게 달라지는지 확인할 수 있습니다.
            </p>
          </div>
          <ButtonLink href="/demo" variant="outline" className="border-[var(--green-100)] text-[var(--canvas)] hover:bg-[var(--green-900)]">
            <Play size={17} aria-hidden="true" />
            데모 시작
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
