# ESG_SITE_BUILD_SPEC.md
> **esg.soilabcoop.kr** — 비전문가 친화형 ESG 분석·평가 교육 도구 데모/홍보 사이트
> VS Code + Codex 빌드 명세서 · 버전 0.1 · 2026.06
> 협동조합 소이랩 (Soilab Cooperative)

---

## 0. 사용법 (Codex 작업 규칙)

이 파일을 **프로젝트 루트**에 두고, `SOILAB_DESIGN.md`와 함께 Codex가 참조하게 한다.

- 작업은 **모듈(M0 → M8) 순서대로** 진행한다. 각 모듈의 "Codex 프롬프트"를 그대로 복사해 실행한다.
- 각 모듈 끝에는 **완료 기준(DoD)** 이 있다. 충족되면 다음 모듈로 넘어간다.
- 모든 색·폰트·여백은 **`SOILAB_DESIGN.md`를 단일 기준**으로 한다. 명세서와 충돌 시 `SOILAB_DESIGN.md`가 우선.
- 데모 도구의 계산 로직은 본 문서 §7과 기존 `ESG_교육실습시스템_MVP.html`(레퍼런스 구현)을 따른다.
- 금지: 순백(#fff) 단독 배경, 파랑·보라 계열, weight 800 이상, justify 정렬.

> Codex 첫 지시 예시:
> `"ESG_SITE_BUILD_SPEC.md의 M0부터 시작해. SOILAB_DESIGN.md 디자인 토큰을 반드시 적용하고, 한 모듈씩 완료 기준 충족 후 멈춰서 보고해."`

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 사이트명 | ESG 분석·평가 교육 실습 (소이랩) |
| 도메인 | `esg.soilabcoop.kr` (soilabcoop.kr 서브도메인) |
| 목적 | ① 소이랩이 개발한 비전문가용 ESG 교육 도구를 **홍보**, ② 방문자가 직접 **연습(데모 체험)** |
| 타깃 | 대학(계약학과·교양), 공공기관 교육담당, 중소기업 ESG 입문자, 사업 파트너 |
| 핵심 전환 | "직접 해보기(데모)" 체험 → "도입·협업 문의" 리드 확보 |
| 성격 | 정적 중심 + 클라이언트 인터랙티브 데모 (서버·DB 최소) |

### 차별점 (홍보 메시지 축)
1. **전문가가 아니어도** 활동 데이터만 넣으면 온실가스·핵심지표가 자동 산정
2. **계산 과정을 보여주는** 교육 설계 (블랙박스가 아님)
3. **공식 배출계수 기반** (온실가스종합정보센터·에너지법 시행규칙)
4. 입력 → 산정 → 보고서 → PDF까지 **한 흐름**

---

## 2. 기술 스택

기존 소이랩 사이트(soilabcoop.kr / soilab-youth.kr)와 동일 스택으로 맞춰 운영비 0원 추가.

```
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first @theme)
- 폰트: Noto Serif KR / Noto Sans KR / Space Mono (next/font 또는 Google Fonts)
- 배포: Vercel
- 도메인/DNS: Gabia (서브도메인 CNAME 연결)
- (선택) Notion API: 공지·도입사례 콘텐츠가 필요할 때만
- 데모 계산 로직: 클라이언트 전용 (서버 불필요)
```

> 데모는 100% 클라이언트 사이드 계산이므로 백엔드/DB 없이 동작한다. 사용자가 입력한 데이터는 서버로 전송되지 않는다(개인정보 안전 + 홍보 포인트로 활용).

---

## 3. 사이트맵 / 페이지 구조

```
/                     랜딩 (홍보 메인)
 ├─ Hero              한 줄 가치 제안 + "직접 해보기" CTA
 ├─ Problem           왜 ESG 교육이 어려운가
 ├─ Solution/Features 도구가 푸는 3~4가지
 ├─ ESG 101           E·S·G 한눈에 (교육 톤)
 ├─ How it works      4단계 흐름 (입력→산정→작성→출력)
 ├─ For who           대상별 활용 (대학/공공/기업)
 └─ CTA               도입·협업 문의

/demo                 인터랙티브 ESG 실습 도구 (MVP 포팅)
 ├─ 입력 → 산정 → 보고서 작성 → 리포트(PDF 인쇄)
 └─ 실습 시나리오 불러오기 / JSON 저장·불러오기

/about                소이랩 소개 + 개발 배경(충남 계약학과 과업 맥락)

/contact              도입 문의 (메일 링크 또는 폼)
```

### 폴더 구조 (App Router)
```
esg-soilab/
├─ app/
│  ├─ layout.tsx            # 폰트·메타·공통 레이아웃
│  ├─ globals.css           # SOILAB 디자인 토큰
│  ├─ page.tsx              # 랜딩
│  ├─ demo/page.tsx         # 데모 진입 (클라이언트 컴포넌트 렌더)
│  ├─ about/page.tsx
│  └─ contact/page.tsx
├─ components/
│  ├─ ui/                   # Button, Card, Chip, Section, Badge
│  ├─ site/                 # Header, Footer, Nav, Hero, FeatureGrid, StepFlow, CTASection
│  └─ demo/                 # ESGTool(루트), InputForm, ResultPanel, ReportView, factors.ts, calc.ts
├─ lib/
│  ├─ tokens.ts             # 디자인 토큰 TS 상수(선택)
│  └─ esg/                  # 계산 로직·배출계수·템플릿 문안
├─ public/                  # OG 이미지, 로고, favicon
├─ SOILAB_DESIGN.md         # 디자인 단일 기준
├─ ESG_SITE_BUILD_SPEC.md   # 본 문서
└─ ...config
```

---

## 4. 디자인 토큰 (SOILAB_DESIGN.md 발췌 — 반드시 적용)

> 전체·접근성 규칙은 `SOILAB_DESIGN.md` v1.1 참조. 아래는 빌드에 필요한 핵심만 옮긴 것.

### 컬러
```
/* Forest Green (대표색) */
--green-900:#1B4332  --green-800:#2D6A4F  --green-600:#40916C
--green-400:#52B788  --green-100:#D8F3DC  --green-50:#F0FAF3
/* Terracotta (보조 강조) */
--terra-800:#B85030  --terra-600:#C75B3A  --terra-400:#E07A5F
--terra-100:#FAECE7  --terra-50:#FDF5F2
/* Warm Canvas (배경·텍스트) */
--canvas:#F2F1ED  --surface:#EBEAE5  --surface-2:#E3E2DC
--ink:#26251E  --ink-mid:#5A5850  --ink-faint:#9A9890
--border:rgba(38,37,30,0.10)  --border-md:rgba(38,37,30,0.18)
```
**규칙**: 배경은 캔버스 계열. 헤딩 강조색은 green-800 **또는** terra-600 중 하나만. 파랑·보라 금지.

### 타이포
```
헤딩: 'Noto Serif KR'  /  본문·UI: 'Noto Sans KR'  /  숫자·날짜: 'Space Mono'
Display 52/700/-2px·1.05  H1 40/700/-1.5px·1.10  H2 32/700/-1.2px·1.15
H3 24/600/-0.6px·1.25  H4 18/600/-0.2px·1.35  Body 16/400/-0.15px·1.75
```

### 접근성(WCAG 2.1) — 중요
- `--terra-600`, `--green-600`은 캔버스 위 **본문 크기 텍스트에 사용 금지**. **24px 이상 헤딩에만** 사용.
- 본문 텍스트는 `--ink`(웜블랙)로. 메타는 `--ink-mid`.
- 한국어 조판: line-height 1.75, **좌측 정렬만**, 한 줄 35~45자, justify 금지.
- 포커스 링·터치 타깃(최소 44px) 규격은 `SOILAB_DESIGN.md` §7 준수.

---

## 5. 모듈별 빌드 (Codex 프롬프트)

### M0 — 프로젝트 셋업
**목적**: Next.js 15 + TS + Tailwind v4 프로젝트 초기화, 폰트·토큰 골격.

**Codex 프롬프트**
```
Next.js 15 App Router + TypeScript + Tailwind CSS v4 프로젝트를 esg-soilab 폴더에 셋업해.
- app/layout.tsx 에서 next/font 또는 Google Fonts로 Noto Serif KR, Noto Sans KR, Space Mono를 로드하고 CSS 변수(--font-serif, --font-sans, --font-mono)로 노출.
- app/globals.css 에 §4 컬러·타이포 토큰을 :root 변수와 Tailwind v4 @theme inline 매핑으로 작성.
- body 기본 배경 var(--canvas), 본문색 var(--ink), 본문 폰트 Noto Sans KR, line-height 1.75.
- 불필요한 보일러플레이트(기본 Next 데모) 제거.
ESG_SITE_BUILD_SPEC.md §4 와 SOILAB_DESIGN.md 를 그대로 따른다.
```
**DoD**: `npm run dev` 시 캔버스 배경에 한글 폰트가 적용된 빈 페이지가 뜬다. 콘솔 에러 없음.

---

### M1 — 디자인 시스템 / 공통 UI
**목적**: 재사용 UI 컴포넌트로 일관성 확보.

**산출**: `components/ui/Button.tsx`, `Card.tsx`, `Chip.tsx`(e/s/g 변형), `Section.tsx`, `Badge.tsx`

**Codex 프롬프트**
```
components/ui 에 다음 컴포넌트를 만들어. 모두 토큰 변수만 사용(하드코딩 색 금지).
- Button: variant = primary(green-800 배경/크림 글자) | outline | ghost, size = sm|md. hover 시 살짝 떠오르고 green-700 톤으로.
- Card: surface 배경 + border + radius 14px + 부드러운 그림자. padding 변형.
- Chip: variant e|s|g. e=green, s=terracotta 톤, g=ink 톤(파랑·보라 금지). dot + 라벨.
- Section: 최대폭 1080px 중앙정렬, 상하 여백 일관. id·배경틴트(green-50/terra-50/none) prop.
- Badge: 작은 라벨(예: "MVP", "교육용").
접근성: 포커스 링 표시, 버튼 최소 높이 44px. 한국어 좌측정렬.
```
**DoD**: 임시 페이지에서 각 컴포넌트가 토큰 색으로 정상 렌더, 키보드 포커스 링이 보인다.

---

### M2 — 레이아웃 (Header / Footer)
**목적**: 전 페이지 공통 GNB·푸터.

**Codex 프롬프트**
```
components/site/Header.tsx, Footer.tsx 를 만들고 app/layout.tsx 에 적용해.
- Header: 좌측 로고(녹색 라운드 정사각 안에 'E' 또는 소이랩 마크 + "ESG 교육 실습"), 우측 내비(홈/데모/소개/문의), 우측 끝 primary 버튼 "직접 해보기"(/demo). sticky, 캔버스 반투명 + blur, 하단 보더.
- 모바일: 햄버거 → 드로어.
- Footer: 소이랩 소개 한 줄, 도메인, 저작권, 면책(교육용 도구) 문구, 외부 링크(soilabcoop.kr).
SOILAB_DESIGN 톤 유지, 파랑·보라 금지.
```
**DoD**: 모든 페이지에서 헤더/푸터 표시, 모바일 내비 동작, 내부 링크 이동 정상.

---

### M3 — 랜딩 Hero + Problem
**목적**: 첫 화면에서 가치 전달 + 체험 유도.

**Codex 프롬프트**
```
app/page.tsx 상단에 Hero와 Problem 섹션을 만들어.
- Hero: 좌측 텍스트(H1 세리프 "복잡한 ESG, 학생도 직접 해보면 쉬워집니다", 부제, 버튼 2개 [직접 해보기=primary→/demo, 도입 문의=outline→/contact]), 우측 시각요소(데모 화면 목업 또는 핵심 지표 카드 3개 프리뷰: 총배출량/원단위/재생E비율 — Space Mono 숫자).
- 페이지 로드 시 staggered fade-in(animation-delay).
- Problem 섹션: "왜 ESG 교육이 어려운가" 3가지 통점을 카드로(전문용어·계산 장벽·실습 도구 부재).
green-50 틴트 적절히 사용, 본문은 ink.
```
**DoD**: 데스크톱·모바일에서 히어로가 깨지지 않고, CTA가 /demo·/contact로 연결.

---

### M4 — Features / ESG 101 / How it works / For who
**목적**: 홍보 본문 — 도구가 푸는 것과 사용 흐름.

**Codex 프롬프트**
```
app/page.tsx 에 이어서 4개 섹션을 추가해.
1) Features: §1 차별점 4가지를 FeatureGrid(아이콘+제목+설명 카드)로.
2) ESG 101: E/S/G 3열, 각 Chip(e/s/g) + 1~2문장 교육 설명.
3) How it works: StepFlow 컴포넌트로 4단계(입력→산정→작성→출력), 각 단계 번호는 Space Mono.
4) For who: 대학/공공기관/중소기업 3개 대상별 활용 카드.
섹션마다 배경 틴트를 번갈아(none/green-50/none/terra-50) 적용해 리듬을 준다.
```
**DoD**: 4개 섹션이 일관된 여백·타이포로 렌더, 모바일 1열 정상.

---

### M5 — 데모 도구 (MVP 포팅) ★핵심
**목적**: 기존 `ESG_교육실습시스템_MVP.html`을 React 컴포넌트로 이식.

**산출**: `components/demo/ESGTool.tsx`(클라이언트), `InputForm.tsx`, `ResultPanel.tsx`, `ReportView.tsx`, `lib/esg/factors.ts`, `lib/esg/calc.ts`, `lib/esg/templates.ts` / `app/demo/page.tsx`

**Codex 프롬프트**
```
app/demo/page.tsx 에서 렌더할 클라이언트 ESG 실습 도구를 만들어.
레퍼런스 구현은 ESG_교육실습시스템_MVP.html 이고, ESG_SITE_BUILD_SPEC.md §7 의 배출계수·산식을 그대로 사용한다.
구성:
- 탭 4개: ①데이터 입력 ②지표 산정 ③보고서 작성 ④리포트 출력. (+개요)
- 상태는 React useState로 관리(브라우저 storage 사용 금지). 저장은 JSON 파일 다운로드, 불러오기는 파일 업로드.
- lib/esg/factors.ts: 배출계수 기본값(출처 주석 포함, §7 표). 화면에서 수정 가능 → 즉시 재계산.
- lib/esg/calc.ts: 순수 함수. 입력 → {scope1, scope2, total, intensity, perCapita, renewPct, femPct, outDirPct, 간이점수}.
- ②산정 탭: 핵심지표 카드 + 연료별 계산표(활동자료×계수=배출량, 비중) + "계산 방법" 접이식 설명.
- ③작성 탭: E/S/G textarea + "표준 문안 불러오기"(lib/esg/templates.ts).
- ④리포트 탭: 입력·계산·서술을 조합한 지속가능경영보고서 미리보기 + window.print()로 PDF 저장. @media print 스타일로 도구 UI 숨김.
- 실습 시나리오(충남 가상 제조기업 "충남정밀(주)") 불러오기 버튼.
- 디자인은 SOILAB 토큰. 숫자는 Space Mono. 교육용 면책 안내(공식 계수 갱신 권고) 노출.
접근성: 모든 input에 label, 도움말 툴팁, 키보드 포커스.
```
**DoD**: /demo 에서 입력→산정 자동 계산, 시나리오 로딩, 보고서 PDF 인쇄, JSON 저장·불러오기가 모두 동작.

---

### M6 — About / Contact
**목적**: 신뢰(개발 배경) + 리드 확보.

**Codex 프롬프트**
```
app/about/page.tsx: 소이랩 소개(사회혁신 협동조합, 대구), 이 도구의 개발 배경(비전문가 ESG 교육 필요성, 충남형 계약학과 ESG 교육 과업 맥락을 일반화해 서술), 신뢰 요소(공식 배출계수 사용).
app/contact/page.tsx: 도입·협업 문의. 폼(이름/기관/이메일/문의유형/내용) UI + 제출 시 mailto: 링크 생성(서버 없이) 또는 안내 이메일 표시. 개인정보 최소 수집 안내.
두 페이지 모두 공통 레이아웃·토큰 사용.
```
**DoD**: About 본문 가독성 OK, Contact 폼이 mailto 또는 안내로 동작.

---

### M7 — 반응형 · 접근성 · SEO · OG
**Codex 프롬프트**
```
전체 점검:
- 모바일(360~430px), 태블릿, 데스크톱(1080+) 반응형 확인·수정.
- 색 대비 WCAG AA 검증: 본문에 green-600/terra-600 쓰지 않았는지 점검(헤딩 24px+ 한정).
- 시맨틱 태그(header/nav/main/section/footer), 이미지 alt, 폼 label, 포커스 가시성.
- app/layout.tsx 에 metadata(title/description/keywords) + Open Graph/Twitter 카드, public/og-image 연결.
- sitemap.ts, robots.ts 추가. lang="ko".
```
**DoD**: Lighthouse 접근성·SEO 90+ 목표, 모바일 레이아웃 깨짐 없음.

---

### M8 — 배포 (Vercel + Gabia 서브도메인)
**Codex/수동 절차**
```
1) GitHub 저장소 push → Vercel 새 프로젝트 import → 빌드 확인.
2) Vercel 프로젝트 Settings > Domains 에 esg.soilabcoop.kr 추가.
3) Vercel이 안내하는 DNS 레코드를 Gabia에 등록:
   - 보통 CNAME: 호스트 'esg' → 값 'cname.vercel-dns.com' (Vercel 화면의 정확한 값 사용)
   - 루트가 아닌 서브도메인이므로 CNAME 사용 가능.
4) 전파 후 Vercel에서 도메인 'Valid' 확인, HTTPS 자동 발급 확인.
```
**DoD**: `https://esg.soilabcoop.kr` 접속·HTTPS 정상, 데모 동작.

> Gabia DNS 화면과 Vercel 안내 값이 다를 수 있으니 **Vercel 대시보드에 표시되는 정확한 레코드**를 그대로 입력한다.

---

## 6. 홍보(콘텐츠) 운영 메모

- 랜딩의 단일 핵심 CTA는 **"직접 해보기"**(/demo). 문의는 보조 CTA.
- 데모는 "데이터가 서버로 전송되지 않는다"는 점을 안전 셀링포인트로 노출.
- 공유용 OG 이미지에 핵심 메시지 1줄 + 소이랩 마크.
- (확장) Notion API로 `공지/도입사례` 섹션을 붙일 경우, soilabcoop.kr와 동일 패턴 재사용.

---

## 7. 데모 계산 명세 (calc.ts 구현 기준)

> 레퍼런스: `ESG_교육실습시스템_MVP.html`. 값은 **교육용 예시 기본값**이며 화면에서 수정 가능.

### 7.1 배출계수 기본값 (factors.ts)

| 항목 | 계수 | 단위 | 출처/근거 |
|---|---|---|---|
| 전력 | `0.4541` | kgCO₂eq/kWh | 기후에너지환경부·온실가스종합정보센터 전력배출계수 0.4541 tCO₂eq/MWh (2025.3 공표, '20~'22 평균). 2023년 1년평균 0.4173 참고 |
| 도시가스 LNG | `2.182` | kgCO₂eq/N㎥ | 순발열량 38.9 MJ/N㎥(에너지법 시행규칙 별표, '22.11 개정) × IPCC 56,100 kgCO₂/TJ |
| 경유 | `2.616` | kgCO₂eq/L | 순발열량 35.3 MJ/L × IPCC 74,100 kgCO₂/TJ |
| 휘발유 | `2.107` | kgCO₂eq/L | 순발열량 30.4 MJ/L × IPCC 69,300 kgCO₂/TJ |
| LPG(프로판) | `2.922` | kgCO₂eq/kg | 순발열량 46.3 MJ/kg × IPCC 63,100 kgCO₂/TJ |

> 정부가 '25.12부터 전력배출계수 갱신 주기를 3년→1년으로 단축. 실제 산정 시 GIR(gir.go.kr) 최신 공표값으로 갱신할 것. CH₄·N₂O는 교육용 단순화로 CO₂ 기준 산정(정밀 산정 시 3대 가스 GWP 합산).

### 7.2 산식
```
배출량(tCO₂eq) = 활동량 × 계수(kgCO₂eq/단위) ÷ 1000
Scope 1 = 도시가스 + 경유 + 휘발유 + LPG
Scope 2 = 전력
총배출량 = Scope 1 + Scope 2
매출액 원단위(tCO₂eq/억) = 총배출량 ÷ (매출액[백만원] ÷ 100)
1인당 배출량(tCO₂eq/인) = 총배출량 ÷ 임직원 수
재생E 비율(%) = 재생에너지 ÷ (전력 + 재생에너지) × 100
여성 비율(%) = 여성 임직원 ÷ 임직원 수 × 100
사외이사 비율(%) = 사외이사 ÷ 이사회 인원 × 100
```

### 7.3 간이 점수(교육용, 실제 평가기관 방법론과 다름)
```
E = min(100, 재생E비율×2 + (폐기물<50 ? 40 : 20) + 30)
S = min(100, 여성비율 + (재해=0 ? 30 : 10) + min(30, 교육시간))
G = min(100, 사외이사비율×0.6 + (윤리강령 ? 25 : 0) + (공시 ? 25 : 0) + min(10, 이사회개최))
```

### 7.4 입력 필드
```
기본: 기업명, 업종, 설립연도, 매출액(백만원), 임직원 수
E: 전력(kWh), 도시가스(N㎥), 경유(L), 휘발유(L), LPG(kg), 용수(톤), 폐기물(톤), 재생에너지(kWh)
S: 여성 임직원, 신규채용, 산업재해(건), 1인당 교육시간, 사회공헌(백만원), 협력사 점검(개사)
G: 이사회 인원, 사외이사, 여성이사, 이사회 개최(회), 윤리강령(유/무), ESG 공시(공개/미공개)
```

### 7.5 실습 시나리오 기본값 (충남정밀㈜)
```
매출 12000(백만원), 임직원 48 / 전력 240000, LNG 18000, 경유 9000, 휘발유 3000, LPG 1200, 용수 3500, 폐기물 42, 재생E 12000
여성 17, 신규채용 6, 재해 1, 교육 24h, 사회공헌 30, 협력사 8 / 이사 7, 사외이사 3, 여성이사 2, 이사회 11회, 윤리강령 유, 공시 공개
```

---

## 8. 체크리스트 (출시 전)
- [ ] 모든 페이지 SOILAB 토큰만 사용(하드코딩 색 0건)
- [ ] 본문에 green-600/terra-600 미사용(헤딩 한정)
- [ ] 데모: 입력→산정→보고서→PDF, 시나리오·JSON 저장/불러오기 동작
- [ ] 모바일 반응형, 키보드 포커스, alt/label
- [ ] 메타·OG·sitemap·robots, lang="ko"
- [ ] esg.soilabcoop.kr HTTPS 정상, 면책(교육용·계수 갱신) 문구 노출

---

*문서 끝. 갱신 시 버전·날짜를 올리세요. 디자인 충돌 시 SOILAB_DESIGN.md 우선.*
