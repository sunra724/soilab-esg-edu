import type { Metadata } from "next";
import { ESGTool } from "@/components/demo/ESGTool";

export const metadata: Metadata = {
  title: "데모",
  description: "ESG 데이터 입력, 핵심 지표 산정, 보고서 작성, PDF 출력 실습 도구",
};

export default function DemoPage() {
  return <ESGTool />;
}
