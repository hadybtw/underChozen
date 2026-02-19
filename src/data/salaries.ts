export interface RoleSalaryData {
  role: string;
  entry: { p25: number; median: number; p75: number };
  mid: { p25: number; median: number; p75: number };
  senior: { p25: number; median: number; p75: number };
}

export const salaryData: RoleSalaryData[] = [
  {
    role: "Software Engineer",
    entry: { p25: 72000, median: 85000, p75: 100000 },
    mid: { p25: 105000, median: 125000, p75: 150000 },
    senior: { p25: 150000, median: 178000, p75: 215000 },
  },
  {
    role: "Marketing Manager",
    entry: { p25: 48000, median: 58000, p75: 70000 },
    mid: { p25: 70000, median: 85000, p75: 105000 },
    senior: { p25: 105000, median: 128000, p75: 155000 },
  },
  {
    role: "Sales Representative",
    entry: { p25: 40000, median: 50000, p75: 62000 },
    mid: { p25: 60000, median: 75000, p75: 95000 },
    senior: { p25: 90000, median: 115000, p75: 145000 },
  },
  {
    role: "Product Manager",
    entry: { p25: 75000, median: 90000, p75: 108000 },
    mid: { p25: 110000, median: 135000, p75: 160000 },
    senior: { p25: 155000, median: 185000, p75: 225000 },
  },
  {
    role: "Designer",
    entry: { p25: 52000, median: 65000, p75: 78000 },
    mid: { p25: 78000, median: 95000, p75: 118000 },
    senior: { p25: 118000, median: 142000, p75: 175000 },
  },
  {
    role: "Financial Analyst",
    entry: { p25: 55000, median: 65000, p75: 78000 },
    mid: { p25: 75000, median: 92000, p75: 112000 },
    senior: { p25: 110000, median: 135000, p75: 165000 },
  },
  {
    role: "Customer Success Manager",
    entry: { p25: 42000, median: 52000, p75: 63000 },
    mid: { p25: 62000, median: 78000, p75: 95000 },
    senior: { p25: 92000, median: 112000, p75: 138000 },
  },
  {
    role: "Data Analyst",
    entry: { p25: 55000, median: 67000, p75: 80000 },
    mid: { p25: 78000, median: 95000, p75: 115000 },
    senior: { p25: 112000, median: 135000, p75: 162000 },
  },
  {
    role: "Operations Manager",
    entry: { p25: 48000, median: 58000, p75: 72000 },
    mid: { p25: 68000, median: 85000, p75: 105000 },
    senior: { p25: 100000, median: 125000, p75: 155000 },
  },
];

export const locationMultipliers: Record<string, number> = {
  "San Francisco": 1.35,
  "New York": 1.30,
  "Seattle": 1.25,
  "Boston": 1.20,
  "Los Angeles": 1.18,
  "Austin": 1.08,
  "Denver": 1.05,
  "Chicago": 1.05,
  "Atlanta": 0.98,
  "Dallas": 0.97,
  "Phoenix": 0.95,
  "Minneapolis": 0.98,
  "Portland": 1.05,
  "Philadelphia": 1.05,
  "Miami": 1.02,
  "Detroit": 0.90,
  "Remote": 1.00,
  "Other": 1.00,
};

export const industryMultipliers: Record<string, number> = {
  "Technology": 1.15,
  "Finance": 1.12,
  "Healthcare": 1.05,
  "Consulting": 1.08,
  "E-commerce": 1.10,
  "Manufacturing": 0.95,
  "Education": 0.88,
  "Government": 0.90,
  "Nonprofit": 0.82,
  "Media": 0.95,
  "Retail": 0.90,
  "Energy": 1.08,
  "Other": 1.00,
};

export const companySizeMultipliers: Record<string, number> = {
  "1-50": 0.90,
  "51-200": 0.95,
  "201-1000": 1.00,
  "1001-5000": 1.05,
  "5000+": 1.10,
};

export const roles = salaryData.map((d) => d.role);
export const locations = Object.keys(locationMultipliers);
export const industries = Object.keys(industryMultipliers);
export const companySizes = Object.keys(companySizeMultipliers);
