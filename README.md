# Soilab ESG Edu

협동조합 소이랩의 온라인 ESG 분석·평가 교육 실습 MVP입니다.

비전문가 대학생과 교육 담당자가 기업 활동 데이터를 입력하고, 온실가스 및 ESG 핵심 지표를 산정한 뒤, 간단한 지속가능경영보고서 형태로 출력해보는 연습용 사이트입니다.

## App

Next.js 앱은 `esg-soilab` 폴더에 있습니다.

```bash
cd esg-soilab
npm install
npm run dev
```

로컬 실행: `http://localhost:3000`

## Vercel

Vercel에서 이 GitHub 저장소를 import할 때:

- Framework Preset: Next.js
- Root Directory: `esg-soilab`
- Build Command: `npm run build`
- Install Command: `npm install`

도메인은 Vercel 프로젝트 Settings > Domains에서 `esg.soilabcoop.kr`를 추가한 뒤, Vercel이 안내하는 CNAME 값을 가비아 DNS에 등록합니다.

일반적으로 서브도메인 CNAME은 다음 형태입니다.

```text
Host: esg
Type: CNAME
Value: cname.vercel-dns.com
```

실제 값은 Vercel 화면에 표시되는 레코드를 우선합니다.

## Scope

현재 MVP 범위:

- ESG 공시 데이터 입력 실습
- 전력·연료 배출계수 기반 온실가스 산정
- 매출액 원단위, 1인당 배출량, 재생에너지 비율 등 핵심 지표 계산
- E/S/G 정성 문안 작성 템플릿
- 교육용 보고서 미리보기 및 PDF 인쇄
- JSON 저장·불러오기

본 도구의 산정 결과는 교육용이며 공식 ESG 평가, 검증, 인증 결과가 아닙니다.
