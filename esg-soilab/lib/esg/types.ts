export type FactorKey = "electricity" | "lng" | "diesel" | "gasoline" | "lpg";

export type FactorDef = {
  label: string;
  value: number;
  unit: string;
  source: string;
};

export type EmissionFactors = Record<FactorKey, FactorDef>;

export type ESGDisclosure = "공개" | "미공개";

export type ESGInputs = {
  companyName: string;
  industry: string;
  reportYear: number;
  foundedYear: number;
  revenueMil: number;
  employees: number;
  electricityKwh: number;
  lngM3: number;
  dieselL: number;
  gasolineL: number;
  lpgKg: number;
  waterTon: number;
  wasteTon: number;
  renewableKwh: number;
  femaleEmployees: number;
  newHires: number;
  injuries: number;
  trainingHours: number;
  socialContributionMil: number;
  supplierAudits: number;
  boardMembers: number;
  outsideDirectors: number;
  femaleDirectors: number;
  boardMeetings: number;
  ethicsCode: boolean;
  esgDisclosure: ESGDisclosure;
};

export type Narratives = {
  environment: string;
  social: string;
  governance: string;
};

export type EmissionRow = {
  key: FactorKey;
  label: string;
  activity: number;
  activityUnit: string;
  factor: number;
  factorUnit: string;
  emission: number;
  share: number;
};

export type ScoreSet = {
  e: number;
  s: number;
  g: number;
  total: number;
  grade: string;
};

export type ESGResults = {
  scope1: number;
  scope2: number;
  total: number;
  intensity: number;
  perCapita: number;
  renewPct: number;
  femPct: number;
  outDirPct: number;
  rows: EmissionRow[];
  scores: ScoreSet;
};
