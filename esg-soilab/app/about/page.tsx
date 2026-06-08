import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "소개",
  description: "협동조합 소이랩의 ESG 분석·평가 교육 실습 MVP 개발 배경",
};

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About"
        title="비전문가가 ESG를 직접 다뤄보게 하는 교육 도구"
        description="소이랩은 지역 교육과 사회혁신 프로젝트를 연결해온 협동조합입니다. 이 MVP는 대학생과 ESG 입문자가 기업 데이터를 직접 입력하고 계산하며 지속가능경영보고서의 구조를 익히도록 만든 실습형 소프트웨어입니다."
      >
        <div className="grid gap-5 md:grid-cols-[1fr_0.8fr]">
          <div className="space-y-5">
            <Card padding="lg">
              <h3>개발 배경</h3>
              <p className="ko-readable mt-4 text-[var(--ink-mid)]">
                충남형 계약학과 과업 문서의 핵심 문제의식은 단순합니다. ESG는 지역 산업계에
                점점 중요해지지만, 학생과 비전공자에게는 데이터 구조와 산정 과정이 너무
                멀게 느껴집니다. 그래서 이 MVP는 강의식 설명보다 입력, 계산, 해석, 보고서
                작성을 반복해보는 학습 경험에 초점을 맞췄습니다.
              </p>
            </Card>
            <Card padding="lg">
              <h3>현재 MVP의 범위</h3>
              <p className="ko-readable mt-4 text-[var(--ink-mid)]">
                입찰 제출용 전체 시스템이 아니라 수업에서 검증할 수 있는 최소 제품입니다.
                연도별 DB, 사용자 계정, HWPX 자동 생성, 강의 PPT 제작은 후속 단계로 두고,
                브라우저 안에서 입력과 산정, 보고서 미리보기, PDF 인쇄가 가능한 흐름을 먼저
                구현했습니다.
              </p>
            </Card>
          </div>
          <Card padding="lg" className="h-fit">
            <h3>신뢰 기준</h3>
            <ul className="mt-5 grid gap-4">
              {[
                "전력·연료 배출계수의 출처를 화면에서 함께 표시",
                "계산식을 학생이 확인할 수 있게 표로 공개",
                "사용자 입력 데이터는 서버로 전송하지 않는 클라이언트 계산",
                "교육용 간이 점수와 공식 평가 방법론을 명확히 구분",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-[var(--ink-mid)]">
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-[var(--green-800)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
