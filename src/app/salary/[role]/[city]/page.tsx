import { Metadata } from "next";
import Link from "next/link";
import {
  salaryData,
  locationMultipliers,
  salaryTrends,
  locationTrends,
} from "@/data/salaries";
import { analyzeSalary } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { PageTracker } from "@/components/page-tracker";

/* ===== SLUG HELPERS ===== */

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fromSlug(slug: string, candidates: string[]): string | undefined {
  return candidates.find((c) => toSlug(c) === slug);
}

/* ===== STATIC PARAMS ===== */

const TOP_ROLES = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Marketing Manager",
  "Designer",
  "Financial Analyst",
  "DevOps Engineer",
  "Engineering Manager",
  "Cloud Architect",
  "Sales Representative",
];

const TOP_CITIES = [
  "San Francisco",
  "New York",
  "Seattle",
  "Austin",
  "Chicago",
];

export function generateStaticParams() {
  const params: { role: string; city: string }[] = [];
  for (const role of TOP_ROLES) {
    for (const city of TOP_CITIES) {
      params.push({ role: toSlug(role), city: toSlug(city) });
    }
  }
  return params;
}

/* ===== METADATA ===== */

interface PageProps {
  params: Promise<{ role: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role: roleSlug, city: citySlug } = await params;
  const allRoles = salaryData.map((d) => d.role);
  const allCities = Object.keys(locationMultipliers);

  const roleName = fromSlug(roleSlug, allRoles);
  const cityName = fromSlug(citySlug, allCities);

  if (!roleName || !cityName) {
    return { title: "Salary Data | UnderChozen" };
  }

  const analysis = analyzeSalary({
    jobTitle: roleName,
    yearsExperience: 3,
    city: cityName,
    industry: "Technology",
    currentSalary: 0,
    companySize: "201-1000",
  });

  const title = `${roleName} Salary in ${cityName} 2026 | UnderChozen`;
  const description = `${roleName} salaries in ${cityName} range from ${formatCurrency(analysis.marketLow)} to ${formatCurrency(analysis.marketHigh)}, with a median of ${formatCurrency(analysis.marketMedian)}. Get your personalized salary analysis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "UnderChozen",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/salary/${roleSlug}/${citySlug}`,
    },
  };
}

/* ===== PAGE ===== */

