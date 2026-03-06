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
  {
    role: "Project Manager",
    entry: { p25: 55000, median: 68000, p75: 82000 },
    mid: { p25: 80000, median: 98000, p75: 120000 },
    senior: { p25: 115000, median: 140000, p75: 172000 },
  },
  {
    role: "HR Manager",
    entry: { p25: 48000, median: 60000, p75: 72000 },
    mid: { p25: 70000, median: 88000, p75: 108000 },
    senior: { p25: 105000, median: 130000, p75: 160000 },
  },
  {
    role: "Account Executive",
    entry: { p25: 45000, median: 55000, p75: 70000 },
    mid: { p25: 68000, median: 85000, p75: 110000 },
    senior: { p25: 105000, median: 135000, p75: 175000 },
  },
  {
    role: "DevOps Engineer",
    entry: { p25: 75000, median: 90000, p75: 108000 },
    mid: { p25: 110000, median: 132000, p75: 158000 },
    senior: { p25: 155000, median: 182000, p75: 220000 },
  },
  {
    role: "Data Scientist",
    entry: { p25: 80000, median: 95000, p75: 115000 },
    mid: { p25: 115000, median: 140000, p75: 170000 },
    senior: { p25: 165000, median: 195000, p75: 240000 },
  },
  {
    role: "UX Researcher",
    entry: { p25: 58000, median: 72000, p75: 88000 },
    mid: { p25: 85000, median: 105000, p75: 128000 },
    senior: { p25: 125000, median: 150000, p75: 182000 },
  },
  {
    role: "Business Analyst",
    entry: { p25: 52000, median: 63000, p75: 76000 },
    mid: { p25: 72000, median: 90000, p75: 110000 },
    senior: { p25: 108000, median: 130000, p75: 158000 },
  },
  {
    role: "Recruiter",
    entry: { p25: 42000, median: 52000, p75: 64000 },
    mid: { p25: 60000, median: 75000, p75: 95000 },
    senior: { p25: 90000, median: 115000, p75: 145000 },
  },
  {
    role: "Content Strategist",
    entry: { p25: 45000, median: 55000, p75: 68000 },
    mid: { p25: 65000, median: 80000, p75: 100000 },
    senior: { p25: 95000, median: 118000, p75: 145000 },
  },
  {
    role: "Technical Writer",
    entry: { p25: 50000, median: 62000, p75: 76000 },
    mid: { p25: 72000, median: 88000, p75: 108000 },
    senior: { p25: 105000, median: 125000, p75: 152000 },
  },
  {
    role: "QA Engineer",
    entry: { p25: 58000, median: 70000, p75: 85000 },
    mid: { p25: 82000, median: 100000, p75: 122000 },
    senior: { p25: 118000, median: 142000, p75: 172000 },
  },
  {
    role: "Engineering Manager",
    entry: { p25: 110000, median: 130000, p75: 155000 },
    mid: { p25: 145000, median: 172000, p75: 205000 },
    senior: { p25: 190000, median: 225000, p75: 275000 },
  },
  {
    role: "Cybersecurity Analyst",
    entry: { p25: 62000, median: 76000, p75: 92000 },
    mid: { p25: 90000, median: 112000, p75: 138000 },
    senior: { p25: 135000, median: 162000, p75: 198000 },
  },
  {
    role: "Cloud Architect",
    entry: { p25: 95000, median: 115000, p75: 138000 },
    mid: { p25: 135000, median: 162000, p75: 195000 },
    senior: { p25: 180000, median: 215000, p75: 260000 },
  },
  {
    role: "Mobile Developer",
    entry: { p25: 70000, median: 85000, p75: 102000 },
    mid: { p25: 102000, median: 125000, p75: 152000 },
    senior: { p25: 148000, median: 175000, p75: 212000 },
  },
  {
    role: "Solutions Architect",
    entry: { p25: 88000, median: 105000, p75: 128000 },
    mid: { p25: 125000, median: 150000, p75: 182000 },
    senior: { p25: 170000, median: 200000, p75: 245000 },
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

// Year-over-year salary trend data by role (percentage change)
export const salaryTrends: Record<string, { yoy: number; direction: "up" | "down" | "flat" }> = {
  "Software Engineer": { yoy: 4.2, direction: "up" },
  "Marketing Manager": { yoy: 2.8, direction: "up" },
  "Sales Representative": { yoy: 1.5, direction: "up" },
  "Product Manager": { yoy: 5.1, direction: "up" },
  "Designer": { yoy: 3.4, direction: "up" },
  "Financial Analyst": { yoy: 2.1, direction: "up" },
  "Customer Success Manager": { yoy: 3.8, direction: "up" },
  "Data Analyst": { yoy: 6.2, direction: "up" },
  "Operations Manager": { yoy: 1.9, direction: "up" },
  "Project Manager": { yoy: 2.5, direction: "up" },
  "HR Manager": { yoy: 2.2, direction: "up" },
  "Account Executive": { yoy: 3.1, direction: "up" },
  "DevOps Engineer": { yoy: 7.4, direction: "up" },
  "Data Scientist": { yoy: 8.1, direction: "up" },
  "UX Researcher": { yoy: 4.6, direction: "up" },
  "Business Analyst": { yoy: 2.9, direction: "up" },
  "Recruiter": { yoy: -1.2, direction: "down" },
  "Content Strategist": { yoy: 3.3, direction: "up" },
  "Technical Writer": { yoy: 2.7, direction: "up" },
  "QA Engineer": { yoy: 3.9, direction: "up" },
  "Engineering Manager": { yoy: 5.8, direction: "up" },
  "Cybersecurity Analyst": { yoy: 9.2, direction: "up" },
  "Cloud Architect": { yoy: 8.5, direction: "up" },
  "Mobile Developer": { yoy: 4.0, direction: "up" },
  "Solutions Architect": { yoy: 6.1, direction: "up" },
};

// Location-specific trend data
export const locationTrends: Record<string, { yoy: number; direction: "up" | "down" | "flat" }> = {
  "San Francisco": { yoy: 3.2, direction: "up" },
  "New York": { yoy: 4.1, direction: "up" },
  "Seattle": { yoy: 5.3, direction: "up" },
  "Boston": { yoy: 3.8, direction: "up" },
  "Los Angeles": { yoy: 2.9, direction: "up" },
  "Austin": { yoy: 6.8, direction: "up" },
  "Denver": { yoy: 4.5, direction: "up" },
  "Chicago": { yoy: 2.1, direction: "up" },
  "Atlanta": { yoy: 5.2, direction: "up" },
  "Dallas": { yoy: 4.9, direction: "up" },
  "Phoenix": { yoy: 3.7, direction: "up" },
  "Minneapolis": { yoy: 1.8, direction: "up" },
  "Portland": { yoy: 2.4, direction: "up" },
  "Philadelphia": { yoy: 2.0, direction: "up" },
  "Miami": { yoy: 5.6, direction: "up" },
  "Detroit": { yoy: 1.2, direction: "up" },
  "Remote": { yoy: -0.8, direction: "down" },
  "Other": { yoy: 2.5, direction: "up" },
};

export const roles = salaryData.map((d) => d.role);
export const locations = Object.keys(locationMultipliers);
export const industries = Object.keys(industryMultipliers);
export const companySizes = Object.keys(companySizeMultipliers);
