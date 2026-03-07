/**
 * Multi-platform social content library.
 * Instagram carousels, Twitter threads, LinkedIn posts, Quora answers, TikTok scripts & slideshows.
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
  {
    id: "salary-by-company-size",
    title: "How Company Size Affects Your Pay",
    category: "Salary Data",
    caption: "Startup vs enterprise — the pay gap is bigger than you think. Here's how company size impacts your salary.\n\nLink in bio for your personalized breakdown.",
    hashtags: "#salary #startup #enterprise #compensation #career #techsalary #jobmarket #careeradvice #payscale #money",
    slides: [
      { type: "hook", headline: "How Company Size\nAffects Your Pay", subtext: "The difference might shock you.", accent: "purple" },
      { type: "stat", headline: "Startup (< 50)", stat: "$95K", statLabel: "Median SWE salary · equity upside", accent: "warning" },
      { type: "stat", headline: "Mid-Market (200-1K)", stat: "$125K", statLabel: "Median SWE salary · balanced comp", accent: "blue" },
      { type: "stat", headline: "Enterprise (5K+)", stat: "$155K", statLabel: "Median SWE salary · top benefits", accent: "green" },
      { type: "content", headline: "The Trade-offs", subtext: "Startups: lower base, equity lottery\nMid-market: balanced, growth path\nEnterprise: highest base, slower promos\n\nTotal comp ≠ base salary", accent: "purple" },
      { type: "cta", headline: "See Your Market\nRate by Size", subtext: "Adjust for company size in your analysis.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "gender-pay-gap-data",
    title: "The Pay Gap Is Still Real in 2026",
    category: "Education",
    caption: "The data doesn't lie. Here's what the gender pay gap actually looks like across roles and levels.\n\nKnowledge is power. Check your market rate.\n\nLink in bio.",
    hashtags: "#paygap #salarytransparency #equalpay #career #salary #diversity #inclusion #workplaceequity #careergrowth #data",
    slides: [
      { type: "hook", headline: "The Pay Gap\nIs Still Real\nin 2026", subtext: "Here's what the data actually shows.", accent: "red" },
      { type: "stat", headline: "Overall Gap", stat: "16%", statLabel: "Women earn 84 cents per dollar on average", accent: "red" },
      { type: "stat", headline: "Same Role, Same Level", stat: "6-8%", statLabel: "Controlled gap · same title, same company size", accent: "warning" },
      { type: "content", headline: "How to Close It", subtext: "→ Know your market rate (data > feelings)\n→ Negotiate every offer (men do 4x more)\n→ Ask for the top of range, not mid\n→ Document your impact quarterly", accent: "green" },
      { type: "cta", headline: "Know Your\nTrue Market Value", subtext: "Gender-neutral data. Pure market rates.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "total-comp-breakdown",
    title: "Your Salary Is Only 60% of Your Comp",
    category: "Education",
    caption: "Base salary gets all the attention, but total compensation is what actually matters. Here's the full picture.\n\nLink in bio to calculate yours.",
    hashtags: "#totalcomp #salary #benefits #stockoptions #RSU #compensation #career #money #finance #careeradvice",
    slides: [
      { type: "hook", headline: "Your Salary Is\nOnly 60% of\nYour Comp", subtext: "Stop ignoring the other 40%.", accent: "green" },
      { type: "stat", headline: "Base Salary", stat: "60%", statLabel: "Of total compensation on average", accent: "blue" },
      { type: "content", headline: "The Other 40%", subtext: "→ Annual bonus (10-20%)\n→ Stock/RSUs (15-30% at big tech)\n→ 401K match (3-6%)\n→ Health insurance ($8-15K value)\n→ PTO days ($5-12K value)", accent: "green" },
      { type: "stat", headline: "Hidden Value", stat: "$35K", statLabel: "Average value of benefits most ignore", accent: "purple" },
      { type: "cta", headline: "Calculate Your\nTotal Comp", subtext: "See the full picture of your market value.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "job-hopping-premium",
    title: "Job Hoppers Earn 30% More After 5 Years",
    category: "Tips",
    caption: "Loyalty doesn't always pay. Here's the cold hard data on job hopping vs staying put.\n\nLink in bio to check if you're underpaid.",
    hashtags: "#jobhopping #career #salary #careeradvice #jobtips #hiring #resignation #newjob #careergrowth #money",
    slides: [
      { type: "hook", headline: "Job Hoppers Earn\n30% More After\n5 Years", subtext: "Loyalty tax is real. Here's the math.", accent: "green" },
      { type: "stat", headline: "Average Annual Raise", stat: "3.5%", statLabel: "For staying at the same company", accent: "warning" },
      { type: "stat", headline: "Average Job-Hop Raise", stat: "15-25%", statLabel: "When switching companies every 2-3 years", accent: "green" },
      { type: "content", headline: "The Sweet Spot", subtext: "→ Stay 2-3 years per role (minimum)\n→ Leave when growth stalls\n→ Each hop = negotiation leverage\n→ After 5 years: $30-50K more", accent: "blue" },
      { type: "cta", headline: "Are You Being\nUnderpaid?", subtext: "Check if your salary matches the market.", ctaText: "underchozen.com", accent: "purple" },
    ],
  },
  {
    id: "recession-proof-salary",
    title: "How to Recession-Proof Your Salary",
    category: "Tips",
    caption: "Economic uncertainty is rising. Here's how to protect your earning power no matter what happens.\n\nLink in bio for your market analysis.",
    hashtags: "#recession #career #salary #jobsecurity #careeradvice #economy #skills #upskilling #careergrowth #money",
    slides: [
      { type: "hook", headline: "How to\nRecession-Proof\nYour Salary", subtext: "3 strategies that work in any economy.", accent: "blue" },
      { type: "content", headline: "1. Know Your\nMarket Value", subtext: "You can't negotiate what you don't know.\nCheck market rates quarterly.\nData makes you un-lowball-able.", accent: "blue" },
      { type: "content", headline: "2. Stack High-Demand\nSkills", subtext: "AI/ML: +40% premium\nCloud/DevOps: +25% premium\nData Engineering: +30% premium\n\nRecession-resistant = in-demand.", accent: "green" },
      { type: "content", headline: "3. Build Your\nNegotiation Muscle", subtext: "Practice before you need it.\nDocument impact metrics now.\nHave a number ready always.", accent: "purple" },
      { type: "cta", headline: "Check Your\nMarket Position", subtext: "Free analysis. Know where you stand.", ctaText: "underchozen.com", accent: "purple" },
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
  {
    id: "tw-total-comp",
    title: "Your base salary is a distraction",
    category: "Education",
    tweets: [
      "Your base salary is a distraction.\n\nHere's what actually determines your wealth at work: 🧵",
      "Base salary = ~60% of total comp.\n\nThe other 40%:\n→ Annual bonus\n→ RSUs / stock options\n→ 401K match (free money)\n→ Health insurance ($8-15K)\n→ PTO value\n\nMost people only negotiate the 60%.",
      "At FAANG:\n\nL4 SWE base: $175K\nTotal comp: $280K+\n\nThat's $105K you're leaving on the table if you only negotiate base.",
      "How to negotiate total comp:\n\n1. Ask for the full comp breakdown\n2. Negotiate signing bonus separately\n3. Ask for accelerated vesting\n4. Push for higher RSU refreshers\n5. Don't forget relocation",
      "Calculate your full market value: underchozen.com\n\nIt's free. Takes 30 seconds.",
    ],
  },
  {
    id: "tw-recession-moves",
    title: "5 salary moves before a recession hits",
    category: "Tips",
    tweets: [
      "A recession is coming.\n\nHere are 5 salary moves to make BEFORE it hits: 🧵",
      "1/ Know your market rate RIGHT NOW.\n\nIn a downturn, companies lowball aggressively.\n\nIf you don't know your number, you'll accept their number.",
      "2/ Negotiate your raise before layoffs start.\n\nManagers have budget now. They won't in 6 months.\n\nThe best time to ask was yesterday. The second best time is today.",
      "3/ Stack recession-proof skills.\n\nAI/ML, cybersecurity, data engineering.\n\nThese roles had ZERO net layoffs in the last downturn.",
      "4/ Build your emergency fund to 6+ months.\n\n5/ Document your impact metrics NOW.\n\nWhen cuts come, the people with clear ROI keep their seats.\n\nCheck your market position: underchozen.com",
    ],
  },
  {
    id: "tw-remote-premium",
    title: "Remote workers are getting pay-cut quietly",
    category: "Education",
    tweets: [
      "Remote workers are getting quiet pay cuts.\n\nHere's the data no one is sharing: 🧵",
      "68% of companies now use location-based pay.\n\nTranslation: Move from SF to Austin → automatic 10-15% pay cut.\n\nBut your output didn't change.",
      "The irony:\n\n→ Company saves $15K/yr on office space per remote worker\n→ Worker saves them $15K\n→ Company cuts worker's pay by $15K\n\nYou're subsidizing their real estate savings.",
      "How to fight back:\n\n1. Know the national rate for your role (not adjusted)\n2. Negotiate on VALUE delivered, not ZIP code\n3. Show your output metrics\n4. Be willing to walk — remote talent is global",
      "Check if your remote salary is fair: underchozen.com\n\nWe show location-adjusted AND national rates.",
    ],
  },
  {
    id: "tw-job-hopping-math",
    title: "The math on job hopping vs loyalty",
    category: "Education",
    tweets: [
      "Job hoppers earn 30% more than loyal employees after 5 years.\n\nHere's the math: 🧵",
      "Stay at one company for 5 years:\n\nYear 1: $100K\nYear 2: $103.5K (+3.5%)\nYear 3: $107K\nYear 4: $110.8K\nYear 5: $114.7K\n\nTotal: 14.7% increase.",
      "Switch companies every 2-3 years:\n\nYear 1: $100K\nYear 3: $120K (+20% hop)\nYear 5: $144K (+20% hop)\n\nTotal: 44% increase.\n\nDifference: $29,300/year by year 5.",
      "Over a 30-year career, that gap compounds to $500K-$1M in lifetime earnings.\n\nLoyalty tax is the most expensive tax you'll ever pay.",
      "Check if you're paying the loyalty tax: underchozen.com\n\nFree market analysis. 30 seconds.",
    ],
  },
  {
    id: "tw-annual-review",
    title: "Your annual review is a salary trap",
    category: "Tips",
    tweets: [
      "Your annual review is a salary trap.\n\nHere's why — and what to do instead: 🧵",
      "The trap: companies time reviews to control the narrative.\n\nThey set the budget. They set the timeline. They frame the 3% raise as \"generous.\"\n\nYou're negotiating on their terms.",
      "What to do instead:\n\n1. Set a 1:1 meeting 3 months BEFORE review season\n2. Come with market data (not feelings)\n3. Present your impact in dollar terms\n4. Give them time to go to HR\n\nYou control the timeline.",
      "The script:\n\n\"I've been researching market rates for my role. Based on [data source], the range is $X-$Y. Given my contributions to [project], I'd like to discuss alignment.\"\n\nSimple. Professional. Data-driven.",
      "Get your market data before your next review: underchozen.com\n\nData wins negotiations. Feelings don't.",
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
    id: "li-silent-paycut",
    title: "Your employer gave you a pay cut this year. You just didn't notice.",
    category: "Education",
    content: `Your employer gave you a pay cut this year. You just didn't notice.

Inflation ran at 3.2% in 2025.

Your raise? If you got one at all, it was probably 3%.

That's not a raise. That's a 0.2% pay cut disguised as a reward.

Here's the part nobody tells you:

While you stayed loyal, your company hired someone new in your EXACT role — at market rate. Which is 12-18% higher than your current salary.

They're paying a stranger more than you because you never asked.

The math over 5 years of "loyalty":
→ Year 1: $100K (feels fine)
→ Year 3: $109K (inflation-adjusted: $97K)
→ Year 5: $119K (market rate: $148K)
→ Lifetime gap: $423,000

You're not being rewarded for staying. You're being penalized for not leaving.

Two things you can do TODAY:

1. Find out your actual market rate (not what you think it is — what the DATA says)
2. Have a compensation conversation before Q3 budgets are locked

The data will either confirm you're fine or reveal a gap you can't afford to ignore.

Check yours in 30 seconds: underchozen.com

#salary #career #compensation #negotiation #inflation`,
  },
  {
    id: "li-email-script",
    title: "I sent one email. My salary went up $22K. Here's the exact script.",
    category: "Tips",
    content: `I sent one email. My salary went up $22K.

No meeting. No confrontation. No ultimatum.

Here's the exact framework:

---

Subject: Quick question about compensation alignment

Hi [Manager],

I wanted to flag something I've been thinking about.

Over the past [X months], I've contributed to [specific achievement with a number attached — revenue, users, cost savings]. I'm proud of the work and energized by what's ahead.

I've also been doing some market research. Based on several data sources, the median compensation for [your role] in [your city] at [your experience level] is [specific number].

My current salary puts me at the [X]th percentile of market — which is below the range my contributions would suggest.

I'd love to find 15 minutes to discuss alignment when you have a moment this week.

---

Why this works:
→ Opens with impact, not complaints
→ Uses a specific percentile (not "I feel underpaid")
→ Creates a paper trail HR can reference
→ Gives them time to go to bat for you internally
→ Non-confrontational. Zero drama.

87% of employees who present market data get a raise.
32% of those who go in with feelings alone do.

Same conversation. 2.7x better outcome. The only variable is data.

Get your market data: underchozen.com

#negotiation #salary #career #leadership #management`,
  },
  {
    id: "li-hiring-manager-secret",
    title: "I'm a hiring manager. Here's what I wish candidates knew about salary.",
    category: "Tips",
    content: `I'm a hiring manager. I've extended 200+ offers.

Here's what I wish every candidate knew:

1. I WANT you to negotiate. If you don't, I assume you'll accept anything — and my budget goes elsewhere.

2. The first number I give you is never my best number. I have a range. The offer is always at the bottom of it.

3. "I need to think about it" is the most powerful phrase in salary negotiation. I've watched candidates get $15K more just by pausing for 48 hours.

4. I cannot fight for you without ammunition. When you say "I want more," I have nothing to take to HR. When you say "Market data shows $X, and here's my impact," I become your advocate.

5. I judge candidates who negotiate MORE favorably. It shows you understand your value, do research, and advocate for yourself — skills I need on my team.

6. The budget is almost never as fixed as we claim. "We can't go higher" usually means "I'd need VP approval" — which I'll get if you're worth it.

7. Your current salary is irrelevant to me. I'm buying future output, not matching your past employer's mistake.

Stop being afraid of the conversation. We're expecting it.

Know your market rate before your next interview: underchozen.com

#hiring #negotiation #salary #recruiting #management`,
  },
  {
    id: "li-three-year-trap",
    title: "The 3-year trap: why your biggest raise is always at a new company",
    category: "Data",
    content: `I tracked my own compensation for 12 years. Here's the pattern:

Year 1 at a company: Big jump (negotiated a 20%+ raise to join)
Year 2: Strong performance. 4% raise.
Year 3: Another great year. 3.5% raise.
Year 4: "Budget was tight." 2% raise.

Then I'd leave. And get another 20% jump.

Repeat x4 companies.

My total compensation growth over 12 years: 187%.
If I'd stayed at company #1 the whole time? ~38%.

That's a $340,000 difference. Same skills. Same work ethic. Just different negotiation leverage.

Here's why the 3-year trap exists:

→ Internal raise budgets: 3-4% (company-wide pool)
→ External offers: 15-25% (market-rate matching)
→ Companies invest in acquiring talent, not retaining it
→ Your "loyalty" subsidizes new-hire signing bonuses

The companies that break this pattern exist — but they're rare. And they STILL require you to advocate with data.

The play:
1. Check your market rate annually
2. If you're below the 50th percentile after year 2, negotiate or leave
3. Never accept a lateral move without a 15%+ bump
4. Document your impact BEFORE review season, not during

Your loyalty is admirable. But it shouldn't cost you six figures.

Check your percentile: underchozen.com

#careeradvice #salary #jobmarket #compensation #leadership`,
  },
  {
    id: "li-unpopular-opinion",
    title: "Unpopular opinion: you don't deserve a raise. You deserve market rate.",
    category: "Education",
    content: `Unpopular opinion: You don't deserve a raise.

You deserve market rate.

There's a difference.

A "raise" implies you're asking for a favor.
"Market rate" implies the market has already decided your value — and your employer hasn't kept up.

Framing matters more than most people realize:

❌ "I've been here 3 years and I think I deserve more"
✅ "Market data shows my role at this level pays $X. I'd like to discuss alignment."

❌ "My rent went up and I'm struggling"
✅ "My contributions generated $Y in revenue this quarter. The market values that at $X."

❌ "My coworker told me she makes more"
✅ "Aggregated market data places my percentile at Z. I want to close the gap."

The first version of each makes it about you.
The second makes it about the data.

Managers can argue with your feelings. They can't argue with the market.

This isn't about being combative. It's about being precise.

Every negotiation you have should start with one question: "What does the market say?"

Answer that question: underchozen.com

#salary #negotiation #career #leadership #communication`,
  },
  {
    id: "li-45-minute-mistake",
    title: "The 45-minute mistake that costs professionals $500K",
    category: "Education",
    content: `It takes 45 minutes to prepare for a salary negotiation.

The average return on those 45 minutes? $18,000/year.

Over a 30-year career, that compounds to $500,000+.

And yet 73% of professionals never do it. Not once.

Here's what those 45 minutes look like:

MINUTE 0-15: Research
→ Look up your market rate for your exact role + city + level
→ Find the 25th, 50th, and 75th percentile numbers
→ Note where your current salary falls

MINUTE 15-30: Build your case
→ List your 3 biggest measurable impacts this year
→ Translate each into dollars (revenue generated, costs saved, efficiency gained)
→ Calculate your ROI for the company

MINUTE 30-45: Write the script
→ Open with impact (not tenure or feelings)
→ Present the market data (specific percentile, not a range)
→ Make a specific ask (exact number, not "something in the range of")
→ Prepare for one objection: "We don't have the budget"

That's it. 45 minutes. $500K.

The most expensive thing you'll ever do is nothing.

Start your 15-minute research: underchozen.com

#negotiation #career #salary #productivity #professionaldevelopment`,
  },
  {
    id: "li-reverse-interview",
    title: "I ask one question in every interview that reveals the real salary range",
    category: "Tips",
    content: `In every interview, I ask one question that reveals the real salary range.

It's not "What's the budget?"
It's not "What are you offering?"

It's this:

"What does the compensation trajectory look like for someone who excels in this role over the first 2-3 years?"

Why this works:

1. It signals you're thinking long-term (managers love this)
2. It forces them to reveal the salary band without asking directly
3. It exposes whether there's real growth or a dead-end ceiling
4. It gives you the RANGE — which is what you actually negotiate against

If they say: "You'd start at $X and could be at $Y in 2 years"
You now know the ceiling. Negotiate to start closer to it.

If they say: "We do annual reviews and typical raises are 3-4%"
Red flag. That's below inflation. You'll be underpaid by year 2.

If they dodge: "It depends on a lot of factors..."
The band is either narrow or they don't have a growth plan.

The answer to this ONE question tells you more about comp than 3 rounds of negotiations.

But you still need to know YOUR market rate before you walk in.

Get it here: underchozen.com

#interviewing #salary #career #hiring #negotiation`,
  },
  {
    id: "li-data-wins",
    title: "I gave my manager a spreadsheet instead of a speech. I got promoted.",
    category: "Tips",
    content: `I got promoted last quarter.

Not because I gave a speech. Not because I "leaned in."

Because I gave my manager a spreadsheet.

Here's what was on it:

ROW 1: My market rate ($X — from 3 independent sources)
ROW 2: My current salary ($Y — 18th percentile)
ROW 3: Revenue I influenced this year ($Z)
ROW 4: My ROI for the company (salary cost vs. revenue impact = 8.4x)
ROW 5: Comparable salaries at 3 competitor companies

That's it. Five rows. No emotion. No "I feel."

My manager took it to her VP. The VP took it to HR. HR approved a promotion + 24% raise within 3 weeks.

Why this works:

Managers WANT to pay you more. They just need tools to justify it internally. Your job isn't to convince your manager — it's to arm them with data so they can convince THEIR manager.

When you walk in with feelings, you create a difficult conversation.
When you walk in with a spreadsheet, you create a business case.

Be the easiest promotion decision your manager ever makes.

Build your spreadsheet in 30 seconds: underchozen.com

#promotion #salary #career #leadership #data`,
  },
  {
    id: "li-comparison-trap",
    title: "Stop comparing your salary to your friends. Compare it to the market.",
    category: "Education",
    content: `"My friend makes $160K and we have the same title."

I hear this every week. And every week, I say the same thing:

Your friend's salary is irrelevant.

Here's why:

→ Different company size = different pay bands
→ Different city = different cost-of-living adjustment
→ Different industry = 15-40% premium variation
→ Different negotiation = completely different starting point
→ Different tenure = different internal raise history

Two people with identical titles can have a $60K gap and BOTH be paid fairly for their specific situation.

The question isn't "Am I paid less than my friend?"

The question is: "Am I paid fairly for MY role, in MY city, at MY experience level, in MY industry, at MY company size?"

That requires data. Not anecdotes.

I've watched people rage-quit over a perceived gap that didn't exist — and I've watched people feel fine while sitting $40K below market because nobody told them.

Your salary should be benchmarked against the market, not against your group chat.

Get your personalized benchmark: underchozen.com

#salary #career #compensation #data #careeradvice`,
  },
  {
    id: "li-quiet-leverage",
    title: "The most powerful negotiation tactic is one you never use out loud",
    category: "Tips",
    content: `The most powerful negotiation tactic is one you never use out loud.

It's not a threat. It's not an ultimatum. It's not "I have another offer."

It's THIS: knowing your exact market value and being genuinely willing to walk away.

That's it. That's the tactic.

When you KNOW you're worth $160K and you're making $128K, something shifts. Your posture changes. Your patience changes. You stop negotiating from anxiety and start negotiating from clarity.

Your manager senses it. They don't know why, but you seem... different.

Here's what quiet leverage looks like in practice:

Without leverage: "I really hope you can find something in the budget..."
With leverage: "The market range is $155-175K. I'd like to close the gap by Q2."

Without leverage: "Whatever you think is fair..."
With leverage: "Based on my impact and the data, $162K reflects fair market alignment."

Without leverage: "Maybe we can revisit next year?"
With leverage: "I appreciate the conversation. I'll need to evaluate my options and follow up."

You never mention another offer.
You never threaten to leave.
You just carry yourself like someone who knows their number.

And that number? You can find it in 30 seconds.

underchozen.com

#negotiation #salary #leadership #career #communication`,
  },
  {
    id: "li-hr-budget-lie",
    title: "HR told me 'the budget is set.' I got a 28% raise anyway. Here's how.",
    category: "Tips",
    content: `"The budget is already set for this cycle."

I've heard this exact line 4 times in my career. And 3 of those times, I got a raise anyway.

Here's what "the budget is set" actually means:

→ The STANDARD raise pool is allocated (3-4% spread across the team)
→ There is ALWAYS a discretionary budget for retention
→ There is ALWAYS an emergency budget for flight-risk employees
→ There is ALWAYS equity/bonus flexibility outside the base salary pool

The script that works:

"I understand the cycle budget is allocated. I'm not asking for a standard raise — I'm presenting a market correction. The data shows a $28K gap between my compensation and market median. Can we discuss a path to close this over 1-2 adjustments, or explore other compensation vehicles?"

Why this works:
1. You acknowledge their constraint (respect)
2. You reframe it as a correction, not a favor
3. You open the door to creative solutions (bonus, equity, title + raise)
4. You show patience (1-2 adjustments), which signals maturity

The people who accept "budget is set" at face value lose.
The people who treat it as the opening of a negotiation win.

Get the data to back your case: underchozen.com

#salary #negotiation #HR #career #compensation`,
  },
  {
    id: "li-senior-plateau",
    title: "Senior engineers: your salary plateaued at $190K. Here's the ceiling nobody warns you about.",
    category: "Data",
    content: `If you're a Senior SWE making $170-190K base, congratulations.

You've also hit the ceiling nobody warned you about.

Here's what the data shows:

Mid → Senior: +35-50% salary jump
Senior → Staff: +15-20% salary jump (IF you get there)
Senior → Senior (year over year): +2-4% raises

The Senior title is where most careers stall. Not because you're not good enough for Staff — but because:

1. Staff roles are scarce (1 for every 8-10 Seniors)
2. Companies have no incentive to promote you (you're already productive)
3. Internal promotion criteria are deliberately vague
4. Your 3% annual raise barely covers inflation

The escape routes:

PATH A: Force the Staff conversation
→ Document Staff-level work you're already doing
→ Present market data showing Staff comp ($230-280K+)
→ Create urgency: "I'd like to align title with scope"

PATH B: Jump externally
→ External Senior → Staff jumps happen 5x more often than internal promotions
→ Average comp increase for Senior → Staff external move: 40-65%

PATH C: Specialize
→ AI/ML specialization: +40% at the same level
→ Platform/infra: +20-25%
→ Security: +30%

The plateau is real. But it's not permanent — if you have the data.

Find your exact percentile: underchozen.com

#softwareengineering #salary #career #tech #promotion`,
  },
  {
    id: "li-first-offer",
    title: "I've never accepted a first offer. Neither should you.",
    category: "Tips",
    content: `I've never accepted a first offer.

Not because I'm greedy. Because first offers are designed to be negotiated.

Here's proof:

→ 85% of hiring managers expect negotiation
→ The first offer is typically at the 25th-40th percentile of the approved range
→ The average successful negotiation adds $5-15K to the initial offer
→ Companies budget 10-20% buffer above the first number

When you accept a first offer, three things happen:

1. You start below market (and every future raise compounds from a lower base)
2. Your manager slightly loses respect (you didn't advocate for yourself)
3. The company quietly redirects YOUR budget allocation to the next hire

The 3-sentence response that works every time:

"Thank you — I'm excited about this opportunity. Based on my research, the market range for this role is $X-$Y. Given my experience with [specific skill/achievement], I'd like to discuss a base closer to $Y."

That's it. Professional. Data-backed. Specific.

The worst case? They say "We can't go higher" — and you still have the original offer.
The best case? $10-20K more per year for one uncomfortable minute.

That's $300-600K over a career.

Get your market data before your next offer: underchozen.com

#negotiation #salary #career #hiring #offers`,
  },
  {
    id: "li-sunday-scaries-salary",
    title: "If you get Sunday Scaries, your salary might be the actual problem",
    category: "Education",
    content: `Sunday Scaries aren't always about the work.

Sometimes they're about the pay.

I spent 2 years dreading Monday mornings. I thought I hated my job. Considered switching careers entirely.

Then I checked my market rate and discovered I was being paid $34K below median.

Suddenly it wasn't the work I hated. It was the feeling of being undervalued for work I was actually good at.

The psychology of underpayment:

→ You resent tasks you'd normally enjoy
→ You disengage from projects that don't "feel worth it"
→ You compare yourself to peers and feel behind
→ You lose motivation because effort doesn't seem to translate to reward
→ You mistake burnout for career misalignment

Fixing the salary fixed the Scaries. Not because money buys happiness — but because fair compensation removes a constant source of background stress.

Before you quit, before you pivot, before you burn it all down:

Check if you're being paid fairly.

If you ARE — then the problem is genuinely the work, and changing makes sense.
If you're NOT — fixing the gap might fix everything else.

30-second salary check: underchozen.com

#mentalhealth #career #salary #burnout #wellbeing`,
  },
  {
    id: "li-remote-leverage",
    title: "Remote workers have more salary leverage than they think. Here's why.",
    category: "Education",
    content: `Remote workers have MORE salary leverage than office workers.

Yes, more. Not less.

Here's why the narrative is wrong:

Companies say: "You should accept lower pay because you work from home."
Reality: You should negotiate HIGHER because you save them $15-22K/year in office costs.

The math:

Cost to employer per office worker:
→ Office space: $8-15K/year
→ Utilities, internet, maintenance: $2-3K/year
→ Snacks, coffee, perks: $1-3K/year
→ IT equipment/furniture: $2-3K/year
→ Total: $13-24K/year saved per remote worker

They're saving $15K+ on you. And trying to cut YOUR pay by $15K. That's a $30K swing in their favor.

How to negotiate as a remote worker:

1. Negotiate on OUTPUT, not location: "My deliverables are the same regardless of where I sit."

2. Use NATIONAL rates, not local: "I compete in a national talent pool. My rate should reflect that."

3. Flip the savings argument: "My remote work saves the company $X/year in overhead. My ask reflects shared value."

4. Know your replacement cost: Hiring your replacement costs 50-200% of your annual salary. Retention is always cheaper.

Stop accepting location discounts for location-independent work.

Know your national rate: underchozen.com

#remotework #salary #negotiation #wfh #career`,
  },
  {
    id: "li-title-inflation",
    title: "Your title says Director. Your salary says Senior Manager. That's by design.",
    category: "Education",
    content: `Companies have figured out something clever:

It's cheaper to give you a title than a raise.

"Director" costs $0.
$30K raise costs... $30K.

And so the market is flooded with:
→ Directors making Manager pay
→ VPs making Director pay
→ "Heads of" making Individual Contributor pay
→ "Leads" making Junior pay

Title inflation is the silent theft of your career trajectory.

Why it's dangerous:

1. When you leave, the new company benchmarks you against REAL Directors — and offers you less than your fake title suggests
2. You stop pushing for real compensation because the title feels like progress
3. Your scope doesn't match — you're a Director with no direct reports and no budget authority

How to spot it:

→ Does your title match your direct reports? (Directors should manage managers)
→ Does your title match your comp band? (Check market data)
→ Would an external recruiter give you the same title?
→ Do you have budget authority matching your title?

If the answers are no, you have an inflated title and a deflated salary.

The fix: Negotiate comp to match the title, or negotiate the title down and comp up.

Check what your title should actually pay: underchozen.com

#career #salary #titles #leadership #compensation`,
  },
  {
    id: "li-2-year-plan",
    title: "The 2-year salary plan that turned $95K into $162K",
    category: "Tips",
    content: `Two years ago I was making $95K. Today I make $162K.

Same role. Same industry. Same city.

I didn't get lucky. I followed a plan.

Here it is:

MONTH 1: Baseline
→ Checked my market rate (I was at the 22nd percentile — ouch)
→ Documented my 5 biggest contributions in dollar terms
→ Set target: 50th percentile within 12 months

MONTH 2-3: Internal move
→ Presented market data + impact doc to my manager
→ Result: $12K raise (they "couldn't go higher")
→ New salary: $107K (still below median)

MONTH 6: Skill stack
→ Got cloud certification
→ Took on a cross-functional project with measurable revenue impact
→ Documented everything

MONTH 12: External leverage
→ Took recruiter calls (3 conversations, 1 formal offer)
→ Offer: $148K
→ Brought it back (diplomatically)
→ Counter: $135K + $15K bonus + accelerated review
→ Accepted.

MONTH 18: Follow-through
→ Review came through: promoted + raised to $162K
→ 22nd percentile → 68th percentile in 18 months

Total time invested: ~20 hours over 18 months.
Total financial impact: +$67K/year = +$2M over remaining career.

The plan starts with one thing: knowing your market rate.

Start here: underchozen.com

#career #salary #growth #negotiation #planning`,
  },
  {
    id: "li-equity-trap",
    title: "Startups offered me $150K in equity. I did the math. It was worth $8K.",
    category: "Education",
    content: `"The equity is worth $150K."

That's what 3 different startups told me in the last year.

So I did the math. On every single one.

Startup A: $150K in options
→ 409A valuation: $0.50/share
→ Strike price: $0.45/share (almost no spread)
→ Vesting: 4 years, 1-year cliff
→ Company stage: Series A, 85% dilution expected
→ Expected value: ~$12K
→ If company fails (70% chance at Series A): $0

Startup B: $150K in RSUs
→ Based on last round valuation (12 months old)
→ Company has 18 months of runway
→ No secondary market
→ Expected value: ~$8K
→ Liquidity event: 7-10 years away

Startup C: $150K in "projected equity"
→ Based on "where we think we'll be in 3 years"
→ Not yet legally structured
→ Expected value: maybe $0

My rule of thumb:

Value startup equity at 10-15% of stated paper value.

$150K on paper = $15-22K in expected value.

So when a startup says "We're offering $120K base + $150K equity" vs. a FAANG offer of "$175K base + $50K RSUs," the FAANG offer is worth $60K more.

Always negotiate the base. Equity is a lottery ticket.

Know your base market rate first: underchozen.com

#startup #equity #compensation #career #negotiation`,
  },
  {
    id: "li-performance-review-hack",
    title: "Your performance review starts 12 months before the meeting. Most people don't realize that.",
    category: "Tips",
    content: `Your performance review starts 12 months before the meeting.

The people who get the biggest raises aren't better performers. They're better documenters.

Here's the system I use:

WEEKLY (2 minutes):
→ Friday afternoon: write down ONE win from this week
→ Include a specific number (revenue, users, savings, time reduced)
→ Save it in a running doc

MONTHLY (10 minutes):
→ Review your weekly wins
→ Group them into themes (revenue impact, efficiency, leadership)
→ Update your "impact resume" — a 1-page summary of your contributions

QUARTERLY (30 minutes):
→ Calculate your aggregate ROI for the company
→ Check your market rate (has it changed?)
→ Schedule a brief "career growth" check-in with your manager

REVIEW TIME (45 minutes):
→ Print your impact resume
→ Add 3 specific market data points
→ Write your ask: exact number, not a range
→ Rehearse your opening line once

Total annual time invested: ~8 hours.
Average raise for employees who do this vs. those who don't: 87% vs. 32%.

Your review isn't a one-time event. It's a 12-month campaign.

Start with your market data: underchozen.com

#performancereview #career #salary #productivity #leadership`,
  },
  {
    id: "li-layoff-salary",
    title: "I got laid off and increased my salary by 35%. Here's what most people get wrong.",
    category: "Tips",
    content: `I got laid off in 2024.

It was terrifying. And it was the best thing that happened to my compensation.

New salary: 35% higher than my old one.

Here's what most people get wrong after a layoff:

MISTAKE 1: Taking the first offer out of panic
→ Your severance is your negotiation window. Use all of it.
→ First offer is ALWAYS negotiable — especially in a panic-free market.

MISTAKE 2: Anchoring to your old salary
→ Your old salary was probably below market (that's why they could afford to cut you)
→ Anchor to market data, not history

MISTAKE 3: Disclosing your previous salary
→ It's illegal to require in CA, NY, CO, WA, IL, and growing
→ Say: "I'm targeting roles in the $X-$Y range based on market data"

MISTAKE 4: Negotiating only base
→ Layoff is the BEST time to negotiate signing bonus
→ "I'd need a $15K signing bonus to offset transition costs" works 70%+ of the time

MISTAKE 5: Not negotiating start date
→ A later start date = gap period to rest + collect unemployment
→ "Can we align on a start date 3-4 weeks out?" is normal

A layoff isn't a career failure. It's a forced market correction.

And the market usually corrects upward — if you negotiate from data.

Get your market rate post-layoff: underchozen.com

#layoff #career #salary #negotiation #jobsearch`,
  },
  {
    id: "li-women-negotiate",
    title: "Women negotiate less often. But when they do, they're more successful. Here's the data.",
    category: "Data",
    content: `The data on women and salary negotiation is counterintuitive.

Women negotiate less often than men: 32% vs. 48%.
But when women DO negotiate, their success rate is HIGHER: 74% vs. 68%.

Read that again.

Women are better at negotiating. They just do it less.

Why?

→ Social penalties for "aggressive" women (documented bias)
→ Companies frame raises as rewards, not corrections (gendered framing)
→ Less access to salary data (transparency gap)
→ Risk aversion amplified by less financial cushion (wealth gap)

What the data says works:

1. Frame as "market alignment" not "I want more"
→ Removes gendered perception of "asking for too much"
→ Data is gender-neutral

2. Use collaborative language
→ "I'd like to find a number that reflects the market" (not "I demand")
→ This outperforms aggressive tactics for everyone, but especially for women

3. Negotiate in writing first
→ Removes real-time bias
→ Creates a documented trail
→ Allows decision-makers time to check their biases

4. Lead with impact metrics
→ "$X in revenue" has no gender. Neither does "Yth percentile."

The negotiation gap is a data gap. Close the data gap and the negotiation gap follows.

Free, data-driven market analysis: underchozen.com

#paygap #salary #women #negotiation #diversity`,
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
    id: "qa-how-underpaid",
    question: "How do I find out if I'm being underpaid at my job?",
    category: "Education",
    answer: `The short answer: compare your salary to market data — not to your coworker's salary, not to what you "feel" you're worth, and definitely not to what Google says the average is.

Here's a methodical approach that actually works:

**Step 1: Identify your exact market position**

You need 4 variables:
1. Your job title (standardized — "Software Engineer" not "Code Ninja")
2. Your city (salaries vary 15-40% by metro)
3. Your experience level (entry/mid/senior)
4. Your industry (tech pays 15% more than healthcare for the same role)

**Step 2: Find your percentile**

A percentile tells you where you rank:
- Below 25th: Significantly underpaid
- 25th-50th: Below market
- 50th: Median (fair market rate)
- 50th-75th: Above market
- Above 75th: Well-compensated

**Step 3: Do the math**

If median for your role is $130K and you make $108K, you're at roughly the 25th percentile. That's a $22K annual gap, or $220K over 10 years.

**The trap most people fall into:**

They Google "average [job title] salary" and get a national number with no adjustment for city, level, or industry. That number is meaningless for YOUR situation.

You need a personalized calculation that adjusts for all four variables.

I'd recommend checking underchozen.com — it runs your specific inputs against market data and shows your exact percentile in 30 seconds. Free, no signup required.`,
  },
  {
    id: "qa-negotiate-new-offer",
    question: "Should I negotiate a job offer even if I think the salary is fair?",
    category: "Tips",
    answer: `Always. Without exception.

And here's why "fair" is doing a lot of heavy lifting in your question:

**The first offer is never the best offer.**

85% of hiring managers expect negotiation. The initial number is almost always at the 25th-40th percentile of their approved range. They have budget above it — and they're waiting for you to claim it.

**Three things happen when you DON'T negotiate:**

1. You start below market. Every raise, bonus, and promotion compounds from a lower base. Over a 5-year tenure, this easily costs $50K+.

2. You signal low self-advocacy. Managers notice. The person who didn't negotiate their salary also won't push back on unreasonable deadlines, won't advocate for their team, won't challenge bad decisions. That's the perception.

3. Your budget goes to someone else. That $10K you didn't claim? It gets redistributed to the next hire's signing bonus.

**The exact response that works:**

"Thank you — I'm genuinely excited about this role. Based on market data for [role] in [city], the range is $X-$Y. Given my experience with [specific achievement], I'd like to discuss a base closer to $Y."

Three sentences. Takes 20 seconds to say. Average return: $5-15K more per year.

**What if they say no?**

You still have the original offer. Nobody has ever had an offer rescinded for professionally negotiating.

Check your market rate before your next offer: underchozen.com`,
  },
  {
    id: "qa-swe-salary-2026",
    question: "What is the average software engineer salary in 2026?",
    category: "Data",
    answer: `"Average" is a misleading metric for software engineer salaries because the range is enormous. Let me give you the real breakdown:

**By experience level (base salary, US national median):**

- Entry-level (0-2 years): $85,000 - $115,000
- Mid-level (3-5 years): $120,000 - $155,000
- Senior (6-10 years): $155,000 - $200,000
- Staff/Principal (10+): $200,000 - $300,000+

**By city (mid-level median):**

- San Francisco: $165,000
- New York: $155,000
- Seattle: $150,000
- Austin: $130,000
- Chicago: $125,000
- Denver: $128,000

**By company type:**

- FAANG/Big Tech: Add 25-50% to above numbers (total comp including RSUs)
- Series B-D startup: Roughly market +/- 10% base, plus equity lottery
- Enterprise: Market rate + strong benefits
- Agency/consulting: 10-20% below market base, but project variety

**The number that actually matters:**

Don't compare yourself to the "average." Compare yourself to YOUR specific combination of city + level + industry + company size.

A Senior SWE in San Francisco at a FAANG company is in a completely different market than a Senior SWE in Austin at a 50-person startup.

For a personalized breakdown that adjusts for all these variables, check underchozen.com — it calculates your exact percentile against the specific market you're competing in.`,
  },
  {
    id: "qa-ask-raise",
    question: "How do I ask my boss for a raise without making things awkward?",
    category: "Tips",
    answer: `The reason salary conversations feel awkward is because most people approach them with feelings instead of data. When you have data, it's not awkward — it's just business.

**The framework that removes the awkwardness:**

**1. Don't ask for a raise. Ask for market alignment.**

"Raise" implies you're asking for a favor.
"Market alignment" implies the market has already decided — your employer just hasn't caught up.

**2. Lead with your impact, not your needs.**

❌ "I've been here 3 years and I deserve more"
✅ "My work on [project] generated $X in [metric]. The market values this contribution at $Y."

**3. Use email first, meeting second.**

Send this:

*"Hi [Manager], I've been researching compensation data for [your role] in [your city]. Based on several sources, the market range is $X-$Y. My current compensation places me at the Xth percentile. Given my contributions to [specific project with metrics], I'd love to discuss alignment when you have 15 minutes this week."*

This removes the "ambush" feeling. Your manager gets time to think, check with HR, and prepare a response.

**4. Have a specific number.**

Don't say "something in the range of..." Say "$142,000." Specific asks get specific answers.

**What if they say no?**

Ask: "What would I need to demonstrate for that level of compensation?" Get it in writing. Now you have a roadmap.

Start with your market data: underchozen.com`,
  },
  {
    id: "qa-salary-by-city",
    question: "Why do salaries vary so much between cities for the same job?",
    category: "Education",
    answer: `The same Software Engineer role can pay $95K in Nashville and $165K in San Francisco. That's a 74% difference for identical work. Here's why:

**1. Cost of living adjustment**

Companies adjust salaries to local costs — primarily housing. SF median rent is $3,200/month vs. Nashville's $1,600. They're paying for you to live near the office (or historically, they were).

**2. Local talent competition**

SF has Google, Apple, Meta, and 10,000 startups all bidding for the same talent. Nashville has fewer competitors. More demand + same supply = higher prices.

**3. Revenue per employee**

Companies in expensive cities tend to generate more revenue per head (higher-paying clients, denser markets). They can afford to pay more because each employee produces more value.

**4. Tax arbitrage**

Some differences are inflated by tax variation. Texas (0% state income tax) vs. California (13.3% top rate) creates a significant after-tax gap.

**The catch with remote work:**

68% of companies now adjust remote pay by location. But here's the math they hope you don't do:

SF → Austin move:
- Salary cut: -$15K
- Housing savings: -$30K/year
- Tax savings: -$8K/year
- Net purchasing power gain: +$23K

The "pay cut" often leaves you BETTER off financially.

**The important question:**

Are you being paid fairly for YOUR specific city? Not the national average. Not your friend's number. YOUR market.

Check your city-adjusted rate: underchozen.com`,
  },
  {
    id: "qa-negotiate-first-job",
    question: "Can I negotiate salary at my first job out of college?",
    category: "Tips",
    answer: `Not only can you — you absolutely should. And I'll explain why most career advice gets this wrong.

**The myth:** "You have no leverage as a new grad. Be grateful for any offer."

**The reality:** Companies spend $15,000-$30,000 to recruit and hire you. They're not going to rescind an offer because you professionally asked for $5K more. The ROI on hiring you is already calculated.

**What you DO have as leverage:**

1. Multiple offers (or the potential of them — they don't know you don't have one)
2. Specific skills or projects from internships
3. Relevant coursework, certifications, or a strong portfolio
4. The fact that they chose you from 200+ applicants

**The script for new grads:**

"Thank you so much for this offer — I'm really excited about [company]. I've done some research on entry-level [role] salaries in [city], and the market range is $X-$Y. Would there be flexibility to move the base closer to $Y? I'm particularly drawn to the team and would love to find a number that works for both sides."

**Why this matters MORE for your first job than any other:**

Your first salary sets the base for every future raise. A $5K difference at age 22 compounds to $500K+ over your career, because:

→ Every future raise is percentage-based (3% of $70K vs 3% of $75K)
→ Every future employer asks about or benchmarks against your current comp
→ Promotion increases are usually 10-15% of your current base

**Even $3K matters.** Negotiate it.

Research entry-level rates for your role: underchozen.com`,
  },
  {
    id: "qa-total-comp-explained",
    question: "What is total compensation and why should I care about it?",
    category: "Education",
    answer: `Total compensation is everything your employer pays you, not just the number on your paycheck. Most people only negotiate 60% of their actual pay.

**The full breakdown:**

**Base salary (60% of total comp)**
Your fixed annual pay. The number everyone focuses on.

**Bonus (10-20%)**
Annual performance bonus. At some companies this is guaranteed; at others it's variable. Always ask: "What's the target bonus percentage and what's the typical payout?"

**Equity/RSUs/Options (15-40% at tech companies)**
At FAANG, this is where the real money is. An L5 at Google with $185K base might have $280K+ total comp because of RSUs.

**Benefits you're probably ignoring:**
- Health insurance: Your employer pays $8-15K/year for your coverage
- 401K match: If they match 4% and you earn $120K, that's $4,800 in FREE money
- PTO: 20 days × your daily rate ($120K ÷ 260 = $461/day) = $9,230 in value
- Life/disability insurance: $2-5K/year

**Why it matters:**

Offer A: $120K base + great benefits = $165K total comp
Offer B: $135K base + minimal benefits = $148K total comp

The "lower" salary is worth $17K MORE.

**The mistake people make:**

They compare base salaries across offers without adding benefits. They see $135K > $120K and take the worse deal.

**When negotiating:**

Always ask for the total compensation breakdown. Then negotiate each component separately. Sometimes a company can't budge on base but can add a $10K signing bonus or accelerate your equity vesting.

Calculate your total comp: underchozen.com`,
  },
  {
    id: "qa-counter-offer-accept",
    question: "My company gave me a counter-offer after I tried to resign. Should I take it?",
    category: "Tips",
    answer: `The data strongly suggests no — but let me give you the full picture so you can decide for yourself.

**The statistics are brutal:**

- 80% of people who accept counter-offers leave within 18 months
- 50% leave within 6 months
- You become "the person who almost left" in management's eyes

**Why counter-offers fail:**

1. **The root cause remains.** If you were leaving because of culture, management, growth, or scope — money doesn't fix any of those. It just makes them temporarily more tolerable.

2. **Trust is permanently damaged.** Your manager now knows you're a flight risk. Your name goes on the "might leave" list. When cuts come, guess who's first?

3. **The raise was overdue.** They clearly HAD the budget. They just didn't pay you fairly until you forced their hand. What does that tell you about how they value you proactively?

4. **Promotion timeline resets.** "We just gave you a significant raise" becomes the answer to every future comp conversation for 18-24 months.

**When a counter-offer CAN work (rare):**

→ The issue was purely, genuinely compensation (nothing else bothered you)
→ They address the root cause AND give you more money
→ You get the new comp in writing with a clear growth plan
→ You truly love the team, mission, and work

**The better strategy:**

Don't wait until you have an outside offer to negotiate. Know your market value, present data proactively, and advocate before you reach the resignation point.

That way, you get the raise without the drama — or the damaged trust.

Know your market value: underchozen.com`,
  },
  {
    id: "qa-recession-salary",
    question: "Should I ask for a raise during a recession or economic downturn?",
    category: "Tips",
    answer: `Yes — but your strategy needs to be completely different than in a bull market.

**The conventional wisdom is wrong.** Most people think: "It's a bad economy, I should just be grateful to have a job." This is fear talking, not strategy.

**Here's why you should still negotiate:**

1. If you're underpaid, you're underpaid regardless of the economy
2. Replacing you costs 50-200% of your annual salary — layoffs and hiring freezes make retention even more valuable
3. Your leverage is different but not gone — companies can't afford to lose proven performers when they can't easily hire replacements

**The recession negotiation playbook:**

**Step 1: Reframe the ask**

Don't ask for a "raise." Ask for a "market correction" or "retention adjustment."

"I understand the market conditions. I'm not asking for a standard increase — I'm presenting data showing my compensation is significantly below market median. Correcting this now is a retention investment."

**Step 2: Lead with your irreplaceability**

What would it cost to replace you? (Answer: a lot, especially with a hiring freeze.) Calculate your ROI for the company and present it.

**Step 3: Be creative**

If base salary is truly frozen, negotiate:
→ Additional PTO (costs the company almost nothing)
→ Remote work flexibility
→ Title change (positions you for the NEXT raise)
→ Signing bonus paid from a different budget
→ Accelerated review timeline

**Step 4: Document everything**

If they say "not right now," get a written commitment: "We'll revisit in Q[X] with the goal of reaching $Y."

Know your market rate even in a downturn: underchozen.com`,
  },
  {
    id: "qa-job-hopping-stigma",
    question: "Is job hopping every 2 years bad for my career?",
    category: "Education",
    answer: `Job hopping has a stigma. The data says it shouldn't.

**The numbers are clear:**

- Average annual raise at same company: 3.5%
- Average raise from switching companies: 15-25%
- After 5 years, job hoppers earn ~30% more than loyal employees
- Lifetime earnings gap: $500K-$1M

**When job hopping HELPS your career:**

→ Each move is upward (title, scope, or pay — ideally all three)
→ You stay 2-3 years per role (enough to deliver measurable impact)
→ You have a clear narrative: "I sought bigger challenges at each stage"
→ You're in a high-demand field (tech, data, product, engineering)

**When it HURTS:**

→ Moves every 6-12 months (signals you can't finish what you start)
→ Lateral moves without salary gains (looks unfocused)
→ You're in an industry that values tenure (government, academia, some healthcare)
→ You can't articulate what you accomplished at each stop

**The sweet spot: 2-3 years per company.**

This gives you enough time to:
1. Deliver at least one major, measurable project
2. Build relationships worth keeping
3. Earn a promotion or significant raise (or identify that you won't)
4. Leave on good terms with a reference

**The reframe:**

It's not "job hopping." It's "market participation."

Companies replace employees all the time for business reasons. You're allowed to replace employers for the same reasons.

Know your market value before your next move: underchozen.com`,
  },
  {
    id: "qa-startup-vs-bigtech",
    question: "Is it better to work at a startup or big tech company for salary?",
    category: "Data",
    answer: `For pure salary? Big tech wins. It's not even close. But total financial outcome is more nuanced.

**Base salary comparison (Mid-level SWE):**

- Big Tech (FAANG): $170-195K base
- Growth startup (Series C-D): $140-165K base
- Early startup (Seed-Series B): $95-130K base

**Total comp comparison:**

- Big Tech: $250-350K (base + RSUs + bonus)
- Growth startup: $160-220K (base + equity at paper value)
- Early startup: $110-180K (base + equity at paper value)

**But here's the equity math:**

Big Tech RSUs: Liquid. Real money. Worth face value.
Growth startup equity: 30-50% chance of being worth something.
Early startup equity: 10-15% chance of any meaningful return.

**My framework for deciding:**

Value startup equity at 10-15% of stated paper value.

So if a startup offers $130K base + "$200K equity" = $130K + $25K expected = $155K real total comp.

vs. Big Tech at $180K base + $80K RSUs = $260K real total comp.

That's a $105K annual gap for the startup.

**When startups make financial sense:**

→ You're employee #1-20 with meaningful equity (0.5%+ ownership)
→ The company is clearly on a rocket ship trajectory
→ You value learning speed over current income
→ You're young with low financial obligations

**For most people, most of the time:** Big tech pays more, with more certainty, and the skills transfer anywhere.

Compare your comp across company sizes: underchozen.com`,
  },
  {
    id: "qa-email-raise",
    question: "What's the best email template to ask for a salary raise?",
    category: "Tips",
    answer: `Here's the exact email framework that works. I've seen it generate raises of $8K to $35K depending on the gap.

**The email:**

---

Subject: Compensation Discussion

Hi [Manager's name],

I wanted to raise something I've been thinking about.

Over the past [X months], I'm proud of the work I've contributed, particularly [1-2 specific achievements with numbers attached — revenue influenced, costs reduced, users impacted, projects shipped].

I've also been researching market compensation for [your exact role] in [your city]. Based on multiple data sources, the market range for someone at my level is $[low end]-$[high end]. My current salary of $[your salary] places me at approximately the [X]th percentile.

I'd love to find 15 minutes to discuss alignment between my compensation and both my contributions and the market. Would [specific day] work for a quick conversation?

Thank you for your support.

---

**Why each line matters:**

- **Opens with impact, not complaints.** They hear your value before they hear your ask.
- **Uses a specific percentile.** "I'm at the 28th percentile" is impossible to argue with. "I feel underpaid" is easy to dismiss.
- **"Alignment" not "raise."** Framing matters. You're not asking for more — you're correcting a gap.
- **Creates a paper trail.** This email can be forwarded to HR as supporting evidence. Your manager can use it to advocate.
- **Asks for time, not an answer.** Gives them space to prepare (and check their budget).

**The data on email-first approaches:**

87% success rate when employees present market data.
32% without data.

Get your specific market data and percentile: underchozen.com`,
  },
  {
    id: "qa-industry-pay-gap",
    question: "Which industries pay the most for the same job?",
    category: "Data",
    answer: `Industry is one of the biggest salary levers that most people completely ignore. The same role, same skills, same city can pay 25-40% differently depending on your industry.

**Industry salary premiums (vs. national baseline for tech roles):**

1. **Technology: +15-20%** — Highest base, best equity, strongest benefits
2. **Finance/Banking: +12-18%** — Strong base, significant bonuses (20-50% of base)
3. **Consulting: +8-12%** — Good base, variable bonus, travel premium
4. **Healthcare tech: +5-10%** — Growing fast, stable demand
5. **Manufacturing: +0-5%** — Baseline compensation
6. **Retail: -5-10%** — Below average for most roles
7. **Non-profit: -12-20%** — Lowest across the board
8. **Education: -15-25%** — Lowest pay, but sometimes better benefits/PTO

**Real example — Data Analyst:**
- In Tech (SF): $115K
- In Finance (NYC): $108K
- In Healthcare: $88K
- In Non-profit: $68K

Same skills. Same analysis work. $47K difference.

**The insight most people miss:**

Switching from a low-paying industry to a high-paying one is often worth MORE than getting promoted within your current industry.

A Senior Data Analyst in non-profit ($78K) who moves to tech as a mid-level ($115K) gets a $37K raise AND a title with more room to grow.

**Your skills transfer.** A PM at a hospital can be a PM at Stripe. An analyst at Target can analyze data at Goldman. Don't let industry inertia cost you six figures.

See your industry premium: underchozen.com`,
  },
  {
    id: "qa-skills-worth-money",
    question: "What skills increase your salary the most in 2026?",
    category: "Data",
    answer: `Based on 2026 compensation data, these skills carry the highest salary premiums:

**Technical skills with the biggest premiums:**

1. **AI/ML Engineering: +$30-60K**
Not just using ChatGPT — production ML pipelines, model deployment, fine-tuning. This is the single highest-premium technical skill right now.

2. **Cybersecurity: +$25-45K**
3.5 million unfilled positions globally. Demand is absurd. Even a Security+ certification adds $15K.

3. **Cloud Architecture (multi-cloud): +$20-35K**
AWS + GCP or AWS + Azure expertise. Certifications accelerate this.

4. **Data Engineering: +$20-30K**
Building pipelines, data platforms, real-time systems. Every company needs this.

5. **Full-Stack Development: +$15-25K**
vs. front-end or back-end only. Versatility commands premium.

**Non-technical skills (often bigger impact than technical):**

1. **Executive communication: +$20-40K**
Presenting to leadership, translating technical concepts for business stakeholders. This alone accelerates promotion speed by 2x.

2. **Financial modeling: +$20-35K**
Understanding P&L, building business cases, ROI analysis. Speaks the language of the people who decide your compensation.

3. **Product sense: +$15-30K**
Understanding user needs, market fit, prioritization frameworks. Engineers with product sense get promoted to Staff faster.

**The compounding effect:**

Stack 2-3 of these and you move from median to top 10% for your title. An ML Engineer who can present to executives and build business cases? That's a $250K+ role.

See how skills affect YOUR specific market value: underchozen.com`,
  },
  {
    id: "qa-gender-pay-data",
    question: "Does the gender pay gap still exist in 2026?",
    category: "Education",
    answer: `Yes. The data is clear, it's well-documented, and it compounds devastatingly over a career.

**The 2026 numbers:**

- Overall gap: Women earn ~84 cents per dollar compared to men
- Controlled gap (same role, same level, same company): 6-8 cents per dollar
- The gap is LARGER for women of color: 63-74 cents per dollar

**Why the controlled gap matters most:**

The "84 cents" number includes differences in roles, industries, and levels. Some argue this isn't "real" discrimination — it's "choice."

But the 6-8% controlled gap? That's the same person, same role, same company, same performance. That IS the gap, and it's real.

**Why it compounds:**

Starting salary: $5K gap
After 5 years (3% annual raises): $15K gap
After 10 years: $35K gap
After 20 years: $100K+ gap
Lifetime: $400K-$1M gap

Every raise is percentage-based. 3% of less is always less. And each new employer often benchmarks off your current salary, perpetuating the gap.

**What actually works to close it:**

1. **Never disclose current salary.** It's illegal to require in many states (CA, NY, CO, WA, IL, and growing).

2. **Negotiate every single offer.** 68% of women don't. This is the single biggest controllable factor.

3. **Use market data, not feelings.** "The market rate is $X" is gender-neutral. "I feel I deserve more" triggers bias.

4. **Ask for the top of the range.** Studies show women ask for 6% less than men for identical roles.

Free, data-driven market analysis that doesn't care about your gender: underchozen.com`,
  },
  {
    id: "qa-review-preparation",
    question: "How should I prepare for my annual performance review to get the best raise?",
    category: "Tips",
    answer: `Most people prepare for their review the week before. Top earners prepare 12 months before.

**The 12-month system:**

**Weekly (2 minutes):**
Every Friday, write down one win from the week. Include a number. "Shipped feature X that improved conversion by 8%." Save these in a running doc.

**Monthly (10 minutes):**
Review your weekly wins. Group them into themes: revenue impact, cost savings, efficiency, leadership. Update your one-page "impact resume."

**Quarterly (30 minutes):**
Calculate your cumulative ROI for the company. Check if your market rate has changed. Have a brief "career growth" check-in with your manager (this is important — it creates a paper trail of continuous improvement).

**Review week (45 minutes):**

1. Print your impact resume. Numbers only. No feelings.
2. Add 3 market data points showing your percentile position.
3. Write your exact ask: a specific dollar amount, not "something in the range of..."
4. Prepare for ONE objection: "The budget is set for this cycle."

Your response to that objection:
"I understand the cycle budget is allocated. This is a market correction, not a standard increase. Can we discuss a timeline for alignment, or explore other compensation vehicles like equity, bonus, or title adjustment?"

**The data:**

Employees who present market data: 87% get a raise.
Employees who go in with just feelings: 32%.

Same meeting. Same manager. Same 30 minutes. 2.7x better outcome.

Build your case with market data: underchozen.com`,
  },
  {
    id: "qa-benefits-real-value",
    question: "How much are my job benefits really worth in dollars?",
    category: "Education",
    answer: `Most people dramatically undervalue their benefits package. Here's a realistic dollar breakdown:

**Health Insurance: $8,000-$20,000/year**
Check your pay stub — your employer typically covers 70-80% of the premium. For family plans, the employer contribution can exceed $20K. This is money you'd pay out-of-pocket otherwise.

**401K Match: $4,800-$14,000/year**
If your company matches 4% of your $120K salary, that's $4,800 in free money. Some companies match up to 6% or even dollar-for-dollar up to $7K. If you're not contributing at least up to the match, you are literally declining a raise.

**PTO: $5,000-$15,000/year**
Your daily rate × PTO days. At $130K with 25 days PTO, that's $12,500 in value. Unlimited PTO is often worth LESS (people take fewer days).

**Equity/RSUs: $0-$150,000+/year**
At public companies, RSUs are real cash. At FAANG L5, RSUs can be $80-150K/year. At startups, apply the 10-15% expected value discount.

**Other benefits people forget:**
- Life/disability insurance: $2-5K/year
- Professional development budget: $1-5K/year
- Commuter benefits: $1-3K/year
- Free meals (top tech): $5-10K/year
- Wellness stipend: $500-2K/year
- Parental leave (16+ weeks): $25-50K equivalent value

**Total hidden compensation: $30,000-$150,000+/year**

**The comparison trap:**

Offer A: $118K base + $55K benefits = $173K total
Offer B: $132K base + $18K benefits = $150K total

The "lower" base salary wins by $23K.

When comparing offers, ALWAYS ask for the total compensation breakdown.

Calculate your full total comp: underchozen.com`,
  },
  {
    id: "qa-age-salary-peak",
    question: "At what age do salaries typically peak?",
    category: "Education",
    answer: `The uncomfortable truth is that salary growth plateaus for most professionals around age 45-50. Here's the data:

**Salary growth by age bracket:**

- Ages 22-30: Rapid growth (10-15% per year, driven by early promotions and job changes)
- Ages 30-40: Strong growth (6-10% per year, senior-level transitions)
- Ages 40-50: Slowing growth (3-5% per year, approaching ceiling)
- Ages 50-55: Plateau (1-3% per year, mostly inflation adjustments)
- Ages 55+: Often flat or declining (especially after layoff/job change)

**Peak salary age by field:**
- Tech: ~42 (earlier due to ageism and rapid skill evolution)
- Finance: ~48 (seniority-driven, bonuses peak later)
- Healthcare: ~52 (experience is valued longer)
- Law: ~50 (partner earnings peak)
- Management/Executive: ~52-55 (C-suite peaks later)

**Why the plateau happens:**

1. Companies view senior employees as "expensive" relative to output
2. Title inflation masks salary stagnation (you get VP title, not VP money)
3. Technical skills need constant refreshing (and ageism penalizes those perceived as outdated)
4. Job-hopping leverage decreases (hiring bias against 50+ candidates)

**How to beat it:**

→ Transition to leadership/strategy (experience becomes the asset, not a liability)
→ Build expert reputation (conference speaking, thought leadership, advisory)
→ Negotiate equity and profit-sharing (ownership scales differently than salary)
→ Stay technically current (eliminating the perception that you're outdated)
→ Consider consulting (senior expertise commands $200-400+/hour)

Check your market rate at any career stage: underchozen.com`,
  },
  {
    id: "qa-company-size-effect",
    question: "Do bigger companies really pay more than startups?",
    category: "Data",
    answer: `Yes — significantly. But the full picture is more nuanced than just "bigger = more."

**Base salary by company size (mid-level SWE, same city):**

- Startup (< 50 employees): $95K
- Small company (50-200): $110K
- Mid-market (200-1,000): $128K
- Large (1,000-5,000): $142K
- Enterprise (5,000+): $158K

That's a **$63K spread** for the same job, same skills, same city.

**Why the gap exists:**

1. **Revenue per employee.** A 10,000-person company generating $50B has $5M per head to play with. A 30-person startup with $3M revenue has $100K per head. The math is simple.

2. **Retention competition.** Enterprises compete with other enterprises for talent. They have to match market rate or lose people.

3. **Structured pay bands.** Large companies have formal comp bands reviewed annually against market data. Less room for individual lowballing.

4. **Benefits scale.** Enterprise health plans, 401K matches, and perks add $20-40K in additional value.

**The startup trade-off:**

Startups compensate with:
- Equity (but 90% of startup equity = $0)
- Faster title growth (Senior in 2 years vs. 4)
- Broader scope (you wear many hats)
- Potential upside if the company succeeds

**The realistic calculation:**

Startup: $95K base + "$150K equity" (expected value: $15K) = $110K real comp
Enterprise: $158K base + $30K benefits + $20K bonus = $208K real comp

That's nearly a $100K gap.

Know your rate for YOUR company size: underchozen.com`,
  },
  {
    id: "qa-remote-pay-fair",
    question: "Is it fair for companies to pay remote workers less based on location?",
    category: "Education",
    answer: `This is one of the most debated compensation topics right now. Let me present both sides, then the data.

**The company argument:**
- "We pay market rate for your location"
- "Cost of living is lower where you live"
- "We need consistency across our pay structure"
- 68% of companies now adjust pay by location

**The employee argument:**
- Output hasn't changed — same work, same results
- Companies save $15-22K per remote worker in office costs
- Remote talent competes in a global market, not a local one
- You didn't move to a cheaper city for fun — you moved because you were priced out of the expensive one

**The math that companies hope you don't do:**

When you go remote from SF to Austin:
- Your salary cut: -$15K
- Company's office savings: +$15K
- Your housing savings: -$30K/year
- Your tax savings: -$8K/year (Texas has no state income tax)
- Your net purchasing power change: +$23K

The company saves $15K on you AND cuts your pay by $15K. That's a $30K swing in their favor.

**What's actually fair?**

That depends on your philosophy. But here's what works in negotiation:

1. Know the NATIONAL rate for your role (not location-adjusted)
2. Negotiate on value delivered, not ZIP code
3. Calculate your actual purchasing power (not just salary)
4. Frame it: "My remote work saves the company $X in overhead. I'd like to share in that value."

Compare both location-adjusted AND national rates: underchozen.com`,
  },
  {
    id: "qa-layoff-negotiation",
    question: "How do I negotiate salary after being laid off?",
    category: "Tips",
    answer: `Getting laid off actually gives you MORE negotiation power than most people realize — if you use the right strategy.

**Why layoffs increase your leverage:**

1. You have no current salary to anchor against (the employer can't lowball based on your "existing comp")
2. Severance gives you financial runway to negotiate patiently
3. The market recognizes that layoffs aren't performance-based — especially in tech
4. You can be honest about what you need without burning a bridge with a current employer

**The 5 mistakes to avoid:**

**Mistake 1: Panic-accepting the first offer**
Your severance is your negotiation window. If you have 3 months severance, you have 3 months to find the RIGHT offer, not the first one.

**Mistake 2: Anchoring to your old salary**
Your old company underpaid you (or at least didn't overpay you, or they wouldn't have cut you). Anchor to market data, not history.

**Mistake 3: Disclosing your previous salary**
Say: "I'm targeting the $X-$Y range based on market research and my skill set." That's it.

**Mistake 4: Forgetting to negotiate signing bonus**
Post-layoff is the BEST time for signing bonuses. "I'd need a $15-20K signing bonus to offset the transition gap" works 60-70% of the time because it's a one-time cost for the employer.

**Mistake 5: Rushing your start date**
Negotiate a later start: "Can we align on 3-4 weeks out?" Use that time to rest, prepare, and potentially collect additional unemployment benefits (varies by state).

**The reframe:**
You're not "looking for a job." You're "evaluating opportunities with the benefit of market perspective." Language matters.

Know your post-layoff market value: underchozen.com`,
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
  {
    id: "tt-total-comp",
    title: "Your salary is only 60% of your pay",
    category: "Education",
    hook: "You're ignoring 40% of your paycheck",
    script: `[Looking confused at pay stub]

"Wait — my salary is only 60% of what I actually get paid?"

[Text overlays appearing:]

"Base salary: $120K"
"401K match: $7K"
"Health insurance: $12K"
"RSUs: $25K"
"PTO value: $9K"

[Calculator sound]

"Total comp: $173K"

[Surprised face]

"That's $53K I wasn't counting. If you're comparing offers and only looking at base salary, you're making a $50K mistake."`,
    cta: "Calculate your total comp — underchozen.com",
    sound: "Money counting / cash register",
    duration: "25-30 sec",
  },
  {
    id: "tt-loyalty-tax",
    title: "The loyalty tax is costing you $500K",
    category: "Education",
    hook: "Staying loyal to your company is costing you half a million dollars",
    script: `[Sitting at desk, looking loyal]

"I've been at my company for 5 years. I'm loyal. They appreciate me."

[Text overlay: "Annual raise: 3.5%"]

"$100K → $114K after 5 years."

[Scene change — someone walking into a new office]

"My friend switched companies twice."

[Text overlay: "Job hop raise: 20%"]

"$100K → $144K after 5 years."

[Back to first person]

"That's $30K MORE per year. Over a career?"

[Text overlay: "$500K - $1M lifetime difference"]

[Staring at camera in disbelief]

"Loyalty tax is the most expensive tax you'll ever pay."`,
    cta: "Check if you're paying the loyalty tax — underchozen.com",
    sound: "Dramatic revelation / tax calculator",
    duration: "30-40 sec",
  },
  {
    id: "tt-skills-premium",
    title: "5 skills that add $20K to any salary",
    category: "Tips",
    hook: "Learn one of these skills and add $20K to your salary instantly",
    script: `[Pointing at camera]

"5 skills that add $20K+ to literally any role:"

[Text overlays with each skill]

"1. SQL + Data Analysis: +$20K"
"Every company says they're data-driven. Be the person who actually pulls the data."

"2. AI/ML tools: +$30K"
"Not building models — using AI tools effectively. Prompt engineering. Automation."

"3. Public speaking: +$25K"
"People who present well get promoted 2x faster."

"4. Financial modeling: +$25K"
"Speak the language of the people who decide your salary."

"5. Project management: +$20K"
"Every team needs someone who can ship."

[Back to camera]

"Stack 2-3 of these and you're in the top 5% of earners."`,
    cta: "See how skills affect YOUR market value — underchozen.com",
    sound: "Level up / gaming achievement",
    duration: "30-35 sec",
  },
  {
    id: "tt-company-size",
    title: "Same job, $60K difference based on company size",
    category: "Salary Data",
    hook: "The same job pays $60K more at a big company. Here's the data.",
    script: `[Looking at laptop, shocked]

"Same role. Same city. Same experience."

[Text overlays appearing one by one:]

"Startup (< 50 people): $95K"
"Mid-market (200-1K): $125K"
"Enterprise (5K+): $155K"

[Jaw drop]

"$60K difference. For the SAME JOB."

"But wait — startups offer equity, right?"

[Text overlay: "90% of startup equity = $0"]

"The trade-off is real. Bigger companies pay more base. Startups pay in hope."

[Looking at camera seriously]

"Know the gap before you choose."`,
    cta: "Compare salaries by company size — underchozen.com",
    sound: "Mind blown / revelation sound",
    duration: "25-30 sec",
  },
  {
    id: "tt-review-hack",
    title: "Hack your annual review in 60 seconds",
    category: "Tips",
    hook: "The one thing that guarantees a raise at your annual review",
    script: `[Professional setting]

"Want a raise at your annual review? Do this ONE thing:"

[Text overlay: "BRING DATA"]

"Not feelings. Not loyalty. Not 'I work hard.' DATA."

[Showing phone/laptop with market data]

"'Based on market data, the range for my role is $X to $Y. My current salary is at the Xth percentile.'"

[Text overlay: "87% success rate with data"]

"Employees who present market data get raises 87% of the time."

[Text overlay: "32% without data"]

"Without data? 32%."

[Looking at camera]

"Same conversation. 2.7x better outcome. Just add data."`,
    cta: "Get your market data in 30 seconds — underchozen.com",
    sound: "Corporate success / achievement",
    duration: "25-30 sec",
  },
];

/* ===== TIKTOK SLIDESHOWS ===== */
export type TikTokAccent = "neon-pink" | "electric-cyan" | "hot-orange" | "lime" | "vivid-purple";