export default async function SalaryPage({ params }: PageProps) {
  const { role: roleSlug, city: citySlug } = await params;
  const allRoles = salaryData.map((d) => d.role);
  const allCities = Object.keys(locationMultipliers);

  const roleName = fromSlug(roleSlug, allRoles);
  const cityName = fromSlug(citySlug, allCities);

  if (!roleName || !cityName) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl heading-display mb-4">Page not found</h1>
          <Link href="/" className="text-sm text-accent hover:underline">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  /* Compute salary data for all three experience levels */
  const levels = [
    { label: "Entry Level", sublabel: "0-2 years", years: 1 },
    { label: "Mid Level", sublabel: "3-6 years", years: 4 },
    { label: "Senior Level", sublabel: "7+ years", years: 8 },
  ] as const;

  const analyses = levels.map((l) =>
    analyzeSalary({
      jobTitle: roleName,
      yearsExperience: l.years,
      city: cityName,
      industry: "Technology",
      currentSalary: 0,
      companySize: "201-1000",
    })
  );

  const midAnalysis = analyses[1];
  const roleTrend = salaryTrends[roleName];
  const cityTrend = locationTrends[cityName];

  /* Related pages */
  const relatedCities = TOP_CITIES.filter((c) => c !== cityName).slice(0, 4);
  const relatedRoles = TOP_ROLES.filter((r) => r !== roleName).slice(0, 4);

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OccupationalExperienceRequirements",
    name: `${roleName} in ${cityName}`,
    description: `Salary data for ${roleName} positions in ${cityName}.`,
    mainEntity: {
      "@type": "Occupation",
      name: roleName,
      occupationLocation: {
        "@type": "City",
        name: cityName,
      },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        name: "Base salary",
        currency: "USD",
        unitText: "YEAR",
        percentile25: midAnalysis.marketLow,
        median: midAnalysis.marketMedian,
        percentile75: midAnalysis.marketHigh,
      },
    },
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <PageTracker properties={{ page: "seo_salary", role: roleName, city: cityName }} />
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-pattern opacity-15 absolute inset-0" />
        <div className="orb orb-purple w-[350px] h-[350px] -top-[100px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[250px] h-[250px] bottom-[20%] -left-[60px]" />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 sm:py-12">
        {/* Navigation */}
        <div className="mb-10 sm:mb-14">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted/60 hover:text-foreground/80 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="info-label text-accent/60 mb-4 block">
            Salary Data
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-4">
            <span className="italic text-accent/90">{roleName}</span> Salary
            <br className="hidden sm:block" />{" "}
            in {cityName}
          </h1>
          <p className="text-sm sm:text-base text-muted/55 max-w-lg mx-auto leading-relaxed">
            2026 compensation data based on aggregated market sources, adjusted
            for {cityName} cost of living and Technology industry rates.
          </p>
        </div>

        {/* Headline stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-5 sm:p-6 text-center">
            <span className="info-label block mb-2">P25 (Low)</span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight stat-glow text-foreground/90">
              {formatCurrency(midAnalysis.marketLow)}
            </span>
          </div>
          <div className="glass-elevated rounded-2xl p-5 sm:p-6 text-center glow-accent">
            <span className="info-label block mb-2">Median</span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight stat-glow text-foreground">
              {formatCurrency(midAnalysis.marketMedian)}
            </span>
          </div>
          <div className="glass rounded-2xl p-5 sm:p-6 text-center">
            <span className="info-label block mb-2">P75 (High)</span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight stat-glow text-foreground/90">
              {formatCurrency(midAnalysis.marketHigh)}
            </span>
          </div>
        </div>

        {/* Trend badges */}
        {(roleTrend || cityTrend) && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {roleTrend && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass ${
                  roleTrend.direction === "up"
                    ? "text-positive"
                    : roleTrend.direction === "down"
                      ? "text-negative"
                      : "text-muted"
                }`}
              >
                {roleTrend.direction === "up" ? "+" : ""}
                {roleTrend.yoy}% YoY for {roleName}
              </span>
            )}
            {cityTrend && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass ${
                  cityTrend.direction === "up"
                    ? "text-positive"
                    : cityTrend.direction === "down"
                      ? "text-negative"
                      : "text-muted"
                }`}
              >
                {cityTrend.direction === "up" ? "+" : ""}
                {cityTrend.yoy}% YoY in {cityName}
              </span>
            )}
          </div>
        )}

        {/* Salary by experience level */}
        <div className="glass-elevated rounded-2xl p-5 sm:p-8 mb-8">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground/90 mb-6">
            Salary by Experience Level
          </h2>
          <div className="space-y-6">
            {levels.map((level, i) => {
              const a = analyses[i];
              const rangeWidth = a.marketHigh - a.marketLow;
              const medianPosition =
                rangeWidth > 0
                  ? ((a.marketMedian - a.marketLow) / rangeWidth) * 100
                  : 50;

              return (
                <div key={level.label}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-foreground/85">
                        {level.label}
                      </span>
                      <span className="text-xs text-muted/50 ml-2">
                        {level.sublabel}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-foreground/80">
                      {formatCurrency(a.marketMedian)}
                    </span>
                  </div>
                  {/* Range bar */}
                  <div className="relative h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="absolute inset-y-0 rounded-full bg-gradient-to-r from-accent/40 to-accent-blue/40"
                      style={{ left: "0%", width: "100%" }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground shadow-sm shadow-white/20"
                      style={{ left: `${medianPosition}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-muted/40">
                      {formatCurrency(a.marketLow)}
                    </span>
                    <span className="text-[10px] text-muted/40">
                      {formatCurrency(a.marketHigh)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key insights */}
        <div className="glass rounded-2xl p-5 sm:p-8 mb-8">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground/90 mb-4">
            Key Insights
          </h2>
          <ul className="space-y-3 text-sm text-muted/60 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
              The median {roleName} in {cityName} earns{" "}
              <strong className="text-foreground/80">
                {formatCurrency(midAnalysis.marketMedian)}
              </strong>{" "}
              per year in the Technology industry at mid-level experience.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
              Salaries range from{" "}
              <strong className="text-foreground/80">
                {formatCurrency(analyses[0].marketLow)}
              </strong>{" "}
              (entry-level, P25) to{" "}
              <strong className="text-foreground/80">
                {formatCurrency(analyses[2].marketHigh)}
              </strong>{" "}
              (senior-level, P75).
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
              {cityName} has a{" "}
              <strong className="text-foreground/80">
                {locationMultipliers[cityName]}x
              </strong>{" "}
              location multiplier, meaning salaries are{" "}
              {locationMultipliers[cityName] > 1
                ? `${Math.round((locationMultipliers[cityName] - 1) * 100)}% above`
                : `${Math.round((1 - locationMultipliers[cityName]) * 100)}% below`}{" "}
              the national baseline.
            </li>
            {roleTrend && (
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 shrink-0" />
                {roleName} compensation is trending{" "}
                <strong className="text-foreground/80">
                  {roleTrend.direction}
                </strong>{" "}
                at{" "}
                <strong className="text-foreground/80">
                  {roleTrend.yoy}%
                </strong>{" "}
                year-over-year.
              </li>
            )}
          </ul>
        </div>

        {/* CTA */}
        <div className="glass-elevated rounded-2xl p-6 sm:p-10 text-center mb-12 glow-accent">
          <h2 className="text-xl sm:text-2xl heading-display mb-3">
            Are you being paid fairly?
          </h2>
          <p className="text-sm text-muted/55 mb-6 max-w-md mx-auto leading-relaxed">
            Get a personalized salary analysis based on your exact experience,
            industry, and company size. Find out where you stand in 30 seconds.
          </p>
          <Link
            href={`/?prefill=${encodeURIComponent(roleName)},${encodeURIComponent(cityName)}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-accent/15 hover:shadow-accent/30 hover:brightness-110 transition-all duration-300 text-sm"
          >
            Get Your Personalized Analysis
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* Related: same role, different cities */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground/70 mb-4 tracking-tight">
            {roleName} salaries in other cities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedCities.map((city) => {
              const a = analyzeSalary({
                jobTitle: roleName,
                yearsExperience: 4,
                city,
                industry: "Technology",
                currentSalary: 0,
                companySize: "201-1000",
              });
              return (
                <Link
                  key={city}
                  href={`/salary/${toSlug(roleName)}/${toSlug(city)}`}
                  className="glass glass-hover rounded-xl p-4 text-center transition-all duration-200 hover:border-white/[0.12]"
                >
                  <span className="text-xs text-muted/50 block mb-1">
                    {city}
                  </span>
                  <span className="text-sm font-bold text-foreground/85">
                    {formatCurrency(a.marketMedian)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Related: same city, different roles */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground/70 mb-4 tracking-tight">
            Other roles in {cityName}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedRoles.map((role) => {
              const a = analyzeSalary({
                jobTitle: role,
                yearsExperience: 4,
                city: cityName,
                industry: "Technology",
                currentSalary: 0,
                companySize: "201-1000",
              });
              return (
                <Link
                  key={role}
                  href={`/salary/${toSlug(role)}/${toSlug(cityName)}`}
                  className="glass glass-hover rounded-xl p-4 text-center transition-all duration-200 hover:border-white/[0.12]"
                >
                  <span className="text-xs text-muted/50 block mb-1">
                    {role}
                  </span>
                  <span className="text-sm font-bold text-foreground/85">
                    {formatCurrency(a.marketMedian)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="glow-line mb-0" />
      </div>

      <Footer />
    </main>
  );
}
