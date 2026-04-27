// All figures verified against DATA_VERIFICATION.md
// Source: Hitch Partners CISO Compensation Survey 2024–2025 (NA), n=943

export const headline = {
  population: 943,
  anyProtection: 56.4,
  doOnly: 34.1,
  indemnOnly: 6.0,
  both: 16.2,
  neither: 38.7,
  notSure: 4.5,
  unprotectedOrUncertain: 43.2,
  fullQuad: 3.4,
  tier6: 37.5,
  severance: 17.5,
  accelVest: 16.4,
  signingBonus: 35.9,
};

export const tiers = [
  { tier: 1, label: 'Fully Protected',          definition: 'D&O + Indemnification + Severance + Accel. Vesting', n: 32,  pct: 3.4  },
  { tier: 2, label: 'Strong Legal + Partial Exit', definition: 'D&O + Indemnification + one exit term',           n: 29,  pct: 3.1  },
  { tier: 3, label: 'Legal Protected, No Exit', definition: 'D&O + Indemnification only',                         n: 92,  pct: 9.8  },
  { tier: 4, label: 'Partial Legal Only',        definition: 'D&O or Indemnification, not both',                  n: 379, pct: 40.2 },
  { tier: 5, label: 'Exit Terms Only',           definition: 'Severance or vesting, no legal protection',         n: 57,  pct: 6.0  },
  { tier: 6, label: 'No Protection',             definition: 'None of the four dimensions',                       n: 354, pct: 37.5 },
];

export const tierColors = {
  1: '#0A1628',
  2: '#1A3A52',
  3: '#2A4A6A',
  4: '#8A9BAE',
  5: '#B8B5AE',
  6: '#00897B',
};

export const tierAggregations = {
  meaningful: { label: 'Meaningful (Tiers 1+2+3)', pct: 16.2, description: 'Has both D&O and indemnification' },
  partial:    { label: 'Partial (Tiers 4+5)',       pct: 46.2, description: 'Has one but not both legal protections' },
  zero:       { label: 'Unprotected (Tier 6)',       pct: 37.5, description: 'Nothing of any kind' },
};

export const fourCohorts = [
  {
    label: 'Public / Repeat CISO',
    n: 238, tier1: 7.6, tier6: 18.9, doRate: 70.2, neither: 20.6,
    baseMedian: 360000, bonusMedian: 130250, equityMedian: 250000, totalMedian: 740250,
    severance: 24.4, accelVest: 25.2, boardQtrly: 67.8,
  },
  {
    label: 'Public / First-Time CISO',
    n: 97, tier1: 3.1, tier6: 33.0, doRate: 49.5, neither: 36.1,
    baseMedian: 300000, bonusMedian: 100000, equityMedian: 150000, totalMedian: 550000,
    severance: 17.5, accelVest: 14.4, boardQtrly: 46.1,
  },
  {
    label: 'Private / Repeat CISO',
    n: 386, tier1: 2.6, tier6: 37.8, doRate: 48.7, neither: 40.4,
    baseMedian: 300000, bonusMedian: 72360, equityMedian: 250000, totalMedian: 622360,
    severance: 18.1, accelVest: 16.6, boardQtrly: 43.8,
  },
  {
    label: 'Private / First-Time CISO',
    n: 144, tier1: 0.7, tier6: 52.8, doRate: 36.8, neither: 52.1,
    baseMedian: 277550, bonusMedian: 72250, equityMedian: 122500, totalMedian: 472300,
    severance: 8.3, accelVest: 9.7, boardQtrly: 38.8,
  },
];

export const boardAccess = [
  { label: 'Has D&O',     n: 475, quarterly: 62.9, semiAnnual: 14.9, regular: 77.9, perRequest: 6.3,  annual: 10.1, noAccess: 5.7  },
  { label: 'Has Neither', n: 365, quarterly: 32.9, semiAnnual: 15.1, regular: 47.9, perRequest: 16.2, annual: 12.6, noAccess: 23.3 },
  { label: 'Not Sure',    n: 42,  quarterly: 31.0, semiAnnual: 16.7, regular: 47.6, perRequest: 16.7, annual: 9.5,  noAccess: 26.2 },
];

