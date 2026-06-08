import type { ESGInputs, ESGResults, Narratives } from "@/lib/esg/types";

function oneDecimal(value: number) {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(value);
}

export function createTemplateNarratives(inputs: ESGInputs, results: ESGResults): Narratives {
  const company = inputs.companyName || "대상 기업";

  return {
    environment: `${company}의 총 온실가스 배출량은 ${oneDecimal(results.total)} tCO₂eq이며, Scope 1은 ${oneDecimal(results.scope1)} tCO₂eq, Scope 2는 ${oneDecimal(results.scope2)} tCO₂eq로 산정되었다. 전력과 연료 사용량을 중심으로 배출 구조를 파악하고, 재생에너지 비율(${oneDecimal(results.renewPct)}%) 확대와 폐기물 감축을 우선 개선 과제로 검토한다.`,
    social: `${company}의 여성 임직원 비율은 ${oneDecimal(results.femPct)}%이며, 1인당 교육시간은 ${oneDecimal(inputs.trainingHours)}시간이다. 산업재해 발생 여부와 신규채용, 협력사 점검 현황을 함께 보아 구성원 안전과 성장 기회를 높이는 관리 체계가 필요하다.`,
    governance: `${company}의 사외이사 비율은 ${oneDecimal(results.outDirPct)}%이며, 윤리강령과 ESG 공시 여부를 통해 지배구조의 투명성을 확인할 수 있다. 이사회 개최 실적과 여성 이사 참여를 함께 살펴 의사결정의 독립성과 다양성을 개선한다.`,
  };
}
