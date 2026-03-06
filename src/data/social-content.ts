/**
 * Pre-written Instagram carousel content scripts.
 * Each carousel has 5-7 slides with a hook, content, and CTA.
 */

export interface CarouselSlide {
  type: "hook" | "stat" | "content" | "list" | "cta";
  headline: string;
  subtext?: string;
  stat?: string;
  statLabel?: string;
  listItems?: string[];
  ctaText?: string;
  accent?: "purple" | "red" | "green" | "blue" | "warning";
}

export interface CarouselPost {
  id: string;
  title: string;
  category: string;
  caption: string;
  hashtags: string;
  slides: CarouselSlide[];
}

export const carouselPosts: CarouselPost[] = [
  {
    id: "underpaid-signs",
    title: "5 Signs You're Being Underpaid",
    category: "Education",
    caption: "Most people don't realize they're underpaid until it's too late. Here are 5 signs you need to check your market value today.\n\nThe average underpaid professional loses $142K over their career. Don't be one of them.\n\nLink in bio to check yours free.",
    hashtags: "#salary #career #negotiation #underpaid #careeradvice #salarytransparency #jobmarket #paygap #careergrowth #money",
    slides: [
      {
        type: "hook",
        headline: "5 Signs You're\nBeing Underpaid",
        subtext: "Most people don't find out until it's too late.",
        accent: "red",
      },
      {
        type: "list",
        headline: "You haven't had a raise\nin over a year",
        subtext: "Inflation alone costs you 3-4% annually. No raise = a pay cut.",
        listItems: ["1"],
        accent: "red",
      },
      {
        type: "list",
        headline: "New hires in your role\nmake more than you",
        subtext: "Companies pay market rate to attract — but rarely adjust existing salaries to match.",
        listItems: ["2"],
        accent: "red",
      },
      {
        type: "list",
        headline: "You've never\nnegotiated your salary",
        subtext: "73% of workers never negotiate. Those who do earn $18K more on average.",
        listItems: ["3"],
        accent: "purple",
      },
      {
        type: "stat",
        headline: "The Lifetime Cost",
        stat: "$142K",
        statLabel: "Average lifetime earnings lost from being underpaid",
        accent: "red",
      },
      {
        type: "cta",
        headline: "Find Out in\n30 Seconds",
        subtext: "Free salary analysis. No signup required.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "software-engineer-salary",
    title: "Software Engineer Salaries 2026",
    category: "Salary Data",
    caption: "Software Engineer salaries in 2026 — broken down by experience level and city.\n\nAre you above or below the median? Check the data.\n\nLink in bio for your personalized analysis.",
    hashtags: "#softwareengineer #techsalary #coding #developer #techjobs #swe #programming #webdev #salarytransparency #tech",
    slides: [
      {
        type: "hook",
        headline: "Software Engineer\nSalaries in 2026",
        subtext: "Real market data. Are you above or below?",
        accent: "blue",
      },
      {
        type: "stat",
        headline: "Entry Level (0-2 yrs)",
        stat: "$85K",
        statLabel: "Median  ·  Range: $72K – $100K",
        accent: "blue",
      },
      {
        type: "stat",
        headline: "Mid Level (3-6 yrs)",
        stat: "$125K",
        statLabel: "Median  ·  Range: $105K – $150K",
        accent: "purple",
      },
      {
        type: "stat",
        headline: "Senior Level (7+ yrs)",
        stat: "$178K",
        statLabel: "Median  ·  Range: $150K – $215K",
        accent: "green",
      },
      {
        type: "content",
        headline: "Top Paying Cities",
        subtext: "San Francisco: +35%\nNew York: +30%\nSeattle: +25%\nBoston: +20%\nLos Angeles: +18%",
        accent: "purple",
      },
      {
        type: "cta",
        headline: "Where Do\nYou Rank?",
        subtext: "Get your exact percentile. Free, instant analysis.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "negotiation-mistakes",
    title: "3 Negotiation Mistakes That Cost You $$$",
    category: "Tips",
    caption: "These 3 mistakes cost professionals thousands every year. The fix? Come with data.\n\n87% of workers who negotiate with market data get their raise approved.\n\nLink in bio to get your data.",
    hashtags: "#negotiation #salarynegotiation #careeradvice #askformore #payrise #careertips #money #professionaldevelopment #workplace #hustle",
    slides: [
      {
        type: "hook",
        headline: "3 Negotiation\nMistakes Costing\nYou Thousands",
        subtext: "Stop leaving money on the table.",
        accent: "warning",
      },
      {
        type: "list",
        headline: "Saying a number first",
        subtext: "Let the employer anchor. If forced, anchor high with market data to back it up.",
        listItems: ["1"],
        accent: "red",
      },
      {
        type: "list",
        headline: "Negotiating without data",
        subtext: "\"I feel like I deserve more\" doesn't work. \"Market data shows I'm 23% below median\" does.",
        listItems: ["2"],
        accent: "red",
      },
      {
        type: "list",
        headline: "Accepting the first offer",
        subtext: "The first offer is never the best offer. 85% of managers expect a counter.",
        listItems: ["3"],
        accent: "red",
      },
      {
        type: "stat",
        headline: "The Data Advantage",
        stat: "$18K",
        statLabel: "Average raise secured with a data-backed ask",
        accent: "green",
      },
      {
        type: "cta",
        headline: "Get Your\nMarket Data",
        subtext: "Free salary analysis in 30 seconds.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "city-comparison",
    title: "Same Role, Different City = Different Pay",
    category: "Salary Data",
    caption: "Your city changes your salary by up to 35%. Here's how the same role pays across major markets.\n\nRemote doesn't mean you should accept local rates.\n\nLink in bio to see your city's market rate.",
    hashtags: "#remotework #salary #costofliving #relocation #techsalary #salarytransparency #workfromhome #digitalnomad #careermove #paygap",
    slides: [
      {
        type: "hook",
        headline: "Same Role.\nDifferent City.\nDifferent Pay.",
        subtext: "Location changes your salary by up to 35%.",
        accent: "blue",
      },
      {
        type: "content",
        headline: "Product Manager\nMedian Salary",
        subtext: "San Francisco: $182K\nNew York: $175K\nSeattle: $169K\nAustin: $146K\nDetroit: $121K",
        accent: "purple",
      },
      {
        type: "stat",
        headline: "The Gap",
        stat: "$61K",
        statLabel: "Difference between highest and lowest paying city for the same role",
        accent: "red",
      },
      {
        type: "content",
        headline: "Remote Workers",
        subtext: "If you're remote, you should be benchmarking against the market where your company is headquartered — not where you live.",
        accent: "blue",
      },
      {
        type: "cta",
        headline: "Check Your\nCity's Rate",
        subtext: "See how your city affects your market value.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "73-percent",
    title: "73% Never Negotiate. Here's Why They Should.",
    category: "Education",
    caption: "73% of workers never negotiate their salary. The ones who do earn significantly more over their careers.\n\nIt's not about being aggressive. It's about being prepared.\n\nLink in bio to get your negotiation blueprint.",
    hashtags: "#negotiate #salary #career #money #payrise #askformore #careeradvice #professionaldevelopment #confidence #success",
    slides: [
      {
        type: "hook",
        headline: "73% of Workers\nNever Negotiate",
        subtext: "Here's what they're leaving on the table.",
        accent: "warning",
      },
      {
        type: "stat",
        headline: "The Ones Who Do",
        stat: "$18K",
        statLabel: "Average salary increase from a single negotiation",
        accent: "green",
      },
      {
        type: "stat",
        headline: "Over a Career",
        stat: "$142K",
        statLabel: "Total earnings lost by not negotiating",
        accent: "red",
      },
      {
        type: "content",
        headline: "It's Not About\nBeing Aggressive",
        subtext: "It's about being prepared.\n\nShow up with:\n→ Your exact market rate\n→ A specific ask\n→ Data to back it up",
        accent: "purple",
      },
      {
        type: "stat",
        headline: "Managers Expect It",
        stat: "85%",
        statLabel: "Of managers are prepared for salary negotiation conversations",
        accent: "blue",
      },
      {
        type: "cta",
        headline: "Get Prepared\nin 30 Seconds",
        subtext: "Free salary analysis + negotiation strategy.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "data-scientist-vs-swe",
    title: "Data Scientist vs Software Engineer Pay",
    category: "Comparison",
    caption: "Two of the hottest roles in tech — but which one pays more? The answer might surprise you.\n\nSalary depends on level, location, and industry. Here's the real data.\n\nLink in bio to compare your role.",
    hashtags: "#datascience #softwareengineer #techcareers #coding #python #machinelearning #techjobs #salarytransparency #careerchoice #stem",
    slides: [
      {
        type: "hook",
        headline: "Data Scientist\nvs Software\nEngineer",
        subtext: "Which one actually pays more?",
        accent: "purple",
      },
      {
        type: "stat",
        headline: "Data Scientist — Mid",
        stat: "$128K",
        statLabel: "Median  ·  Range: $108K – $152K",
        accent: "blue",
      },
      {
        type: "stat",
        headline: "Software Engineer — Mid",
        stat: "$125K",
        statLabel: "Median  ·  Range: $105K – $150K",
        accent: "purple",
      },
      {
        type: "content",
        headline: "At Senior Level",
        subtext: "Data Scientist: $182K median\nSoftware Engineer: $178K median\n\nData Scientists edge ahead — but SWEs have more roles and faster YoY growth (+4.2%).",
        accent: "green",
      },
      {
        type: "cta",
        headline: "Compare Your\nRole's Pay",
        subtext: "25 roles. 18 cities. Free analysis.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "raise-email-template",
    title: "The Exact Email That Gets Raises Approved",
    category: "Tips",
    caption: "This email template has helped thousands negotiate successfully. It's not about demanding — it's about positioning.\n\nWant it personalized to your role and data? Link in bio.",
    hashtags: "#negotiation #email #template #salary #payrise #career #askformore #professionaldevelopment #workplace #careeradvice",
    slides: [
      {
        type: "hook",
        headline: "The Email That\nGets Raises\nApproved",
        subtext: "Copy this framework. Personalize it. Send it.",
        accent: "green",
      },
      {
        type: "content",
        headline: "Line 1: The Setup",
        subtext: "\"I'd like to discuss my compensation based on my contributions and current market data.\"",
        accent: "blue",
      },
      {
        type: "content",
        headline: "Line 2: The Data",
        subtext: "\"Based on [source], the market rate for [role] in [city] with my experience is [range]. My current salary falls at the [X]th percentile.\"",
        accent: "purple",
      },
      {
        type: "content",
        headline: "Line 3: The Ask",
        subtext: "\"I'd like to discuss an adjustment to [$amount] to align with market rates and reflect my [specific contributions].\"",
        accent: "green",
      },
      {
        type: "content",
        headline: "Line 4: The Close",
        subtext: "\"I'm committed to [company] and excited about [upcoming project]. I'd love to find a time to discuss this.\"",
        accent: "blue",
      },
      {
        type: "cta",
        headline: "Get Yours\nPersonalized",
        subtext: "We generate this email with your actual market data.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "industry-premium",
    title: "Your Industry Changes Your Pay by 25%",
    category: "Salary Data",
    caption: "The same role in Tech vs Healthcare can differ by 25% or more. Here's how industries stack up.\n\nAre you in the right industry for your skills?\n\nLink in bio to check.",
    hashtags: "#industry #salary #tech #finance #healthcare #careermove #salarytransparency #jobmarket #careeradvice #paygap",
    slides: [
      {
        type: "hook",
        headline: "Your Industry\nChanges Your\nPay by 25%",
        subtext: "Same skills. Same role. Wildly different salary.",
        accent: "warning",
      },
      {
        type: "content",
        headline: "Industry Premiums",
        subtext: "Technology: +15%\nFinance: +12%\nConsulting: +8%\nHealthcare: +5%\nRetail: -8%\nNon-profit: -12%",
        accent: "purple",
      },
      {
        type: "stat",
        headline: "Example: Data Analyst",
        stat: "$106K",
        statLabel: "In Tech vs $74K in Non-profit  ·  Same role, $32K difference",
        accent: "green",
      },
      {
        type: "content",
        headline: "The Move That\nPays Most",
        subtext: "Switching from a low-premium to a high-premium industry can be worth more than a promotion in your current one.",
        accent: "blue",
      },
      {
        type: "cta",
        headline: "See Your\nIndustry Premium",
        subtext: "13 industries analyzed. Free and instant.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "first-job-salary",
    title: "Your First Salary Sets Your Entire Career",
    category: "Education",
    caption: "Starting $5K below market doesn't just cost you $5K. It compounds into six figures over your career.\n\nNew grads: negotiate your first offer. Here's why.\n\nLink in bio to check your market rate.",
    hashtags: "#firstjob #newgrad #entrylevel #salary #career #money #negotiate #collegegrad #jobsearch #careerlaunch",
    slides: [
      {
        type: "hook",
        headline: "Your First Salary\nSets Your\nEntire Career",
        subtext: "Here's the math most people miss.",
        accent: "red",
      },
      {
        type: "stat",
        headline: "Starting $5K Below Market",
        stat: "-$5K",
        statLabel: "Year 1 cost",
        accent: "red",
      },
      {
        type: "stat",
        headline: "After 10 Years",
        stat: "-$67K",
        statLabel: "Total earnings lost (3% annual raises compound on the lower base)",
        accent: "red",
      },
      {
        type: "stat",
        headline: "After 20 Years",
        stat: "-$162K",
        statLabel: "The compounding effect of a low starting salary",
        accent: "red",
      },
      {
        type: "content",
        headline: "The Fix Is Simple",
        subtext: "Know your market rate before you accept.\n\n→ Research the range\n→ Ask for the top quartile\n→ Back it with data",
        accent: "green",
      },
      {
        type: "cta",
        headline: "Know Your\nMarket Rate",
        subtext: "Free. 30 seconds. No signup.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
  {
    id: "manager-salary-breakdown",
    title: "Engineering Manager: The $200K+ Path",
    category: "Salary Data",
    caption: "Engineering Manager is one of the highest-paying roles in tech. Here's the full breakdown by level and city.\n\nIs management the right move for you?\n\nLink in bio to compare paths.",
    hashtags: "#engineeringmanager #techleadership #management #salary #techcareers #leadership #careergrowth #techlead #salarytransparency #promotion",
    slides: [
      {
        type: "hook",
        headline: "Engineering\nManager Salaries",
        subtext: "The path to $200K+",
        accent: "green",
      },
      {
        type: "stat",
        headline: "Entry (New Manager)",
        stat: "$130K",
        statLabel: "Median  ·  Range: $115K – $148K",
        accent: "blue",
      },
      {
        type: "stat",
        headline: "Mid (3-6 yrs managing)",
        stat: "$162K",
        statLabel: "Median  ·  Range: $140K – $188K",
        accent: "purple",
      },
      {
        type: "stat",
        headline: "Senior / Director",
        stat: "$210K",
        statLabel: "Median  ·  Range: $180K – $255K",
        accent: "green",
      },
      {
        type: "content",
        headline: "IC vs Manager",
        subtext: "Senior SWE median: $178K\nSenior EM median: $210K\n\nManagement track pays ~18% more at senior level — but isn't for everyone.",
        accent: "purple",
      },
      {
        type: "cta",
        headline: "Compare\nYour Path",
        subtext: "25 roles. See where you stand.",
        ctaText: "underchozen.com",
        accent: "purple",
      },
    ],
  },
];