export const reportingLine = [
  { title: 'CEO',                   n: 125, doRate: 63.2, neither: 29.6, tier1: 11.2, boardQtrly: 58.4, noAccess: 5.6,  elevated: true  },
  { title: 'Chief Risk Officer',    n: 24,  doRate: 62.5, neither: 29.2, tier1: 12.5, boardQtrly: 62.5, noAccess: 0.0,  elevated: true  },
  { title: 'COO / President',       n: 81,  doRate: 54.3, neither: 33.3, tier1: 4.9,  boardQtrly: 53.1, noAccess: 7.4,  elevated: true  },
  { title: 'General Counsel / CLO', n: 36,  doRate: 55.6, neither: 36.1, tier1: 11.1, boardQtrly: 58.3, noAccess: 13.9, elevated: true  },
  { title: 'Chief Financial Officer',n: 63, doRate: 52.4, neither: 33.3, tier1: 11.1, boardQtrly: 47.6, noAccess: 4.8,  elevated: true  },
  { title: 'Chief Technology Officer',n: 210,doRate: 53.8, neither: 34.3, tier1: 1.9,  boardQtrly: 53.3, noAccess: 10.0, elevated: false },
  { title: 'Chief Information Officer',n: 272,doRate: 48.9, neither: 40.4, tier1: 1.8, boardQtrly: 44.5, noAccess: 12.5, elevated: false },
  { title: 'VP Engineering',        n: 34,  doRate: 14.7, neither: 67.6, tier1: 0.0,  boardQtrly: 14.7, noAccess: 64.5, elevated: false },
];

export const elevatedVsSubordinated = {
  elevated:    { label: 'Elevated (CEO/COO/CFO/CRO/GC)',  n: 329, doRate: 58.1, neither: 31.9, boardQtrly: 55.3, noAccess: 6.4  },
  subordinated:{ label: 'Subordinated (CIO/CTO/VP Eng)',  n: 614, doRate: 46.3, neither: 42.3, boardQtrly: 44.5, noAccess: 17.6 },
};

export const compByProtection = {
  hasDO:   { n: 475, baseMedian: 342142, bonusMedian: 120000, equityMedian: 250000, totalMedian: 712142 },
  neither: { n: 365, baseMedian: 262218, bonusMedian: 58500,  equityMedian: 150000, totalMedian: 470718 },
  gap:     { baseGap: 79924, bonusGap: 61500, equityGap: 100000, totalGap: 241424 },
};

export const sizeData = [
  { label: 'Small',      description: '<1,000 employees', n: 290, doRate: 39.3, neither: 50.7, tier1: 2.4, tier6: 44.8, boardQtrly: 35.2, noAccess: 20.3, baseMedian: 275000 },
  { label: 'Mid-Market', description: '1,000–4,999',      n: 353, doRate: 52.7, neither: 36.3, tier1: 3.7, tier6: 31.7, boardQtrly: 53.0, noAccess: 9.6,  baseMedian: 300000 },
  { label: 'Large',      description: '5,000–9,999',      n: 196, doRate: 56.6, neither: 33.7, tier1: 3.6, tier6: 26.5, boardQtrly: 55.6, noAccess: 13.3, baseMedian: 337000 },
  { label: 'Enterprise', description: '10,000+',           n: 104, doRate: 61.5, neither: 23.1, tier1: 4.8, tier6: 19.2, boardQtrly: 54.8, noAccess: 9.6,  baseMedian: 350000 },
];

export const structureData = {
  public:  { n: 337, doRate: 50.3, neither: 24.5, tier1: 7.6, tier6: 18.9 },
  private: { n: 532, doRate: 45.1, neither: 43.2, tier1: 1.9, tier6: 40.6 },
};

export const yoyTrend = [
  { year: 2024, n: 436, doRate: 48.2, neither: 46.8, notSure: 0.0, anyProtection: 52.8, tier1: 3.0, tier6: 40.6, firstTime: 25.7 },
  { year: 2025, n: 432, doRate: 54.4, neither: 29.2, notSure: 7.9, anyProtection: 62.5, tier1: 3.2, tier6: 32.4, firstTime: 29.9 },
];

export const titleGap = {
  formalCISO: {
    n: 619, pct: 65.6,
    doRate: 59.5, neither: 30.5, tier1: 3.9, tier6: 28.6,
    boardQtrly: 54.9, noAccess: 8.4,
    baseMedian: 312500, bonusMedian: 100000, equityMedian: 232500, totalMedian: 645000,
  },
  nonCISO: {
    n: 324, pct: 34.4,
    doRate: 33.0, neither: 54.3, tier1: 2.5, tier6: 54.6,
    boardQtrly: 35.5, noAccess: 23.8,
    baseMedian: 280000, bonusMedian: 65500, equityMedian: 200000, totalMedian: 545500,
  },
  byTitleGroup: [
    { group: 'VP / Vice President',          n: 60, doRate: 33.3, neither: 51.7, tier6: 55.0, boardQtrly: 26.7, baseMedian: 289000 },
    { group: 'Director (Sr./Managing)',      n: 65, doRate: 18.5, neither: 66.2, tier6: 69.2, boardQtrly: 36.9, baseMedian: 228000 },
    { group: 'Other / Uncategorized',        n: 33, doRate: 15.2, neither: 69.7, tier6: 78.8, boardQtrly: 30.3, baseMedian: 270000 },
    { group: 'Head of Security',             n: 49, doRate:  8.2, neither: 79.6, tier6: 69.4, boardQtrly: 14.3, baseMedian: 300000 },
  ],
  formalCISOBenchmarkDO: 59.5,
};

