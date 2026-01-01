// ROI Calculator logic and data

export interface Market {
  id: string;
  name: string;
  flag: string;
  revenuePotential: number; // percentage
  conversionLift: number; // percentage
}

export const markets: Market[] = [
  { id: 'germany', name: 'Germany', flag: '🇩🇪', revenuePotential: 15, conversionLift: 35 },
  { id: 'france', name: 'France', flag: '🇫🇷', revenuePotential: 12, conversionLift: 32 },
  { id: 'spain', name: 'Spain', flag: '🇪🇸', revenuePotential: 8, conversionLift: 28 },
  { id: 'italy', name: 'Italy', flag: '🇮🇹', revenuePotential: 7, conversionLift: 25 },
  { id: 'netherlands', name: 'Netherlands', flag: '🇳🇱', revenuePotential: 5, conversionLift: 30 },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', revenuePotential: 10, conversionLift: 45 },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷', revenuePotential: 8, conversionLift: 38 },
  { id: 'mexico', name: 'Mexico', flag: '🇲🇽', revenuePotential: 6, conversionLift: 35 },
  { id: 'china', name: 'China', flag: '🇨🇳', revenuePotential: 12, conversionLift: 50 },
  { id: 'south-korea', name: 'South Korea', flag: '🇰🇷', revenuePotential: 8, conversionLift: 42 },
  { id: 'poland', name: 'Poland', flag: '🇵🇱', revenuePotential: 4, conversionLift: 30 },
  { id: 'sweden', name: 'Sweden', flag: '🇸🇪', revenuePotential: 3, conversionLift: 28 },
];

export type Scenario = 'conservative' | 'moderate' | 'optimistic';

export const scenarioMultipliers: Record<Scenario, { label: string; multiplier: number; description: string }> = {
  conservative: {
    label: 'Conservative',
    multiplier: 0.13,
    description: 'Niche products, limited markets',
  },
  moderate: {
    label: 'Moderate',
    multiplier: 0.30,
    description: 'Standard e-commerce (recommended)',
  },
  optimistic: {
    label: 'Optimistic',
    multiplier: 0.50,
    description: 'High-demand products, major markets',
  },
};

export const LOCALEFLOW_MONTHLY_COST = 150;
export const LOCALEFLOW_ANNUAL_COST = LOCALEFLOW_MONTHLY_COST * 12;

export interface ROIInputs {
  monthlyRevenue: number;
  selectedMarkets: string[];
  currentIntlTrafficPct: number;
  scenario: Scenario;
}

export interface ROIResults {
  potentialIntlRevenue: number;
  conversionLift: number;
  additionalMonthlyRevenue: number;
  additionalAnnualRevenue: number;
  paybackMonths: number;
  roiPercentage: number;
  selectedMarketsData: Market[];
}

export function calculateROI(inputs: ROIInputs): ROIResults {
  const { monthlyRevenue, selectedMarkets, currentIntlTrafficPct, scenario } = inputs;

  // Get selected market data
  const selectedMarketsData = markets.filter((m) => selectedMarkets.includes(m.id));

  // Calculate total potential from selected markets
  const totalMarketPotential = selectedMarketsData.reduce((sum, m) => sum + m.revenuePotential, 0);

  // Calculate weighted average conversion lift
  const weightedConversionLift =
    selectedMarketsData.reduce((sum, m) => sum + m.conversionLift * m.revenuePotential, 0) /
    (totalMarketPotential || 1);

  // Apply scenario multiplier
  const scenarioMultiplier = scenarioMultipliers[scenario].multiplier;

  // Core calculations
  const potentialIntlRevenue = monthlyRevenue * (totalMarketPotential / 100);
  const conversionLift = potentialIntlRevenue * (weightedConversionLift / 100) * scenarioMultiplier;

  // Adjust for existing international traffic
  const untappedPotential = 1 - currentIntlTrafficPct / 100;
  const additionalMonthlyRevenue = conversionLift * untappedPotential;
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

  // ROI metrics
  const paybackMonths = additionalMonthlyRevenue > 0 ? LOCALEFLOW_MONTHLY_COST / additionalMonthlyRevenue : Infinity;

  const roiPercentage = additionalAnnualRevenue > 0 ? ((additionalAnnualRevenue - LOCALEFLOW_ANNUAL_COST) / LOCALEFLOW_ANNUAL_COST) * 100 : 0;

  return {
    potentialIntlRevenue,
    conversionLift,
    additionalMonthlyRevenue,
    additionalAnnualRevenue,
    paybackMonths,
    roiPercentage,
    selectedMarketsData,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatPaybackPeriod(months: number): string {
  if (months === Infinity || months < 0) return 'N/A';
  if (months < 1) return 'Less than 1 month';
  if (months < 2) return '1 month';
  if (months <= 12) return `${Math.round(months)} months`;
  return `${Math.round(months / 12)} year${months >= 24 ? 's' : ''}`;
}
