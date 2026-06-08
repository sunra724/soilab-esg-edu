# SOILAB_DESIGN.md

소이랩 ESG 교육 실습 MVP의 단일 디자인 기준입니다.

## 원칙

- 배경은 `--canvas`, `--surface`, `--surface-2` 계열을 사용한다.
- 파랑·보라 계열, 순백 단독 배경, `font-weight: 800` 이상, 양쪽 정렬을 사용하지 않는다.
- 헤딩 강조는 `--green-800` 또는 `--terra-600` 중 하나를 맥락별로 제한해서 사용한다.
- 본문 텍스트는 `--ink`, 보조 텍스트는 `--ink-mid`를 사용한다.
- 한국어 문단은 좌측 정렬, line-height 1.75 이상, 과도하게 긴 행을 피한다.
- 포커스 링과 44px 이상의 터치 타깃을 유지한다.

## 컬러 토큰

```css
--green-900:#1B4332;
--green-800:#2D6A4F;
--green-600:#40916C;
--green-400:#52B788;
--green-100:#D8F3DC;
--green-50:#F0FAF3;
--terra-800:#B85030;
--terra-600:#C75B3A;
--terra-400:#E07A5F;
--terra-100:#FAECE7;
--terra-50:#FDF5F2;
--canvas:#F2F1ED;
--surface:#EBEAE5;
--surface-2:#E3E2DC;
--ink:#26251E;
--ink-mid:#5A5850;
--ink-faint:#9A9890;
--border:rgba(38,37,30,0.10);
--border-md:rgba(38,37,30,0.18);
```

## 타이포그래피

- 헤딩: Noto Serif KR
- 본문·UI: Noto Sans KR
- 숫자·날짜: Space Mono
- 앱 구현에서는 접근성 안정성을 위해 letter spacing을 0으로 둔다.
