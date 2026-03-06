import type { SalaryAnalysis } from "./calculator";
import { formatCurrency } from "./utils";
import {
  salaryTrends,
  locationTrends,
  industryMultipliers,
  salaryData,
} from "@/data/salaries";

export interface PremiumPack {
  industryBenchmarks: IndustryBenchmark[];
  benefitsValuation: BenefitsValuation;
  actionPlan: ActionPlanItem[];
  salaryTrend: TrendInfo;
  locationTrend: TrendInfo;
  topPayingCombos: TopCombo[];
}

export interface IndustryBenchmark {
  industry: string;
  adjustedMedian: number;
  delta: number;
  multiplier: number;
}

export interface BenefitsValuation {
  estimatedEquity: { low: number; high: number };
  estimatedBonus: { low: number; high: number };
  estimatedTotalComp: { low: number; high: number };
  healthBenefitsValue: number;
  retirementMatchValue: number;
}

export interface ActionPlanItem {
  week: string;
  title: string;
  description: string;
  milestone: string;
}

export interface TrendInfo {
  label: string;
  yoy: number;
  direction: "up" | "down" | "flat";
  insight: string;
}

export interface TopCombo {
  role: string;
  city: string;
  industry: string;
  estimatedMedian: number;
}

export function generatePremiumPack(analysis: SalaryAnalysis): PremiumPack {
  const { input } = analysis;

  // Industry benchmarks — show what this role pays across all industries
  const roleData = salaryData.find(
    (d) => d.role.toLowerCase() === input.jobTitle.toLowerCase()
  ) || salaryData[0];

  const level =
    input.yearsExperience <= 2 ? "entry" : input.yearsExperience <= 6 ? "mid" : "senior";
  const band = roleData[level];

  const industryBenchmarks: IndustryBenchmark[] = Object.entries(industryMultipliers)
    .map(([industry, mult]) => {
      const adjustedMedian = Math.round(band.median * mult);
      return {
        industry,
        adjustedMedian,
        delta: adjustedMedian - band.median,
        multiplier: mult,
      };
    })
    .sort((a, b) => b.adjustedMedian - a.adjustedMedian);

  // Benefits valuation estimate
  const median = analysis.marketMedian;
  const benefitsValuation: BenefitsValuation = {
    estimatedEquity: {
      low: Math.round(median * 0.05),
      high: Math.round(median * 0.25),
    },
    estimatedBonus: {
      low: Math.round(median * 0.05),
      high: Math.round(median * 0.2),
    },
    estimatedTotalComp: {
      low: Math.round(median * 1.1),
      high: Math.round(median * 1.45),
    },
    healthBenefitsValue: Math.round(7500 + Math.random() * 5000),
    retirementMatchValue: Math.round(median * 0.04),
  };

  // 90-day action plan
  const gap = Math.abs(analysis.delta);
  const targetSalary = formatCurrency(input.currentSalary + Math.round(gap * 0.85));

  const actionPlan: ActionPlanItem[] = [
    {
      week: "Week 1-2",
      title: "Research & Documentation",
      description: `Compile 3+ salary data sources confirming ${input.jobTitle} market rates in ${input.city}. Document your top 5 achievements with measurable impact.`,
      milestone: "Salary research doc + achievement tracker ready",
    },
    {
      week: "Week 3-4",
      title: "Internal Positioning",
      description: "Schedule informal check-ins with your manager. Drop references to your market research naturally. Ask about team goals and how you can contribute more.",
      milestone: "Manager is aware you're thinking about growth",
    },
    {
      week: "Week 5-6",
      title: "Build Your Case",
      description: `Create a one-page brief: your market data, your contributions, your ask (${targetSalary}). Practice your pitch 3 times. Identify your BATNA (Best Alternative to Negotiated Agreement).`,
      milestone: "Negotiation brief finalized + pitch rehearsed",
    },
    {
      week: "Week 7-8",
      title: "The Conversation",
      description: "Request a formal compensation discussion. Lead with data, not emotion. Present your brief. If deferred, get a specific follow-up date in writing.",
      milestone: "Formal salary discussion completed",
    },
    {
      week: "Week 9-10",
      title: "Follow Through",
      description: "If approved: get the new salary in writing before celebrating. If deferred: document milestones agreed upon. If denied: begin evaluating external options.",
      milestone: "Outcome documented + next steps clear",
    },
    {
      week: "Week 11-12",
      title: "Optimize & Protect",
      description: "Set a calendar reminder for 6-month market rate check. Update your LinkedIn and resume with recent achievements. Build relationships with 2-3 recruiters in your space.",
      milestone: "Long-term salary defense system in place",
    },
  ];

  // Salary trend for role
  const roleTrend = salaryTrends[input.jobTitle] || { yoy: 2.5, direction: "up" as const };
  const salaryTrend: TrendInfo = {
    label: input.jobTitle,
    yoy: roleTrend.yoy,
    direction: roleTrend.direction,
    insight:
      roleTrend.direction === "up"
        ? `${input.jobTitle} salaries rose ${roleTrend.yoy}% year-over-year. ${roleTrend.yoy >= 5 ? "This is significantly above the national average of 3.2%, indicating strong demand." : "This is roughly in line with market-wide trends."}`
        : `${input.jobTitle} salaries declined ${Math.abs(roleTrend.yoy)}% year-over-year. Consider upskilling or pivoting to a related role with stronger growth.`,
  };

  // Location trend
  const locTrend = locationTrends[input.city] || { yoy: 2.5, direction: "up" as const };
  const locationTrend: TrendInfo = {
    label: input.city,
    yoy: locTrend.yoy,
    direction: locTrend.direction,
    insight:
      locTrend.direction === "up"
        ? `Salaries in ${input.city} grew ${locTrend.yoy}% year-over-year. ${locTrend.yoy >= 5 ? "This market is heating up — use this momentum in your negotiation." : "Steady growth in your region supports your case."}`
        : `Salaries in ${input.city} saw a slight decline. Consider remote opportunities for better compensation.`,
  };

  // Top paying combos (role × city × industry)
  const topPayingCombos: TopCombo[] = [];
  const topCities = ["San Francisco", "New York", "Seattle"];
  const topIndustries = ["Technology", "Finance", "E-commerce"];

  for (const city of topCities) {
    for (const industry of topIndustries) {
      const locMult = city === "San Francisco" ? 1.35 : city === "New York" ? 1.30 : 1.25;
      const indMult = industry === "Technology" ? 1.15 : industry === "Finance" ? 1.12 : 1.10;
      topPayingCombos.push({
        role: input.jobTitle,
        city,
        industry,
        estimatedMedian: Math.round(band.median * locMult * indMult),
      });
    }
  }

  topPayingCombos.sort((a, b) => b.estimatedMedian - a.estimatedMedian);

  return {
    industryBenchmarks,
    benefitsValuation,
    actionPlan,
    salaryTrend,
    locationTrend,
    topPayingCombos: topPayingCombos.slice(0, 5),
  };
}
