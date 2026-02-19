import {
  salaryData,
  locationMultipliers,
  industryMultipliers,
  companySizeMultipliers,
  type RoleSalaryData,
} from "@/data/salaries";

export interface SalaryInput {
  jobTitle: string;
  yearsExperience: number;
  city: string;
  industry: string;
  currentSalary: number;
  companySize: string;
}

export interface SalaryAnalysis {
  input: SalaryInput;
  marketLow: number;
  marketMedian: number;
  marketHigh: number;
  percentile: number;
  delta: number;
  deltaPercent: number;
  isUnderpaid: boolean;
  isOverpaid: boolean;
  lifetimeImpact: number;
  status: "underpaid" | "market-aligned" | "above-market";
  levelUsed: string;
}

function getExperienceLevel(years: number): "entry" | "mid" | "senior" {
  if (years <= 2) return "entry";
  if (years <= 6) return "mid";
  return "senior";
}

function getLevelLabel(level: "entry" | "mid" | "senior"): string {
  if (level === "entry") return "Entry Level (0-2 years)";
  if (level === "mid") return "Mid Level (3-6 years)";
  return "Senior Level (7+ years)";
}

function calculatePercentile(
  salary: number,
  p25: number,
  median: number,
  p75: number
): number {
  if (salary <= p25) {
    // Map [0, p25] to [5, 25]
    const ratio = Math.max(0, salary / p25);
    return Math.round(5 + ratio * 20);
  }
  if (salary <= median) {
    // Map [p25, median] to [25, 50]
    const ratio = (salary - p25) / (median - p25);
    return Math.round(25 + ratio * 25);
  }
  if (salary <= p75) {
    // Map [median, p75] to [50, 75]
    const ratio = (salary - median) / (p75 - median);
    return Math.round(50 + ratio * 25);
  }
  // Map [p75, p75*1.5] to [75, 95]
  const ceiling = p75 * 1.5;
  const ratio = Math.min(1, (salary - p75) / (ceiling - p75));
  return Math.round(75 + ratio * 20);
}

export function analyzeSalary(input: SalaryInput): SalaryAnalysis {
  const roleData = salaryData.find(
    (d) => d.role.toLowerCase() === input.jobTitle.toLowerCase()
  );

  // Fallback: use Software Engineer data if role not found
  const data: RoleSalaryData = roleData || salaryData[0];
  const level = getExperienceLevel(input.yearsExperience);
  const band = data[level];

  const locMult = locationMultipliers[input.city] ?? 1.0;
  const indMult = industryMultipliers[input.industry] ?? 1.0;
  const sizeMult = companySizeMultipliers[input.companySize] ?? 1.0;
  const combined = locMult * indMult * sizeMult;

  const marketLow = Math.round(band.p25 * combined);
  const marketMedian = Math.round(band.median * combined);
  const marketHigh = Math.round(band.p75 * combined);

  const percentile = calculatePercentile(
    input.currentSalary,
    marketLow,
    marketMedian,
    marketHigh
  );

  const delta = input.currentSalary - marketMedian;
  const deltaPercent = (delta / marketMedian) * 100;

  let status: SalaryAnalysis["status"];
  if (input.currentSalary < marketLow) {
    status = "underpaid";
  } else if (input.currentSalary > marketHigh) {
    status = "above-market";
  } else {
    status = "market-aligned";
  }

  // Override: if below median, still flag as underpaid
  if (input.currentSalary < marketMedian) {
    status = "underpaid";
  }

  const lifetimeImpact = status === "underpaid" ? Math.abs(delta) * 10 : 0;

  return {
    input,
    marketLow,
    marketMedian,
    marketHigh,
    percentile,
    delta,
    deltaPercent,
    isUnderpaid: status === "underpaid",
    isOverpaid: status === "above-market",
    lifetimeImpact,
    status,
    levelUsed: getLevelLabel(level),
  };
}
