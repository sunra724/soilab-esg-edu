import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-5 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-semibold text-[var(--ink)]">협동조합 소이랩</p>
          <p className="ko-readable mt-2 text-sm text-[var(--ink-mid)]">
            사회혁신과 지역 교육을 연결하는 협동조합입니다. 이 MVP는 ESG 개념을
            학생이 직접 입력하고 계산해보는 교육용 실습 도구입니다.
          </p>
        </div>
        <div className="text-sm text-[var(--ink-mid)] md:text-right">
          <Link
            href="https://soilabcoop.kr"
            className="focus-ring inline-flex rounded-[var(--radius-sm)] font-medium text-[var(--ink)] hover:text-[var(--green-800)]"
          >
            soilabcoop.kr
          </Link>
          <p className="mt-2">© 2026 Soilab Cooperative</p>
          <p className="mt-2">교육용 산정 결과이며 공식 평가·검증 결과가 아닙니다.</p>
        </div>
      </div>
    </footer>
  );
}
