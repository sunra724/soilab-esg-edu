import type { EmissionFactors, EmissionRow, ESGInputs, ESGResults, ScoreSet } from "@/lib/esg/types";

function emission(activity: number, factor: number) {
  return (activity * factor) / 1000;
}

function safeDiv(numerator: number, denominator: number) {
  return denominator > 0 ? numerator / denominator : 0;
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
}

function gradeFrom(score: number) {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

function score(inputs: ESGInputs, renewPct: number, femPct: number, outDirPct: number): ScoreSet {
  const e = clampScore(renewPct * 2 + (inputs.wasteTon < 50 ? 40 : 20) + 30);
  const s = clampScore(femPct + (inputs.injuries === 0 ? 30 : 10) + Math.min(30, inputs.trainingHours));
  const g = clampScore(
    outDirPct * 0.6 +
      (inputs.ethicsCode ? 25 : 0) +
      (inputs.esgDisclosure === "공개" ? 25 : 0) +
      Math.min(10, inputs.boardMeetings),
  );
  const total = (e + s + g) / 3;

  return {
    e,
    s,
    g,
    total,
    grade: gradeFrom(total),
  };
}

export function calcESG(inputs: ESGInputs, factors: EmissionFactors): ESGResults {
  const rows: EmissionRow[] = [
    {
      key: "electricity",
      label: factors.electricity.label,
      activity: inputs.electricityKwh,
      activityUnit: "kWh",
      factor: factors.electricity.value,
      factorUnit: factors.electricity.unit,
      emission: emission(inputs.electricityKwh, factors.electricity.value),
      share: 0,
    },
    {
      key: "lng",
      label: factors.lng.label,
      activity: inputs.lngM3,
      activityUnit: "N㎥",
      factor: factors.lng.value,
      factorUnit: factors.lng.unit,
      emission: emission(inputs.lngM3, factors.lng.value),
      share: 0,
    },
    {
      key: "diesel",
      label: factors.diesel.label,
      activity: inputs.dieselL,
      activityUnit: "L",
      factor: factors.diesel.value,
      factorUnit: factors.diesel.unit,
      emission: emission(inputs.dieselL, factors.diesel.value),
      share: 0,
    },
    {
      key: "gasoline",
      label: factors.gasoline.label,
      activity: inputs.gasolineL,
      activityUnit: "L",
      factor: factors.gasoline.value,
      factorUnit: factors.gasoline.unit,
      emission: emission(inputs.gasolineL, factors.gasoline.value),
      share: 0,
    },
    {
      key: "lpg",
      label: factors.lpg.label,
      activity: inputs.lpgKg,
      activityUnit: "kg",
      factor: factors.lpg.value,
      factorUnit: factors.lpg.unit,
      emission: emission(inputs.lpgKg, factors.lpg.value),
      share: 0,
    },
  ];

  const scope2 = rows[0].emission;
  const scope1 = rows.slice(1).reduce((sum, row) => sum + row.emission, 0);
  const total = scope1 + scope2;
  const rowsWithShare = rows.map((row) => ({
    ...row,
    share: total > 0 ? (row.emission / total) * 100 : 0,
  }));

  const renewPct = safeDiv(inputs.renewableKwh, inputs.electricityKwh + inputs.renewableKwh) * 100;
  const femPct = safeDiv(inputs.femaleEmployees, inputs.employees) * 100;
  const outDirPct = safeDiv(inputs.outsideDirectors, inputs.boardMembers) * 100;

  return {
    scope1,
    scope2,
    total,
    intensity: safeDiv(total, inputs.revenueMil / 100),
    perCapita: safeDiv(total, inputs.employees),
    renewPct,
    femPct,
    outDirPct,
    rows: rowsWithShare,
    scores: score(inputs, renewPct, femPct, outDirPct),
  };
}