export const industryData = {
  'Banking / Financial Services': { n: 82,  doRate: 64.6, neither: 25.6, tier1: 0.0, totalMedian: 478000, privatePct: 53.7, lacRisk: 'LOW',        baseMedian: 292000, bonusMedian: 86000,  equityMedian: 100000 },
  'FinTech':                       { n: 76,  doRate: 60.5, neither: 28.9, tier1: 1.3, totalMedian: 695000, privatePct: 60.5, lacRisk: 'MEDIUM',      baseMedian: 332500, bonusMedian: 112500, equityMedian: 250000 },
  'Financial Services':            { n: 104, doRate: 55.8, neither: 33.7, tier1: 1.9, totalMedian: 578750, privatePct: 62.5, lacRisk: 'MEDIUM',      baseMedian: 306250, bonusMedian: 122500, equityMedian: 150000 },
  'Enterprise Software':           { n: 167, doRate: 54.5, neither: 37.7, tier1: 5.4, totalMedian: 736285, privatePct: 66.5, lacRisk: 'HIGH',        baseMedian: 341285, bonusMedian: 95000,  equityMedian: 300000 },
  'Cloud Infrastructure':          { n: 60,  doRate: 41.7, neither: 41.7, tier1: 5.0, totalMedian: 825000, privatePct: 51.7, lacRisk: 'HIGH',        baseMedian: 350000, bonusMedian: 100000, equityMedian: 375000 },
  'Cloud Security':                { n: 58,  doRate: 46.6, neither: 39.7, tier1: 3.4, totalMedian: 822500, privatePct: 67.2, lacRisk: 'HIGH',        baseMedian: 330000, bonusMedian: 105000, equityMedian: 387500 },
  'Consumer Software':             { n: 29,  doRate: 41.4, neither: 41.4, tier1: 3.4, totalMedian: 950000, privatePct: 65.5, lacRisk: 'HIGH',        baseMedian: 350000, bonusMedian: 100000, equityMedian: 500000 },
  'Healthcare':                    { n: 102, doRate: 51.0, neither: 40.2, tier1: 2.0, totalMedian: 582500, privatePct: 73.5, lacRisk: 'MEDIUM',      baseMedian: 300000, bonusMedian: 72500,  equityMedian: 210000 },
  'HealthTech':                    { n: 79,  doRate: 45.6, neither: 48.1, tier1: 0.0, totalMedian: 538000, privatePct: 81.0, lacRisk: 'HIGH',        baseMedian: 278500, bonusMedian: 59500,  equityMedian: 200000 },
  'Insurance':                     { n: 49,  doRate: 63.3, neither: 22.4, tier1: 4.1, totalMedian: 650000, privatePct: 63.3, lacRisk: 'MEDIUM',      baseMedian: 300000, bonusMedian: 100000, equityMedian: 250000 },
  'Manufacturing':                 { n: 51,  doRate: 52.9, neither: 37.3, tier1: 0.0, totalMedian: 520000, privatePct: 35.3, lacRisk: 'MEDIUM',      baseMedian: 300000, bonusMedian: 120000, equityMedian: 100000 },
  'Government':                    { n: 35,  doRate: 20.0, neither: 74.3, tier1: 0.0, totalMedian: 474000, privatePct: 0,    lacRisk: 'STRUCTURAL',  baseMedian: 220000, bonusMedian: 54000,  equityMedian: 200000,
    note: 'Government entities do not typically carry D&O insurance. This reflects structural differences in personal liability frameworks, not governance failure.' },
  'Education':                     { n: 24,  doRate: 16.7, neither: 58.3, tier1: 0.0, totalMedian: 318700, privatePct: 0,    lacRisk: 'LOW',         baseMedian: 227500, bonusMedian: 46000,  equityMedian: 45200  },
};

export const cohortData = {
  'Public / Repeat':   { n: 238, baseMedian: 360000, bonusMedian: 130250, equityMedian: 250000, totalMedian: 740250, tier1Rate: 7.6, tier6Rate: 18.9, doRate: 70.2 },
  'Public / First-Time':{ n: 97, baseMedian: 300000, bonusMedian: 100000, equityMedian: 150000, totalMedian: 550000, tier1Rate: 3.1, tier6Rate: 33.0, doRate: 49.5 },
  'Private / Repeat':  { n: 386, baseMedian: 300000, bonusMedian: 72360,  equityMedian: 250000, totalMedian: 622360, tier1Rate: 2.6, tier6Rate: 37.8, doRate: 48.7 },
  'Private / First-Time':{ n: 144,baseMedian: 277550, bonusMedian: 72250,  equityMedian: 122500, totalMedian: 472300, tier1Rate: 0.7, tier6Rate: 52.8, doRate: 36.8 },
};
