import type { EmissionFactors, FactorKey } from "@/lib/esg/types";

export const factorOrder: FactorKey[] = ["electricity", "lng", "diesel", "gasoline", "lpg"];

export const defaultFactors: EmissionFactors = {
  electricity: {
    label: "전력",
    value: 0.4541,
    unit: "kgCO₂eq/kWh",
    source:
      "기후에너지환경부·온실가스종합정보센터 전력배출계수 0.4541 tCO₂eq/MWh, 2025.3 공표",
  },
  lng: {
    label: "도시가스 LNG",
    value: 2.182,
    unit: "kgCO₂eq/N㎥",
    source: "순발열량 38.9 MJ/N㎥ × IPCC 56,100 kgCO₂/TJ",
  },
  diesel: {
    label: "경유",
    value: 2.616,
    unit: "kgCO₂eq/L",
    source: "순발열량 35.3 MJ/L × IPCC 74,100 kgCO₂/TJ",
  },
  gasoline: {
    label: "휘발유",
    value: 2.107,
    unit: "kgCO₂eq/L",
    source: "순발열량 30.4 MJ/L × IPCC 69,300 kgCO₂/TJ",
  },
  lpg: {
    label: "LPG(프로판)",
    value: 2.922,
    unit: "kgCO₂eq/kg",
    source: "순발열량 46.3 MJ/kg × IPCC 63,100 kgCO₂/TJ",
  },
};
