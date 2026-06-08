import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Space_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esg.soilabcoop.kr"),
  title: {
    default: "ESG 분석·평가 교육 실습 | 소이랩",
    template: "%s | ESG 교육 실습",
  },
  description:
    "비전문가 대학생도 기업 활동 데이터를 입력하며 온실가스와 ESG 핵심 지표를 이해하는 온라인 교육용 MVP입니다.",
  keywords: ["ESG 교육", "온실가스 산정", "지속가능경영보고서", "소이랩", "계약학과"],
  openGraph: {
    title: "ESG 분석·평가 교육 실습",
    description: "입력, 산정, 보고서 작성까지 한 흐름으로 배우는 소이랩 ESG 교육 도구",
    url: "https://esg.soilabcoop.kr",
    siteName: "소이랩 ESG 교육 실습",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ESG 교육 실습 도구 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ESG 분석·평가 교육 실습",
    description: "학생이 직접 입력하고 계산해보는 ESG 교육용 MVP",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} ${notoSerif.variable} ${spaceMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
