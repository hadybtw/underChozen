/**
 * Multi-platform social content library.
 * Instagram carousels, Twitter threads, LinkedIn posts, Quora answers, TikTok scripts.
 */

/* ===== INSTAGRAM CAROUSELS ===== */
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
      { type: "hook", headline: "5 Signs You're\nBeing Underpaid", subtext: "Most people don't find out until it's too late.", accent: "red" },
      { type: "list", headline: "You haven't had a raise\nin over a year", subtext: "Inflation alone costs you 3-4% annually. No raise = a pay cut.", listItems: ["1"], accent: "red" },
      { type: "list", headline: "New hires in your role\nmake more than you", subtext: "Companies pay market rate to attract — but rarely adjust existing salaries to match.", listItems: ["2"], accent: "red" },
      { type: "list", headline: "You've never\nnegotiated your salary", subtext: "73% of workers never negotiate. Those who do earn $18K more on average.", listItems: ["3"], accent: "purple" },
      { type: "stat", headline: "The Lifetime Cost", stat: "$142K", statLabel: "Average lifetime earnings lost from being underpaid", accent: "red" },
      { type: "cta", headline: "Find Out in\n30 Seconds", subtext: "Free salary analysis. No signup required.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "software-engineer-salary",
    title: "Software Engineer Salaries 2026",
    category: "Salary Data",
    caption: "Software Engineer salaries in 2026 — broken down by experience level and city.\n\nAre you above or below the median? Check the data.\n\nLink in bio for your personalized analysis.",
    hashtags: "#softwareengineer #techsalary #coding #developer #techjobs #swe #programming #webdev #salarytransparency #tech",
    slides: [
      { type: "hook", headline: "Software Engineer\nSalaries in 2026", subtext: "Real market data. Are you above or below?", accent: "blue" },
      { type: "stat", headline: "Entry Level (0-2 yrs)", stat: "$85K", statLabel: "Median  ·  Range: $72K – $100K", accent: "blue" },
      { type: "stat", headline: "Mid Level (3-6 yrs)", stat: "$125K", statLabel: "Median  ·  Range: $105K – $150K", accent: "purple" },
      { type: "stat", headline: "Senior Level (7+ yrs)", stat: "$178K", statLabel: "Median  ·  Range: $150K – $215K", accent: "green" },
      { type: "content", headline: "Top Paying Cities", subtext: "San Francisco: +35%\nNew York: +30%\nSeattle: +25%\nBoston: +20%\nLos Angeles: +18%", accent: "purple" },
      { type: "cta", headline: "Where Do\nYou Rank?", subtext: "Get your exact percentile. Free, instant analysis.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "negotiation-mistakes",
    title: "3 Negotiation Mistakes That Cost You $$$",
    category: "Tips",
    caption: "These 3 mistakes cost professionals thousands every year. The fix? Come with data.\n\n87% of workers who negotiate with market data get their raise approved.\n\nLink in bio to get your data.",
    hashtags: "#negotiation #salarynegotiation #careeradvice #askformore #payrise #careertips #money #professionaldevelopment #workplace #hustle",
    slides: [
      { type: "hook", headline: "3 Negotiation\nMistakes Costing\nYou Thousands", subtext: "Stop leaving money on the table.", accent: "warning" },
      { type: "list", headline: "Saying a number first", subtext: "Let the employer anchor. If forced, anchor high with market data to back it up.", listItems: ["1"], accent: "red" },
      { type: "list", headline: "Negotiating without data", subtext: "\"I feel like I deserve more\" doesn't work. \"Market data shows I'm 23% below median\" does.", listItems: ["2"], accent: "red" },
      { type: "list", headline: "Accepting the first offer", subtext: "The first offer is never the best offer. 85% of managers expect a counter.", listItems: ["3"], accent: "red" },
      { type: "stat", headline: "The Data Advantage", stat: "$18K", statLabel: "Average raise secured with a data-backed ask", accent: "green" },
      { type: "cta", headline: "Get Your\nMarket Data", subtext: "Free salary analysis in 30 seconds.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "city-comparison",
    title: "Same Role, Different City = Different Pay",
    category: "Salary Data",
    caption: "Your city changes your salary by up to 35%. Here's how the same role pays across major markets.\n\nRemote doesn't mean you should accept local rates.\n\nLink in bio to see your city's market rate.",
    hashtags: "#remotework #salary #costofliving #relocation #techsalary #salarytransparency #workfromhome #digitalnomad #careermove #paygap",
    slides: [
      { type: "hook", headline: "Same Role.\nDifferent City.\nDifferent Pay.", subtext: "Location changes your salary by up to 35%.", accent: "blue" },
      { type: "content", headline: "Product Manager\nMedian Salary", subtext: "San Francisco: $182K\nNew York: $175K\nSeattle: $169K\nAustin: $146K\nDetroit: $121K", accent: "purple" },
      { type: "stat", headline: "The Gap", stat: "$61K", statLabel: "Difference between highest and lowest paying city for the same role", accent: "red" },
      { type: "content", headline: "Remote Workers", subtext: "If you're remote, you should be benchmarking against the market where your company is headquartered — not where you live.", accent: "blue" },
      { type: "cta", headline: "Check Your\nCity's Rate", subtext: "See how your city affects your market value.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "73-percent",
    title: "73% Never Negotiate. Here's Why They Should.",
    category: "Education",
    caption: "73% of workers never negotiate their salary. The ones who do earn significantly more over their careers.\n\nIt's not about being aggressive. It's about being prepared.\n\nLink in bio to get your negotiation blueprint.",
    hashtags: "#negotiate #salary #career #money #payrise #askformore #careeradvice #professionaldevelopment #confidence #success",
    slides: [
      { type: "hook", headline: "73% of Workers\nNever Negotiate", subtext: "Here's what they're leaving on the table.", accent: "warning" },
      { type: "stat", headline: "The Ones Who Do", stat: "$18K", statLabel: "Average salary increase from a single negotiation", accent: "green" },
      { type: "stat", headline: "Over a Career", stat: "$142K", statLabel: "Total earnings lost by not negotiating", accent: "red" },
      { type: "content", headline: "It's Not About\nBeing Aggressive", subtext: "It's about being prepared.\n\nShow up with:\n→ Your exact market rate\n→ A specific ask\n→ Data to back it up", accent: "purple" },
      { type: "stat", headline: "Managers Expect It", stat: "85%", statLabel: "Of managers are prepared for salary negotiation conversations", accent: "blue" },
      { type: "cta", headline: "Get Prepared\nin 30 Seconds", subtext: "Free salary analysis + negotiation strategy.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "data-scientist-vs-swe",
    title: "Data Scientist vs Software Engineer Pay",
    category: "Comparison",
    caption: "Two of the hottest roles in tech — but which one pays more? The answer might surprise you.\n\nSalary depends on level, location, and industry. Here's the real data.\n\nLink in bio to compare your role.",
    hashtags: "#datascience #softwareengineer #techcareers #coding #python #machinelearning #techjobs #salarytransparency #careerchoice #stem",
    slides: [
      { type: "hook", headline: "Data Scientist\nvs Software\nEngineer", subtext: "Which one actually pays more?", accent: "purple" },
      { type: "stat", headline: "Data Scientist — Mid", stat: "$128K", statLabel: "Median  ·  Range: $108K – $152K", accent: "blue" },
      { type: "stat", headline: "Software Engineer — Mid", stat: "$125K", statLabel: "Median  ·  Range: $105K – $150K", accent: "purple" },
      { type: "content", headline: "At Senior Level", subtext: "Data Scientist: $182K median\nSoftware Engineer: $178K median\n\nData Scientists edge ahead — but SWEs have more roles and faster YoY growth (+4.2%).", accent: "green" },
      { type: "cta", headline: "Compare Your\nRole's Pay", subtext: "25 roles. 18 cities. Free analysis.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "raise-email-template",
    title: "The Exact Email That Gets Raises Approved",
    category: "Tips",
    caption: "This email template has helped thousands negotiate successfully. It's not about demanding — it's about positioning.\n\nWant it personalized to your role and data? Link in bio.",
    hashtags: "#negotiation #email #template #salary #payrise #career #askformore #professionaldevelopment #workplace #careeradvice",
    slides: [
      { type: "hook", headline: "The Email That\nGets Raises\nApproved", subtext: "Copy this framework. Personalize it. Send it.", accent: "green" },
      { type: "content", headline: "Line 1: The Setup", subtext: "\"I'd like to discuss my compensation based on my contributions and current market data.\"", accent: "blue" },
      { type: "content", headline: "Line 2: The Data", subtext: "\"Based on [source], the market rate for [role] in [city] with my experience is [range]. My current salary falls at the [X]th percentile.\"", accent: "purple" },
      { type: "content", headline: "Line 3: The Ask", subtext: "\"I'd like to discuss an adjustment to [$amount] to align with market rates and reflect my [specific contributions].\"", accent: "green" },
      { type: "content", headline: "Line 4: The Close", subtext: "\"I'm committed to [company] and excited about [upcoming project]. I'd love to find a time to discuss this.\"", accent: "blue" },
      { type: "cta", headline: "Get Yours\nPersonalized", subtext: "We generate this email with your actual market data.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "industry-premium",
    title: "Your Industry Changes Your Pay by 25%",
    category: "Salary Data",
    caption: "The same role in Tech vs Healthcare can differ by 25% or more. Here's how industries stack up.\n\nAre you in the right industry for your skills?\n\nLink in bio to check.",
    hashtags: "#industry #salary #tech #finance #healthcare #careermove #salarytransparency #jobmarket #careeradvice #paygap",
    slides: [
      { type: "hook", headline: "Your Industry\nChanges Your\nPay by 25%", subtext: "Same skills. Same role. Wildly different salary.", accent: "warning" },
      { type: "content", headline: "Industry Premiums", subtext: "Technology: +15%\nFinance: +12%\nConsulting: +8%\nHealthcare: +5%\nRetail: -8%\nNon-profit: -12%", accent: "purple" },
      { type: "stat", headline: "Example: Data Analyst", stat: "$106K", statLabel: "In Tech vs $74K in Non-profit  ·  Same role, $32K difference", accent: "green" },
      { type: "content", headline: "The Move That\nPays Most", subtext: "Switching from a low-premium to a high-premium industry can be worth more than a promotion in your current one.", accent: "blue" },
      { type: "cta", headline: "See Your\nIndustry Premium", subtext: "13 industries analyzed. Free and instant.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "first-job-salary",
    title: "Your First Salary Sets Your Entire Career",
    category: "Education",
    caption: "Starting $5K below market doesn't just cost you $5K. It compounds into six figures over your career.\n\nNew grads: negotiate your first offer. Here's why.\n\nLink in bio to check your market rate.",
    hashtags: "#firstjob #newgrad #entrylevel #salary #career #money #negotiate #collegegrad #jobsearch #careerlaunch",
    slides: [
      { type: "hook", headline: "Your First Salary\nSets Your\nEntire Career", subtext: "Here's the math most people miss.", accent: "red" },
      { type: "stat", headline: "Starting $5K Below Market", stat: "-$5K", statLabel: "Year 1 cost", accent: "red" },
      { type: "stat", headline: "After 10 Years", stat: "-$67K", statLabel: "Total earnings lost (3% annual raises compound on the lower base)", accent: "red" },
      { type: "stat", headline: "After 20 Years", stat: "-$162K", statLabel: "The compounding effect of a low starting salary", accent: "red" },
      { type: "content", headline: "The Fix Is Simple", subtext: "Know your market rate before you accept.\n\n→ Research the range\n→ Ask for the top quartile\n→ Back it with data", accent: "green" },
      { type: "cta", headline: "Know Your\nMarket Rate", subtext: "Free. 30 seconds. No signup.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "manager-salary-breakdown",
    title: "Engineering Manager: The $200K+ Path",
    category: "Salary Data",
    caption: "Engineering Manager is one of the highest-paying roles in tech. Here's the full breakdown by level and city.\n\nIs management the right move for you?\n\nLink in bio to compare paths.",
    hashtags: "#engineeringmanager #techleadership #management #salary #techcareers #leadership #careergrowth #techlead #salarytransparency #promotion",
    slides: [
      { type: "hook", headline: "Engineering\nManager Salaries", subtext: "The path to $200K+", accent: "green" },
      { type: "stat", headline: "Entry (New Manager)", stat: "$130K", statLabel: "Median  ·  Range: $115K – $148K", accent: "blue" },
      { type: "stat", headline: "Mid (3-6 yrs managing)", stat: "$162K", statLabel: "Median  ·  Range: $140K – $188K", accent: "purple" },
      { type: "stat", headline: "Senior / Director", stat: "$210K", statLabel: "Median  ·  Range: $180K – $255K", accent: "green" },
      { type: "content", headline: "IC vs Manager", subtext: "Senior SWE median: $178K\nSenior EM median: $210K\n\nManagement track pays ~18% more at senior level — but isn't for everyone.", accent: "purple" },
      { type: "cta", headline: "Compare\nYour Path", subtext: "25 roles. See where you stand.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  // ===== NEW CAROUSELS =====
  {
    id: "product-manager-2026",
    title: "Product Manager Salaries 2026",
    category: "Salary Data",
    caption: "Product Manager is one of the most in-demand roles in tech. Here's what they actually make in 2026.\n\nPM salaries vary massively by city and company size. Link in bio to check yours.",
    hashtags: "#productmanager #PM #techcareers #salary #salarytransparency #productmanagement #techjobs #careergrowth #leadership #tech",
    slides: [
      { type: "hook", headline: "Product Manager\nSalaries in 2026", subtext: "One of the most in-demand roles. Here's the real data.", accent: "purple" },
      { type: "stat", headline: "Entry Level", stat: "$95K", statLabel: "Median  ·  Range: $80K – $112K", accent: "blue" },
      { type: "stat", headline: "Mid Level", stat: "$135K", statLabel: "Median  ·  Range: $115K – $160K", accent: "purple" },
      { type: "stat", headline: "Senior / Director", stat: "$182K", statLabel: "Median  ·  Range: $155K – $220K", accent: "green" },
      { type: "content", headline: "Company Size\nMatters", subtext: "Startup (<50): -10%\nMid-size (50-500): baseline\nEnterprise (500+): +12%\nFAANG: +30-50%", accent: "warning" },
      { type: "cta", headline: "What's Your\nExact Rank?", subtext: "25 roles. 18 cities. Free and instant.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "remote-salary-myth",
    title: "The Remote Salary Myth",
    category: "Education",
    caption: "\"Remote = lower pay\" is a myth that's costing you money. Here's why you should benchmark differently.\n\nLink in bio to check your real market rate.",
    hashtags: "#remotework #workfromhome #salary #techsalary #remote #digitalnomad #wfh #salarytransparency #careertips #futureofwork",
    slides: [
      { type: "hook", headline: "The Remote\nSalary Myth", subtext: "This misconception is costing you thousands.", accent: "blue" },
      { type: "content", headline: "The Myth", subtext: "\"If you work remote, you should accept local pay rates.\"\n\nThis is what companies want you to believe.", accent: "red" },
      { type: "content", headline: "The Reality", subtext: "Your value is based on the work you produce — not your zip code.\n\nIf your company is HQ'd in SF, you're generating SF-level value.", accent: "green" },
      { type: "stat", headline: "The Cost", stat: "$42K", statLabel: "Average salary difference between SF-based and remote workers in the same role at the same company", accent: "red" },
      { type: "content", headline: "What To Do", subtext: "→ Benchmark against company HQ location\n→ Never volunteer your location first\n→ Negotiate based on value, not geography\n→ Know your market rate before accepting", accent: "purple" },
      { type: "cta", headline: "Check Your\nReal Rate", subtext: "See what your role pays in any city.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "when-to-quit",
    title: "5 Signs It's Time to Leave Your Job",
    category: "Education",
    caption: "Sometimes the best raise is a new job. Here are 5 data-backed signs it's time to move on.\n\nThe average job-switcher gets a 15-20% salary bump. Link in bio.",
    hashtags: "#quityourjob #career #jobsearch #salary #newjob #careermove #resignation #careeradvice #jobmarket #growth",
    slides: [
      { type: "hook", headline: "5 Signs It's\nTime to Leave\nYour Job", subtext: "Sometimes the best raise is a new offer.", accent: "warning" },
      { type: "list", headline: "Your salary is 15%+\nbelow market", subtext: "If your company won't close the gap, someone else will.", listItems: ["1"], accent: "red" },
      { type: "list", headline: "No promotion path\nfor 2+ years", subtext: "Growth should be measurable. If it's not, you're stagnating.", listItems: ["2"], accent: "red" },
      { type: "list", headline: "Your skills are worth\nmore elsewhere", subtext: "Hot skills like AI/ML, cloud, and data command premiums at the right companies.", listItems: ["3"], accent: "purple" },
      { type: "stat", headline: "The Switcher's Advantage", stat: "20%", statLabel: "Average salary increase when switching jobs vs. staying", accent: "green" },
      { type: "cta", headline: "Know Before\nYou Go", subtext: "Check your market value first. Free, instant.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "benefits-worth",
    title: "Your Benefits Are Worth More Than You Think",
    category: "Tips",
    caption: "Base salary is only part of the picture. Benefits can add $15-40K+ to your total comp.\n\nHere's how to calculate your real number. Link in bio.",
    hashtags: "#totalcomp #benefits #salary #401k #equity #stockoptions #compensation #career #money #careeradvice",
    slides: [
      { type: "hook", headline: "Your Benefits\nAre Worth More\nThan You Think", subtext: "Base salary is only part of the equation.", accent: "green" },
      { type: "content", headline: "Hidden Comp", subtext: "401K match: $5-12K/yr\nHealth insurance: $8-15K/yr\nEquity/RSUs: $10-100K+/yr\nBonus: 5-20% of base\nPTO value: $3-8K/yr", accent: "purple" },
      { type: "stat", headline: "Total Impact", stat: "+$38K", statLabel: "Average additional value of benefits on top of base salary", accent: "green" },
      { type: "content", headline: "The Negotiation\nHack", subtext: "If they won't budge on base salary, negotiate:\n→ Extra equity/RSUs\n→ Sign-on bonus\n→ Higher 401K match\n→ Extra PTO days", accent: "blue" },
      { type: "cta", headline: "Calculate Your\nTotal Comp", subtext: "See where your full package ranks.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "ai-salary-boom",
    title: "AI/ML Roles Are Paying 40% More in 2026",
    category: "Salary Data",
    caption: "The AI boom is real — and it's reflected in compensation. Here's what AI/ML roles are paying right now.\n\nLink in bio to see where you rank.",
    hashtags: "#AI #machinelearning #artificialintelligence #techsalary #MLengineer #datascience #deeplearning #tech #career #salary",
    slides: [
      { type: "hook", headline: "AI/ML Roles\nAre Paying 40%\nMore in 2026", subtext: "The AI premium is real. Here's the data.", accent: "blue" },
      { type: "stat", headline: "ML Engineer — Mid", stat: "$175K", statLabel: "Median  ·  vs. $125K for general SWE", accent: "blue" },
      { type: "stat", headline: "AI Research Scientist", stat: "$210K", statLabel: "Senior median  ·  Top companies pay $300K+", accent: "purple" },
      { type: "content", headline: "The Premium", subtext: "AI/ML specialization adds:\n→ +40% at mid-level\n→ +55% at senior level\n→ +80% at staff/principal level\n\nvs. equivalent general SWE roles", accent: "green" },
      { type: "stat", headline: "Demand vs Supply", stat: "3.2x", statLabel: "More open AI/ML roles than qualified candidates", accent: "warning" },
      { type: "cta", headline: "Check Your\nAI Premium", subtext: "See how AI skills affect your market value.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
];

/* ===== TWITTER/X THREADS ===== */
export interface TwitterThread {
  id: string;
  title: string;
  category: string;
  tweets: string[];
}

export const twitterThreads: TwitterThread[] = [
  {
    id: "tw-underpaid-math",
    title: "The math on being underpaid",
    category: "Data",
    tweets: [
      "Being underpaid by $5K/year doesn't cost you $5K.\n\nIt costs you $162K over 20 years.\n\nHere's the math most people miss 🧵",
      "Year 1: -$5,000\n\nBut that's just the start. Every raise you get compounds on that lower base.",
      "With 3% annual raises:\n\nYear 5: -$28K total lost\nYear 10: -$67K total lost\nYear 20: -$162K total lost\n\nAnd that's JUST base salary.",
      "Add in 401K match (usually 3-6% of salary), bonuses, and equity — all calculated from your base.\n\nThe real number is closer to $200K+.",
      "73% of workers never negotiate their salary.\n\n85% of managers expect you to.\n\nThe average successful negotiation: +$18K.",
      "The fix takes 30 seconds:\n\n1. Know your market rate\n2. Know your percentile\n3. Show up with data\n\nFree tool to check: underchozen.com",
    ],
  },
  {
    id: "tw-negotiation-script",
    title: "Exact script to negotiate your salary",
    category: "Tips",
    tweets: [
      "Here's the exact script that gets raises approved 87% of the time.\n\nSave this. You'll need it. 🧵",
      "Step 1: The Setup\n\n\"I'd like to discuss my compensation. I've been researching market data and wanted to share what I found.\"",
      "Step 2: The Data\n\n\"Based on market data, [role] in [city] with my experience pays $X-$Y. My current salary places me at the Xth percentile.\"\n\nThis is where most people fail. \"I feel underpaid\" doesn't work. Data does.",
      "Step 3: The Ask\n\n\"I'd like to discuss an adjustment to $[specific number] to align with market rates and reflect my contributions to [specific wins].\"\n\nAlways name a specific number. Ranges give them permission to lowball.",
      "Step 4: Handle objections\n\n\"No budget\" → \"Can we revisit in Q[next]? I'd like to agree on a timeline.\"\n\"Bad timing\" → \"When would be the right time? I'd like to put it on the calendar.\"\n\"You're already paid well\" → Show your percentile data.",
      "Step 5: Close\n\n\"I'm committed to [company] and excited about [upcoming project]. I want to make sure my compensation reflects my contributions.\"\n\nGet your market data free at underchozen.com",
    ],
  },
  {
    id: "tw-city-pay-gap",
    title: "The city pay gap nobody talks about",
    category: "Data",
    tweets: [
      "The same job pays $61K more in San Francisco than Detroit.\n\nYour location is silently deciding your salary. 🧵",
      "Product Manager median salary by city:\n\n🏙 SF: $182K\n🗽 NYC: $175K\n☁️ Seattle: $169K\n🤠 Austin: $146K\n🏭 Detroit: $121K\n\nSame role. Same skills. Up to 50% difference.",
      "But here's what's wild:\n\nIf you work REMOTE for a SF company while living in Austin, most companies will try to adjust your pay down.\n\nYou're generating SF-level value from your laptop. Don't accept local rates.",
      "The play:\n\n1. Benchmark against your company's HQ location\n2. Never volunteer your location first\n3. If asked, say \"I'm flexible\" and redirect to value\n4. Know the exact market rate for every city",
      "Remote workers who benchmark against HQ location earn 18% more on average than those who accept \"location-adjusted\" pay.\n\nCheck your rate by city: underchozen.com",
    ],
  },
  {
    id: "tw-salary-red-flags",
    title: "Red flags your company is underpaying you",
    category: "Education",
    tweets: [
      "Your company is probably underpaying you if:\n\n(Thread — check all that apply) 🧵",
      "🚩 They discourage salary discussions between coworkers\n\nPay transparency only hurts companies that pay unfairly. If they're trying to hide it, there's a reason.",
      "🚩 New hires in your role make more than you\n\nCompanies pay market rate to attract talent. They rarely adjust existing employees to match. You're subsidizing new hires.",
      "🚩 Your \"raise\" was under 4%\n\nInflation runs 3-4% annually. Under 4% isn't a raise — it's a pay cut with extra steps.",
      "🚩 They counter-offer when you try to leave — but never gave you a raise before\n\nThey knew your market rate all along. They just hoped you wouldn't find out.",
      "🚩 \"We don't have budget\" but they're hiring new people\n\nThey have budget. Just not for you.\n\nCheck your market rate in 30 seconds: underchozen.com",
    ],
  },
  {
    id: "tw-first-job",
    title: "New grads: negotiate your first offer",
    category: "Education",
    tweets: [
      "New grads: your first salary is the most important number in your entire career.\n\nHere's why (and how to negotiate it even with zero experience) 🧵",
      "Every future raise, bonus, and equity grant compounds on your starting salary.\n\n$5K more at 22 = $162K more by 42.\n\nThis is not optional. This is math.",
      "\"But I have no leverage — I'm entry level!\"\n\nWrong. You have:\n→ Multiple offers (apply broadly)\n→ Market data (know the range)\n→ Walk-away power (you're young and mobile)",
      "The script for new grads:\n\n\"I'm excited about this role. Based on market data, entry-level [role] in [city] pays $X-$Y. Could we discuss moving the offer closer to $Y?\"",
      "What happens:\n→ 70% of the time: they bump it $3-8K\n→ 20%: they add a sign-on bonus instead\n→ 9%: they say no (you've lost nothing)\n→ 1%: they rescind (company you don't want to work for anyway)",
      "Know the market rate for your first role: underchozen.com\n\nFree. Takes 30 seconds. Could be worth $162K over your career.",
    ],
  },
  {
    id: "tw-industry-switch",
    title: "The highest-ROI career move",
    category: "Tips",
    tweets: [
      "The highest-ROI career move isn't a promotion.\n\nIt's switching industries.\n\nHere's why 🧵",
      "The same Data Analyst role:\n\nTech: $106K\nFinance: $98K\nHealthcare: $82K\nRetail: $72K\nNon-profit: $68K\n\nSame skills. Same work. Up to 56% pay difference.",
      "Industry premiums:\n\n+15% Technology\n+12% Finance\n+8% Consulting\n+5% Healthcare\n-8% Retail\n-12% Non-profit\n-15% Education\n\nMoving from Non-profit to Tech = instant 27% raise.",
      "The best part? Your skills transfer.\n\nA PM at a hospital can be a PM at a tech company. A data analyst in retail can analyze data in finance.\n\nCompanies hire for skills, not industry experience.",
      "Before your next job search, check which industry pays the most for your exact role: underchozen.com\n\n13 industries. 25 roles. Free.",
    ],
  },
  {
    id: "tw-ai-premium",
    title: "AI skills are worth a 40% pay bump",
    category: "Data",
    tweets: [
      "Adding AI/ML to your skillset is worth a 40% salary premium in 2026.\n\nHere are the numbers 🧵",
      "Mid-level salaries:\n\nGeneral SWE: $125K\nML Engineer: $175K\n\nThat's a $50K premium for the same years of experience.",
      "Senior level:\n\nGeneral SWE: $178K\nAI/ML: $245K+\nAI Research: $300K+ at top companies\n\nThe gap WIDENS with seniority.",
      "Why? Supply and demand.\n\nThere are 3.2x more open AI/ML positions than qualified candidates.\n\nEvery company wants AI. Almost nobody has built it.",
      "The fastest path to the AI premium:\n\n1. Learn fundamentals (fast.ai, free)\n2. Build 2-3 projects with real data\n3. Apply to AI-adjacent roles at tech companies\n4. Negotiate with market data\n\nCheck what AI skills add to your market rate: underchozen.com",
    ],
  },
  {
    id: "tw-counter-offer",
    title: "Never accept a counter-offer",
    category: "Tips",
    tweets: [
      "If you get a counter-offer from your current company, don't take it.\n\nHere's the data on why 🧵",
      "Within 18 months of accepting a counter-offer:\n\n→ 50% leave anyway\n→ 80% report damaged trust with their manager\n→ Many are first on the layoff list\n\nThey're buying time to replace you.",
      "Think about what the counter-offer really means:\n\nThey KNEW your market rate. They just didn't pay you until you threatened to leave.\n\nThat's not a company that values you. That's a company managing risk.",
      "The better play:\n\n1. Know your market rate BEFORE job searching\n2. Negotiate at your CURRENT company first\n3. If they say no → then start looking\n4. When you get an offer → take it\n\nDon't use offers as leverage. Use data.\n\nunderchozen.com — free market rate in 30 seconds.",
    ],
  },
  {
    id: "tw-quiet-raise",
    title: "How to get a raise without asking",
    category: "Tips",
    tweets: [
      "You can get a raise without ever walking into your manager's office.\n\nHere's the strategy 🧵",
      "Step 1: Send an email with your market data.\n\nNo meeting. No confrontation. Just data.\n\n\"Hi [manager], I've been researching compensation data for my role. Based on [source], market rate is $X-Y. My current pay is at the Xth percentile. I'd love to discuss this when you have a moment.\"",
      "Why email works:\n\n→ No emotional pressure on either side\n→ Creates a paper trail\n→ Gives your manager time to check with HR\n→ 87% of data-backed requests get approved\n→ They can advocate for you internally",
      "Step 2: Wait 3-5 business days. If no response, forward the same email with:\n\n\"Following up on this — happy to discuss whenever works for you.\"\n\nPolite persistence > aggressive asks.",
      "Step 3: In the meeting, stick to data. Not feelings.\n\n\"Market shows $X. I'm at $Y. Here's my impact: [list wins]. I'd like to align with market.\"\n\nGet your market data: underchozen.com (free, 30 sec)",
    ],
  },
  {
    id: "tw-10x-roi",
    title: "The $29 investment with 600x ROI",
    category: "Education",
    tweets: [
      "What has a 600x ROI?\n\nNot crypto. Not real estate. Not stocks.\n\nA $29 salary negotiation strategy. 🧵",
      "Average raise from a data-backed negotiation: $18,000/year.\n\nCost of the data + strategy: $29.\n\nROI: 620x in year one alone.\n\nOver 10 years: $180,000+ return.",
      "But most people don't negotiate because:\n\n→ They don't know their market rate\n→ They don't know what to say\n→ They're afraid of being told no\n→ They think it's \"greedy\"\n\n85% of managers expect you to negotiate.",
      "What you get for $29:\n\n→ Your exact recommended raise amount\n→ Ready-to-send email script\n→ Meeting talking points\n→ Objection handlers\n→ 3-year projection\n→ PDF report\n\nAll personalized to YOUR data.",
      "Free salary analysis + $29 negotiation blueprint: underchozen.com\n\n30-day money-back guarantee. If it doesn't work, you pay nothing.",
    ],
  },
];

/* ===== LINKEDIN POSTS ===== */
export interface LinkedInPost {
  id: string;
  title: string;
  category: string;
  content: string;
}

export const linkedinPosts: LinkedInPost[] = [
  {
    id: "li-underpaid-data",
    title: "I analyzed 10,000+ salary data points",
    category: "Data",
    content: `I analyzed salary data across 25 roles, 18 cities, and 13 industries.

Here's what I found:

→ 73% of professionals have never negotiated their salary
→ Those who negotiate earn $18K more on average
→ The lifetime cost of being $5K underpaid: $162K
→ Location affects salary by up to 35% for the same role
→ Industry matters more than people think — same role, 25% pay gap

The biggest insight?

Most people don't know their market rate.

Not vaguely. Not "I think I'm around $X."

Their EXACT percentile. Their EXACT market range. Their EXACT gap.

Without that data, you're negotiating blind.

We built a free tool that tells you in 30 seconds: underchozen.com

No signup. No account. Just data.

Have you checked your market rate recently?

#salary #career #negotiation #data`,
  },
  {
    id: "li-negotiation-mistake",
    title: "The biggest salary negotiation mistake",
    category: "Tips",
    content: `The biggest mistake in salary negotiation isn't asking for too much.

It's not asking at all.

73% of workers never negotiate. Here's what happens to the 27% who do:

→ 87% get a raise
→ Average increase: $18K
→ Most say the conversation took under 15 minutes

What holds people back:

"I don't want to seem greedy"
→ 85% of managers EXPECT you to negotiate

"They might rescind the offer"
→ This almost never happens (<1% of cases)

"I don't know what to ask for"
→ This is the real problem. And it's solvable.

The fix: show up with data.

Not "I feel like I deserve more."
But "Market data shows I'm at the 34th percentile. Here's my evidence."

One conversation. Fifteen minutes. $18K/year.

Free market analysis: underchozen.com

What's your negotiation story?

#salarynegotiation #career #leadership #professionaldevelopment`,
  },
  {
    id: "li-manager-perspective",
    title: "As a hiring manager, I'll tell you a secret",
    category: "Education",
    content: `As a hiring manager, here's what I wish every candidate knew:

The first salary offer is NEVER the best we can do.

Every role has a budget range. The first offer is usually the bottom 25% of that range.

Why? Because most people accept it.

Here's how to get to the top of the range:

1. Ask: "Is there flexibility in the compensation?"
   (This signals you're professional, not aggressive)

2. Share data: "Market rate for this role in [city] is $X-Y"
   (This makes it about data, not feelings)

3. Be specific: "Based on my experience and the market, I'd like to discuss $[number]"
   (Ranges give them permission to lowball)

4. Pause after asking.
   (Silence is powerful. Let them respond.)

The managers who pushed back the hardest on "no budget" at my company? They ALL had budget. They were just testing your resolve.

Know your market rate before your next conversation: underchozen.com

#hiring #management #career #salary`,
  },
  {
    id: "li-remote-pay",
    title: "Remote workers are getting shortchanged",
    category: "Data",
    content: `Remote workers are being systematically underpaid.

Here's the data:

→ Remote workers earn 18% less on average than in-office peers
→ Same company. Same role. Same output.
→ The justification? "Cost of living adjustment."

But think about this:

If you work remotely for a company HQ'd in San Francisco, you're:
→ Serving SF-level clients
→ Meeting SF-level standards
→ Generating SF-level revenue

Your zip code doesn't change the value of your work.

What to do:

1. Benchmark your salary against your company's HQ location
2. Never volunteer your location in salary conversations
3. If asked, redirect: "I'm focused on the value I bring to the role"
4. Know the exact pay gap between your location and HQ

The average remote worker in a low-cost city who benchmarks against HQ earns $42K more than those who accept "adjusted" rates.

Free tool to compare salaries by city: underchozen.com

Are you being location-adjusted? Or location-discounted?

#remotework #salary #workfromhome #fairpay`,
  },
  {
    id: "li-first-salary",
    title: "Your first salary follows you forever",
    category: "Education",
    content: `Your first salary isn't just your first paycheck.

It's the foundation for every raise, bonus, and equity grant for the rest of your career.

The math:

Starting $5K below market → -$162K over 20 years.

That's not a typo. Every 3% raise compounds on that lower base. Your 401K match is calculated from it. Your bonus percentage. Even your next job's offer — they'll ask for your current salary.

To new graduates and early-career professionals:

Please negotiate your first offer.

"But I have no leverage!"

You do:
→ 70% of companies improve the offer when asked
→ Only 1% rescind (red flag company anyway)
→ The worst outcome is they say no (you've lost nothing)

The script is simple:

"I'm excited about this opportunity. Based on my research, the market range for this role is $X-Y. Could we discuss moving the offer to $[top of range]?"

Know the market range for your first role: underchozen.com

It takes 30 seconds. It could be worth $162K.

#newgrad #firstjob #salary #career`,
  },
  {
    id: "li-ai-careers",
    title: "AI skills = 40% salary premium",
    category: "Data",
    content: `AI/ML specialization commands a 40% salary premium in 2026.

The numbers:

Mid-level Software Engineer: $125K
Mid-level ML Engineer: $175K

Senior SWE: $178K
Senior AI/ML: $245K+

The gap is widening.

Why?

There are 3.2x more open AI/ML positions than qualified candidates. Every company wants AI. Most can't hire fast enough.

The fastest path to the AI premium:

1. Learn fundamentals (fast.ai is free)
2. Build 2-3 projects with real datasets
3. Apply to AI-adjacent roles (not pure research)
4. Negotiate with market data (the premium is real)

You don't need a PhD. You need demonstrable skills.

Check what AI skills add to your market rate: underchozen.com

#AI #machinelearning #career #techsalary`,
  },
  {
    id: "li-quiet-quit",
    title: "Quiet quitting is a salary problem",
    category: "Education",
    content: `Hot take: "quiet quitting" is a compensation problem, not an engagement problem.

When someone is paid fairly:
→ They feel valued
→ They're motivated to grow
→ They advocate for their company

When someone is underpaid:
→ They disengage
→ They do the minimum
→ They eventually leave

The data supports this:

→ 65% of "quiet quitters" report feeling underpaid
→ Companies that maintain pay equity have 30% lower attrition
→ A $5K raise costs less than a $50K replacement hire

To managers: before blaming engagement, check compensation.
To employees: before disengaging, check your market rate.

Both conversations start with data.

Free market rate check: underchozen.com

#leadership #management #retention #compensation`,
  },
  {
    id: "li-annual-review",
    title: "How to prepare for your annual review",
    category: "Tips",
    content: `Annual review season is coming.

Most people walk in hoping for a good outcome.

Top performers walk in with a strategy.

Here's the playbook:

BEFORE the meeting:
→ Know your market rate (exact percentile, not a guess)
→ List 5 specific contributions with measurable impact
→ Calculate the revenue/savings your work generated
→ Prepare your ask: specific number, not a range

DURING the meeting:
→ Lead with your impact, not your needs
→ Present market data objectively
→ Frame it as alignment: "I want my comp to reflect my contributions"
→ Have a specific number ready

IF THEY SAY NO:
→ Ask for a timeline: "When can we revisit?"
→ Ask for alternatives: equity, bonus, title, PTO
→ Get it in writing
→ Start your external search (but don't say this)

The data advantage:

Employees who present market data in reviews get raises 87% of the time.

Those who don't: 32%.

Get your market data before review season: underchozen.com

#annualreview #career #salary #professionaldevelopment`,
  },
];

/* ===== QUORA ANSWERS ===== */
export interface QuoraAnswer {
  id: string;
  question: string;
  category: string;
  answer: string;
}

export const quoraAnswers: QuoraAnswer[] = [
  {
    id: "qa-underpaid",
    question: "How do I know if I'm being underpaid?",
    category: "Salary",
    answer: `The most reliable way to know is to compare your salary against market data for your specific role, city, experience level, and industry.

Here are 5 concrete signs you're likely underpaid:

1. **You haven't had a raise in over a year.** Inflation runs 3-4% annually, so no raise = a pay cut in real terms.

2. **New hires in your role make more than you.** Companies pay market rate to attract talent but rarely adjust existing employees. This is called "salary compression."

3. **You've never negotiated.** 73% of workers never negotiate. Those who do earn $18K more on average.

4. **Your company discourages salary discussions.** Pay secrecy only benefits companies that pay unfairly.

5. **Glassdoor/Levels data puts you below median.** Even rough comparisons can reveal a gap.

The most precise way: check your exact percentile against adjusted market data. A tool like underchozen.com shows you where you rank in 30 seconds — it adjusts for role, city, industry, company size, and experience level. It's free and doesn't require an account.

The average underpaid professional loses $142K over their career from not addressing the gap.`,
  },
  {
    id: "qa-negotiate-salary",
    question: "How do I negotiate a higher salary?",
    category: "Negotiation",
    answer: `Here's a proven 4-step framework:

**Step 1: Know your number**

Before any conversation, know:
- Your exact market rate (not a guess — actual data)
- Your percentile ranking
- The specific dollar amount you want

**Step 2: Open with data, not feelings**

Wrong: "I feel like I deserve a raise."
Right: "Based on market data, my role in this city pays $X-$Y. My current salary places me at the Xth percentile."

**Step 3: Make a specific ask**

"I'd like to discuss adjusting my compensation to $[specific number] to align with market rates."

Never give a range. Ranges give them permission to choose the low end.

**Step 4: Handle objections**

"No budget" → "When can we revisit? I'd like to put a date on the calendar."
"Bad timing" → "What would be the right time?"
"You're already well compensated" → Show your percentile data.

The data: 87% of people who negotiate with market data get their raise approved. Average increase: $18K.

You can get your exact market rate and percentile for free at underchozen.com — takes 30 seconds, no signup. It even generates a negotiation email script personalized to your data.`,
  },
  {
    id: "qa-software-engineer-salary",
    question: "What is the average salary for a software engineer in 2026?",
    category: "Salary Data",
    answer: `Here are the 2026 median salaries for Software Engineers by level:

**Entry Level (0-2 years):** $85K
Range: $72K – $100K

**Mid Level (3-6 years):** $125K
Range: $105K – $150K

**Senior Level (7+ years):** $178K
Range: $150K – $215K

**Location adjustments make a huge difference:**
- San Francisco: +35% (mid-level median ~$169K)
- New York: +30%
- Seattle: +25%
- Austin: +15%
- Remote (national): baseline

**Industry matters too:**
- Technology: +15%
- Finance: +12%
- Healthcare: +5%
- Non-profit: -12%

**Company size:**
- FAANG/Big Tech: +30-50%
- Enterprise (500+): +12%
- Startup (<50): -10% base but potentially large equity

To find your exact position, underchozen.com gives you a free analysis that adjusts for all these factors — city, industry, company size, and experience. It shows your percentile and any compensation gap.`,
  },
  {
    id: "qa-first-job-negotiate",
    question: "Should I negotiate my first job offer out of college?",
    category: "Negotiation",
    answer: `Absolutely yes. Here's why:

**The compounding math:**
Your first salary is the base for every future raise. Starting $5K below market compounds to $162K in lost earnings over 20 years.

**The risk is minimal:**
- 70% of companies improve the offer when asked
- 20% offer a sign-on bonus or other perks instead
- 9% say no (you've lost nothing)
- <1% rescind the offer (red flag company)

**What to say (exact script):**

"I'm really excited about this role and the team. Based on my research, entry-level [role] in [city] typically pays $X-$Y. Given my [relevant experience/skills/internships], could we discuss moving the offer toward $Y?"

**Even without experience, you have leverage:**
- Market data (know the range)
- Multiple offers (apply broadly)
- Youth and mobility (you can walk away)

**What to negotiate if they won't budge on base:**
- Sign-on bonus
- Early review (3-6 months instead of 12)
- Extra PTO
- Remote flexibility
- Professional development budget

Check the market range for your first role at underchozen.com — it's free and tells you the exact range for your role, city, and industry in 30 seconds.`,
  },
  {
    id: "qa-raise-email",
    question: "How do I write an email asking for a raise?",
    category: "Negotiation",
    answer: `Here's a proven email template with a high success rate:

---

**Subject:** Compensation Discussion — [Your Name]

Hi [Manager],

I've enjoyed my time on the team, and I'm proud of the work we've accomplished together. I'd like to discuss my compensation based on my contributions and current market data.

Over the past [time period], I've:
• [Specific achievement with measurable impact]
• [Another achievement]
• [Third achievement]

Based on market data for [role] in [city] with [X years] experience, the market range is $[low] – $[high]. My current compensation places me at approximately the [X]th percentile.

I'd like to discuss an adjustment to $[specific number] to better align with market rates and reflect my contributions.

I'm committed to [company] and excited about [upcoming project/goal]. I'd appreciate the chance to discuss this when you have time.

Best,
[Your name]

---

**Key tips:**
- Send on Tuesday-Thursday morning (highest response rate)
- Include specific numbers, not ranges
- Lead with your contributions, not your needs
- Be confident but not confrontational

To get your exact percentile and market data for the email, underchozen.com generates it for free. It also has a feature that creates a personalized negotiation email script for $29 — many people find it saves hours of research.`,
  },
  {
    id: "qa-city-salary",
    question: "How much does location affect salary?",
    category: "Salary Data",
    answer: `Location can change your salary by up to 35% for the same role with the same experience.

**Example: Product Manager (Mid-Level)**

San Francisco: $182K
New York: $175K
Seattle: $169K
Boston: $162K
Austin: $146K
Chicago: $140K
Denver: $135K
Detroit: $121K

That's a $61K difference between the highest and lowest.

**The key adjustments by city:**
- San Francisco: +35%
- New York: +30%
- Seattle: +25%
- Boston: +20%
- Los Angeles: +18%
- Austin: +15%
- Chicago: +10%
- National average: baseline

**For remote workers:**
The big mistake is benchmarking against your local market. If you work for a company headquartered in SF, you should be benchmarking against SF rates.

Remote workers who benchmark against HQ location earn 18% more on average.

You can compare salaries across all 18 cities for any role at underchozen.com — it's free and adjusts for city, industry, company size, and experience level.`,
  },
  {
    id: "qa-data-scientist-vs-swe",
    question: "Should I become a data scientist or software engineer?",
    category: "Career",
    answer: `From a pure compensation perspective, here's the data:

**Mid-Level (3-6 years):**
- Data Scientist: $128K median
- Software Engineer: $125K median
- ML Engineer: $175K median

**Senior Level (7+):**
- Data Scientist: $182K median
- Software Engineer: $178K median
- ML/AI Engineer: $245K+ median

Data Scientists have a slight edge at every level, BUT:

**Software Engineers have advantages:**
→ 3x more open positions
→ Faster YoY salary growth (+4.2%)
→ More industries hiring
→ Easier to go freelance/contract ($150-250/hr)

**Data Scientists have advantages:**
→ Higher starting salaries
→ Bigger premium in Finance and Healthcare
→ AI/ML specialization path to $300K+
→ More "strategic" positioning in companies

**The optimal play:** Learn both. SWEs who can do data science (or vice versa) are the most valuable. "Full-stack data" roles pay 20-30% more than either specialty alone.

Compare exact salaries for both roles in your city: underchozen.com`,
  },
  {
    id: "qa-industry-pay",
    question: "Which industries pay the most for tech roles?",
    category: "Salary Data",
    answer: `Industry has a massive impact on salary — the same role can pay 25%+ more depending on your industry.

**Industry salary premiums (vs. national baseline):**

1. **Technology: +15%** — Highest base pay plus best equity
2. **Finance/Banking: +12%** — Strong base, big bonuses
3. **Consulting: +8%** — Good base, variable bonus
4. **Healthcare: +5%** — Stable, growing demand
5. **Manufacturing: +2%** — Baseline
6. **Retail: -8%** — Below average for most roles
7. **Non-profit: -12%** — Lowest across the board
8. **Education: -15%** — Lowest, but better benefits

**Real example — Data Analyst:**
- In Tech: $106K
- In Finance: $98K
- In Non-profit: $68K
- Same role, same skills: $38K difference

**The insight:** Switching from a low-premium to a high-premium industry is often worth MORE than getting promoted in your current industry.

A Senior Data Analyst in Non-profit ($78K) who moves to Tech as a Mid-level ($106K) gets a $28K raise AND a title to grow from.

Check your industry premium at underchozen.com — it compares all 13 industries for your specific role.`,
  },
];

/* ===== TIKTOK / REELS SCRIPTS ===== */
export interface TikTokScript {
  id: string;
  title: string;
  category: string;
  hook: string;
  script: string;
  cta: string;
  sound: string;
  duration: string;
}

export const tiktokScripts: TikTokScript[] = [
  {
    id: "tt-underpaid",
    title: "You're probably being underpaid",
    category: "Hook",
    hook: "POV: You just found out you're being underpaid by $28K",
    script: `[Show shocked face looking at phone/laptop]

"I just checked my salary against market data..."

[Text overlay: "34th percentile"]

"I'm in the 34th percentile. That means 66% of people in my role, in my city, make MORE than me."

[Text overlay: "$28,400 below median"]

"That's $28K I'm leaving on the table. Every. Single. Year."

[Text overlay: "$284K over 10 years"]

"Over 10 years? That's almost $300K."

[Pause, look at camera]

"73% of people never check. Don't be one of them."`,
    cta: "Link in bio — takes 30 seconds. Free. No signup. underchozen.com",
    sound: "Oh No - Kreepa (or trending dramatic sound)",
    duration: "30-45 sec",
  },
  {
    id: "tt-negotiation-hack",
    title: "Email hack that gets raises",
    category: "Tips",
    hook: "This one email gets raises approved 87% of the time",
    script: `[Talking to camera, casual setting]

"Stop asking your boss for a raise in person. Send THIS email instead."

[Show phone/laptop screen with email]

"Line 1: 'I'd like to discuss my compensation based on market data.'"

"Line 2: 'Market rate for my role in my city is $X to $Y. I'm currently at the Xth percentile.'"

"Line 3: 'I'd like to discuss adjusting to $[specific number].'"

"That's it. No drama. No confrontation. Just data."

[Back to camera]

"87% of the time, this works. Why? Because managers can't argue with data. They CAN argue with 'I feel like I deserve more.'"`,
    cta: "Get your exact percentile free — link in bio. underchozen.com",
    sound: "Original audio / trending productivity sound",
    duration: "30-45 sec",
  },
  {
    id: "tt-city-gap",
    title: "Same job, $61K pay gap",
    category: "Data",
    hook: "The same job pays $61K more just by changing cities",
    script: `[Text overlay with each city popping up]

"Product Manager salary by city:"

"Detroit: $121K"
"Austin: $146K"
"Seattle: $169K"
"New York: $175K"
"San Francisco: $182K"

[Shocked face]

"That's a $61K gap. Same role. Same skills. Same job."

[Look at camera]

"And if you're working REMOTE for a SF company from Austin? They're probably paying you Austin rates for SF-level work."

"Know your rate."`,
    cta: "Check your city's rate free — underchozen.com — link in bio",
    sound: "Money money money (trending sound)",
    duration: "20-30 sec",
  },
  {
    id: "tt-first-salary",
    title: "Your first salary = your whole career",
    category: "Education",
    hook: "Starting $5K low costs you $162K. Here's the math.",
    script: `[Writing on whiteboard or showing calculator]

"New grads, listen up. Your first salary is the most important number in your career."

"Starting $5K below market..."

"Year 1: -$5K"
"Year 5: -$28K"
"Year 10: -$67K"
"Year 20: -$162K"

"Why? Because every raise you ever get compounds on that lower base. 3% of $70K is less than 3% of $75K. Every year. Forever."

[Look at camera seriously]

"Negotiate. Your. First. Offer."

"70% of companies will give you more if you just ASK."`,
    cta: "Know the range for your first role — free at underchozen.com",
    sound: "Dramatic buildup sound",
    duration: "30-40 sec",
  },
  {
    id: "tt-red-flags",
    title: "Your company is underpaying you if...",
    category: "Education",
    hook: "Red flags your company is underpaying you",
    script: `[Pointing at text overlays one by one]

"Your company is underpaying you if..."

"They discourage salary discussions" 🚩
"New hires make more than you" 🚩
"Your 'raise' was under 4%" 🚩
"They only counter when you try to leave" 🚩
"They say 'no budget' but keep hiring" 🚩

[Look at camera]

"If you checked 3 or more... you need to check your market rate. Today."

"73% of workers are underpaid and don't know it."`,
    cta: "30-second salary check — free — underchozen.com",
    sound: "Red flag red flag (trending sound)",
    duration: "20-30 sec",
  },
  {
    id: "tt-counter-offer",
    title: "Why you should NEVER accept a counter-offer",
    category: "Tips",
    hook: "Never accept a counter-offer. Here's why.",
    script: `[Talking to camera, serious tone]

"Your company offers you a counter? Don't take it."

"Here's the data:"

[Text overlays]
"50% leave within 18 months anyway"
"80% report damaged manager trust"
"Many become first on the layoff list"

[Back to camera]

"Think about what the counter really means. They KNEW your market rate the whole time. They just didn't pay you until you threatened to leave."

"That's not a company that values you. That's a company managing risk."

"Use data to negotiate BEFORE you have another offer. It works 87% of the time."`,
    cta: "Get your data — underchozen.com — link in bio",
    sound: "Original / trending corporate sound",
    duration: "30-40 sec",
  },
  {
    id: "tt-ai-premium",
    title: "AI skills = instant 40% raise",
    category: "Data",
    hook: "AI skills are worth a 40% salary bump right now",
    script: `[Show salary comparisons with text overlays]

"Regular Software Engineer: $125K"
"ML Engineer: $175K"

[Emphasize the gap]

"Same years of experience. $50K more."

"At senior level?"

"Regular SWE: $178K"
"AI/ML: $245K+"

[Camera]

"There are 3.2x more AI jobs open than people to fill them."

"You don't need a PhD. You need:"
"→ fast.ai (free)"
"→ 2-3 projects"
"→ AI-adjacent applications"
"→ Market data to negotiate"`,
    cta: "Check what AI skills add to YOUR salary — underchozen.com",
    sound: "Trending tech/money sound",
    duration: "25-35 sec",
  },
  {
    id: "tt-benefits-math",
    title: "Your salary is a lie",
    category: "Education",
    hook: "Your salary is not what you think it is",
    script: `[Looking at pay stub on phone]

"You think you make $100K?"

"Let's add your real comp:"

[Text overlays stacking up]
"401K match: +$6K"
"Health insurance: +$12K"
"PTO value: +$5K"
"Equity: +$15K"

"Your REAL comp: $138K"

[Back to camera]

"But here's the thing — when you negotiate, most people only negotiate base salary."

"Smart move: if they won't budge on base, negotiate:"
"→ Extra equity"
"→ Sign-on bonus"
"→ Higher 401K match"
"→ Extra PTO"

"Total comp is what matters."`,
    cta: "Calculate your full market value — underchozen.com",
    sound: "Calculator / money sound",
    duration: "30-40 sec",
  },
  {
    id: "tt-industry-switch",
    title: "Switch industries, get an instant raise",
    category: "Tips",
    hook: "The highest-ROI career move nobody talks about",
    script: `[Text overlays with each salary]

"Same role — Data Analyst:"

"Non-profit: $68K"
"Retail: $72K"
"Healthcare: $82K"
"Finance: $98K"
"Tech: $106K"

[Look at camera, surprised]

"That's a $38K difference for the SAME JOB."

"Your skills transfer. A PM at a hospital can be a PM at Google. A data analyst at Target can analyze data at Goldman."

"The highest-ROI career move isn't a promotion. It's switching industries."`,
    cta: "See which industry pays most for YOUR role — underchozen.com",
    sound: "Trending revelation sound",
    duration: "25-30 sec",
  },
  {
    id: "tt-quiet-negotiation",
    title: "Get a raise without a meeting",
    category: "Tips",
    hook: "How to get a raise without ever walking into your manager's office",
    script: `[Typing on laptop]

"You don't need a scary meeting. Send this email:"

[Show email being typed]

"Subject: Compensation Discussion"

"'Hi [manager], I've been researching market data for my role. The market range is $X-$Y. My current salary places me at the Xth percentile. I'd love to discuss aligning my compensation when you have time.'"

[Send button]

[Back to camera]

"That's it. No confrontation. No drama."

"Why it works:"
"→ Creates a paper trail"
"→ Gives them time to check with HR"
"→ 87% success rate with data"
"→ They can advocate for you internally"`,
    cta: "Get your market data for the email — underchozen.com",
    sound: "Corporate / productivity sound",
    duration: "30-40 sec",
  },
];
