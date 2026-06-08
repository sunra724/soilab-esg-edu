import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "문의",
  description: "소이랩 ESG 교육 실습 도구 도입·협업 문의",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="교육 도입이나 공동 개발을 이야기해 주세요"
      description="수업 적용, 기관 교육, 지역 기업 실습 데이터 확장처럼 MVP를 함께 검증하고 발전시킬 수 있는 문의를 기다립니다."
    >
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <Card padding="lg" className="h-fit">
          <h3>문의 전에 참고하세요</h3>
          <p className="ko-readable mt-4 text-sm text-[var(--ink-mid)]">
            현재 버전은 교육용 MVP입니다. 공식 ESG 평가, 검증 보고서, 인증 대체 용도로
            사용하기보다 학생 실습과 교육 설계 검증에 맞춰져 있습니다.
          </p>
          <p className="ko-readable mt-4 text-sm text-[var(--ink-mid)]">
            문의 폼은 별도 서버에 저장하지 않고 사용자의 메일 앱으로 연결됩니다.
          </p>
        </Card>
        <Card padding="lg">
          <ContactForm />
        </Card>
      </div>
    </Section>
  );
}