export interface TikTokSlide {
  headline: string;
  subtext?: string;
  stat?: string;
  statLabel?: string;
  accent: TikTokAccent;
}

export interface TikTokSlideshow {
  id: string;
  title: string;
  category: string;
  caption: string;
  hashtags: string;
  slides: TikTokSlide[];
}

export const tiktokSlideshows: TikTokSlideshow[] = [
  {
    id: "tts-underpaid-signs",
    title: "3 Signs You're Underpaid",
    category: "Education",
    caption: "Are you leaving money on the table? Check these 3 signs. Link in bio.",
    hashtags: "#salary #underpaid #career #money #payday #careeradvice #salarytransparency",
    slides: [
      { headline: "3 Signs You're\nUNDERPAID", subtext: "Swipe to find out", accent: "neon-pink" },
      { headline: "No raise in\n12+ months", subtext: "Inflation = automatic pay cut of 3-4%", accent: "hot-orange" },
      { headline: "New hires make\nmore than you", subtext: "Companies pay market to attract, not retain", accent: "electric-cyan" },
      { headline: "You've never\nnegotiated", subtext: "73% never do. Those who do earn $18K more.", accent: "vivid-purple" },
      { headline: "Check yours\nFREE", stat: "30sec", statLabel: "underchozen.com", accent: "lime" },
    ],
  },
  {
    id: "tts-salary-by-city",
    title: "Same Job, Different City, Wild Pay Gap",
    category: "Salary Data",
    caption: "Location matters more than you think. Same role, massive pay differences.",
    hashtags: "#salary #techsalary #swe #developer #paygap #city #relocation #remotework",
    slides: [
      { headline: "Same Job\nDifferent City", subtext: "Software Engineer salaries by city", accent: "electric-cyan" },
      { headline: "San Francisco", stat: "$165K", statLabel: "Median SWE salary", accent: "vivid-purple" },
      { headline: "New York", stat: "$155K", statLabel: "Median SWE salary", accent: "neon-pink" },
      { headline: "Austin", stat: "$130K", statLabel: "Median SWE salary", accent: "hot-orange" },
      { headline: "That's a\n$35K gap", subtext: "Same skills. Same output. Different ZIP code.", accent: "lime" },
      { headline: "Check YOUR\ncity rate", stat: "FREE", statLabel: "underchozen.com", accent: "electric-cyan" },
    ],
  },
  {
    id: "tts-negotiation-email",
    title: "The Email That Gets You a Raise",
    category: "Tips",
    caption: "No meeting needed. Just send this email. 87% success rate with data.",
    hashtags: "#negotiation #salary #raise #careertips #email #money #careeradvice",
    slides: [
      { headline: "The Email That\nGets You a Raise", subtext: "No meeting needed. Just send this.", accent: "lime" },
      { headline: "Subject:\nCompensation\nDiscussion", subtext: "Professional. Non-threatening.", accent: "electric-cyan" },
      { headline: "Lead with\nIMPACT", subtext: "\"My work on [project] delivered [metric]\"", accent: "vivid-purple" },
      { headline: "Drop the\nDATA", subtext: "\"Market range for my role: $X-$Y\"", accent: "neon-pink" },
      { headline: "Make the ASK", subtext: "\"I'd love to discuss alignment\"", accent: "hot-orange" },
      { headline: "87% success\nrate", stat: "87%", statLabel: "When you lead with data", accent: "lime" },
    ],
  },
  {
    id: "tts-job-hop-math",
    title: "Job Hopping Math: $500K Difference",
    category: "Education",
    caption: "Loyalty is costing you half a million dollars. Here's the actual math.",
    hashtags: "#jobhopping #salary #career #money #loyalty #quitmyjob #careeradvice",
    slides: [
      { headline: "Loyalty Tax\nIs REAL", subtext: "Here's the math", accent: "hot-orange" },
      { headline: "Stay 5 Years", stat: "$114K", statLabel: "Started at $100K · 3.5% annual raises", accent: "neon-pink" },
      { headline: "Hop Every\n2-3 Years", stat: "$144K", statLabel: "Started at $100K · 20% hop raises", accent: "lime" },
      { headline: "Year 5 Gap", stat: "$30K/yr", statLabel: "That's $2,500/month you're missing", accent: "electric-cyan" },
      { headline: "Lifetime\nDifference", stat: "$500K+", statLabel: "Over a 30-year career", accent: "vivid-purple" },
    ],
  },
  {
    id: "tts-total-comp",
    title: "Your Salary Is Only 60% of Your Pay",
    category: "Education",
    caption: "Stop ignoring 40% of your compensation. Here's the full picture.",
    hashtags: "#totalcomp #salary #benefits #money #career #401k #stocks #compensation",
    slides: [
      { headline: "Your Salary\nIs Only 60%", subtext: "Of what you actually earn", accent: "vivid-purple" },
      { headline: "Base Salary", stat: "$120K", statLabel: "The part everyone talks about", accent: "electric-cyan" },
      { headline: "The Other 40%", subtext: "401K: $7K\nHealth: $12K\nRSUs: $25K\nPTO: $9K", accent: "lime" },
      { headline: "REAL Total", stat: "$173K", statLabel: "That's $53K you're ignoring", accent: "neon-pink" },
      { headline: "Compare\nTOTAL comp", stat: "FREE", statLabel: "underchozen.com", accent: "hot-orange" },
    ],
  },
  {
    id: "tts-ai-premium",
    title: "AI Skills = Instant 40% Raise",
    category: "Salary Data",
    caption: "The AI premium is real. Here's what AI skills add to your salary.",
    hashtags: "#AI #artificialintelligence #techsalary #career #machinelearning #money #skills",
    slides: [
      { headline: "AI Skills =\nInstant Raise", subtext: "The premium is real", accent: "electric-cyan" },
      { headline: "General SWE", stat: "$125K", statLabel: "Median mid-level salary", accent: "vivid-purple" },
      { headline: "ML Engineer", stat: "$175K", statLabel: "Same level, AI specialization", accent: "lime" },
      { headline: "The Premium", stat: "+40%", statLabel: "Just for knowing AI/ML", accent: "neon-pink" },
      { headline: "At Senior Level", stat: "+55%", statLabel: "The gap gets BIGGER with experience", accent: "hot-orange" },
      { headline: "Check your\nAI premium", stat: "FREE", statLabel: "underchozen.com", accent: "electric-cyan" },
    ],
  },
  {
    id: "tts-recession-proof",
    title: "5 Recession-Proof Salary Moves",
    category: "Tips",
    caption: "Economic uncertainty rising. Make these moves BEFORE it's too late.",
    hashtags: "#recession #salary #career #money #economy #jobsecurity #careeradvice",
    slides: [
      { headline: "Recession\nIs Coming", subtext: "5 moves to protect your salary", accent: "hot-orange" },
      { headline: "1. Know Your\nMarket Rate", subtext: "Companies lowball in downturns. Know your number.", accent: "electric-cyan" },
      { headline: "2. Negotiate\nNOW", subtext: "Budgets exist today. They won't in 6 months.", accent: "lime" },
      { headline: "3. Document\nYour ROI", subtext: "Clear impact = safe seat when cuts come", accent: "vivid-purple" },
      { headline: "4. Stack\nSafe Skills", subtext: "AI/ML, cybersecurity, data — zero layoffs", accent: "neon-pink" },
      { headline: "5. Check Your\nPosition", stat: "FREE", statLabel: "underchozen.com", accent: "lime" },
    ],
  },
  {
    id: "tts-gender-gap",
    title: "The Pay Gap Compounds to $1M",
    category: "Education",
    caption: "The gender pay gap isn't just unfair — it compounds over your entire career.",
    hashtags: "#paygap #equalpay #salary #career #women #diversity #salarytransparency",
    slides: [
      { headline: "The Pay Gap\nCOMPOUNDS", subtext: "It's worse than you think", accent: "neon-pink" },
      { headline: "Year 1 Gap", stat: "$5K", statLabel: "Seems small, right?", accent: "hot-orange" },
      { headline: "Year 10 Gap", stat: "$35K", statLabel: "Raises compound the difference", accent: "vivid-purple" },
      { headline: "Lifetime Gap", stat: "$1M", statLabel: "Over a full career", accent: "electric-cyan" },
      { headline: "Fight It\nWith DATA", subtext: "Gender-neutral market rates. Pure data.", accent: "lime" },
    ],
  },
  {
    id: "tts-review-cheat",
    title: "Annual Review Cheat Code",
    category: "Tips",
    caption: "87% success rate with this one simple change to your annual review strategy.",
    hashtags: "#annualreview #salary #raise #career #negotiation #work #careeradvice",
    slides: [
      { headline: "Annual Review\nCHEAT CODE", subtext: "87% get a raise doing this", accent: "lime" },
      { headline: "Without Data", stat: "32%", statLabel: "Chance of getting a raise", accent: "neon-pink" },
      { headline: "With Market\nData", stat: "87%", statLabel: "Chance of getting a raise", accent: "electric-cyan" },
      { headline: "That's 2.7x\nBetter Odds", subtext: "Same conversation. Just add data.", accent: "vivid-purple" },
      { headline: "Get Your Data\nin 30 Seconds", stat: "FREE", statLabel: "underchozen.com", accent: "lime" },
    ],
  },
  {
    id: "tts-company-size",
    title: "Same Job, $60K Gap by Company Size",
    category: "Salary Data",
    caption: "Company size determines your pay more than your skill. Here's the data.",
    hashtags: "#salary #startup #enterprise #career #money #compensation #techsalary",
    slides: [
      { headline: "Same Job\n$60K Gap", subtext: "Based on company size alone", accent: "vivid-purple" },
      { headline: "Startup", stat: "$95K", statLabel: "< 50 employees", accent: "hot-orange" },
      { headline: "Mid-Market", stat: "$125K", statLabel: "200-1K employees", accent: "electric-cyan" },
      { headline: "Enterprise", stat: "$155K", statLabel: "5K+ employees", accent: "lime" },
      { headline: "Know the gap\nbefore choosing", stat: "FREE", statLabel: "underchozen.com", accent: "neon-pink" },
    ],
  },
];
