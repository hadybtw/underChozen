import type { SalaryAnalysis } from "./calculator";
import { formatCurrency } from "./utils";

export interface NegotiationPack {
  raiseRange: { low: number; target: number; high: number };
  emailScript: string;
  talkingPoints: string[];
  objectionHandling: { objection: string; response: string }[];
  ifDeniedStrategy: string[];
  threeYearModel: { year: number; projected: number; growth: string }[];
  riskOfStayingScore: number;
}

export function generateNegotiationPack(
  analysis: SalaryAnalysis
): NegotiationPack {
  const gap = Math.abs(analysis.delta);
  const targetRaise = Math.round(gap * 0.85);
  const lowRaise = Math.round(gap * 0.6);
  const highRaise = Math.round(gap * 1.1);

  const { input } = analysis;
  const currentFormatted = formatCurrency(input.currentSalary);
  const targetSalary = formatCurrency(input.currentSalary + targetRaise);
  const marketMedianFormatted = formatCurrency(analysis.marketMedian);

  const emailScript = `Subject: Compensation Discussion Request

Hi [Manager's Name],

I'd like to schedule time to discuss my compensation. Over the past [timeframe], I've contributed meaningfully to [specific project/results], and I want to ensure my pay reflects my current role and market conditions.

Based on my research into market rates for ${input.jobTitle} roles with ${input.yearsExperience} years of experience in ${input.city}, the current market median is ${marketMedianFormatted}. My current compensation of ${currentFormatted} is below this benchmark.

I'd like to discuss an adjustment to ${targetSalary}, which aligns with my contributions and market data.

I'm happy to share my research and discuss this at your convenience. Could we find 30 minutes this week or next?

Best regards,
[Your Name]`;

  const talkingPoints = [
    `Open with appreciation for the role and team, then transition to the data.`,
    `State your research: "Market data shows ${input.jobTitle} roles at the ${analysis.levelUsed} in ${input.city} within ${input.industry} have a median salary of ${marketMedianFormatted}."`,
    `Quantify your contributions: Reference 2-3 specific projects, outcomes, or metrics you've delivered.`,
    `Make the ask: "Based on this data and my track record, I'm requesting an adjustment to ${targetSalary}."`,
    `If they need time: "I understand this may need approval. What timeline works for a follow-up?"`,
    `Close with commitment: "I'm invested in this team and want to continue growing here."`,
  ];

  const objectionHandling = [
    {
      objection: "We don't have the budget right now.",
      response: `"I understand budget constraints. Could we agree on a timeline — perhaps a review in 3 months with a defined target of ${targetSalary}? I'm also open to discussing non-salary compensation like additional equity, a signing bonus, or extra PTO."`,
    },
    {
      objection: "You're already being compensated fairly.",
      response: `"I appreciate that perspective. Here's the market data I've gathered — ${input.jobTitle} roles at my level in ${input.city} have a median of ${marketMedianFormatted}. My current salary is ${formatCurrency(gap)} below that. I'd welcome reviewing this data together."`,
    },
    {
      objection: "Let's revisit this at your next review.",
      response: `"I'd like to formalize that. Could we document a target adjustment at my next review? I want to make sure we're aligned on the path forward, with a clear benchmark of ${targetSalary}."`,
    },
    {
      objection: "Your performance needs to improve first.",
      response: `"I'd like to understand what specific milestones you'd need to see. Could we set clear, measurable goals with a defined compensation adjustment tied to meeting them within 90 days?"`,
    },
  ];

  const ifDeniedStrategy = [
    "Request a written development plan with compensation milestones tied to specific deliverables within 90 days.",
    "Negotiate non-salary benefits: equity/stock options, signing bonus, additional PTO, flexible schedule, professional development budget, or title adjustment.",
    "Ask for the denial reasoning in writing and a specific date for re-evaluation.",
    "Begin documenting achievements weekly to build a stronger case for the next discussion.",
    "Evaluate external market opportunities to understand your true leverage — an outside offer is the strongest negotiation tool.",
  ];

  const annualGrowth = 0.05;
  const current = input.currentSalary;
  const adjusted = input.currentSalary + targetRaise;
  const threeYearModel = [
    {
      year: 1,
      projected: Math.round(adjusted),
      growth: formatCurrency(targetRaise),
    },
    {
      year: 2,
      projected: Math.round(adjusted * (1 + annualGrowth)),
      growth: formatCurrency(
        Math.round(adjusted * (1 + annualGrowth)) -
          Math.round(current * (1 + annualGrowth))
      ),
    },
    {
      year: 3,
      projected: Math.round(adjusted * Math.pow(1 + annualGrowth, 2)),
      growth: formatCurrency(
        Math.round(adjusted * Math.pow(1 + annualGrowth, 2)) -
          Math.round(current * Math.pow(1 + annualGrowth, 2))
      ),
    },
  ];

  // Risk score: higher = worse to stay at current pay
  const riskOfStayingScore = Math.min(
    10,
    Math.round((gap / analysis.marketMedian) * 20 + 2)
  );

  return {
    raiseRange: { low: lowRaise, target: targetRaise, high: highRaise },
    emailScript,
    talkingPoints,
    objectionHandling,
    ifDeniedStrategy,
    threeYearModel,
    riskOfStayingScore,
  };
}
