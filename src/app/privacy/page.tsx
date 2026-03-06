"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { Footer } from "@/components/footer";
import { ArrowLeft, Eye, Settings, HardDrive, Globe, UserCheck, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.5, ease },
};

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect the following types of information when you use UnderChozen:

- Salary data: Job title, experience level, location, industry, company size, and current salary. This data is used for analysis and is not stored permanently on our servers.
- Email address: Only if you voluntarily provide it for communications or account purposes.
- Payment information: Processed entirely by Stripe. We never store your credit card number, CVV, or full payment details on our servers.
- Usage data: Anonymous analytics such as page views and feature usage to help us improve the product.`,
  },
  {
    icon: Settings,
    title: "How We Use Your Data",
    content: `Your data is used exclusively for the following purposes:

- Analysis generation: Your salary inputs are used to calculate your market position and generate personalized insights.
- Email communications: If you opt in to receive emails, we may send product updates, salary trend reports, or promotional content. You can opt out at any time.
- Anonymous aggregation: We may use anonymized, aggregated salary data to improve our models and publish general market trend insights. No individual user can be identified from aggregated data.`,
  },
  {
    icon: HardDrive,
    title: "Data Storage",
    content: `We take a privacy-first approach to data storage:

- Salary analysis data is processed client-side in your browser. Your salary inputs are not transmitted to or stored on our servers beyond what is needed to render your results.
- Email addresses, if provided, are stored securely on our servers with industry-standard encryption.
- Payment data is handled entirely by Stripe, a PCI-DSS Level 1 certified payment processor. We only receive confirmation of payment status, not your full payment details.`,
  },
  {
    icon: Globe,
    title: "Third-Party Services",
    content: `We use the following third-party services:

- Stripe: For secure payment processing. Stripe's privacy policy governs how they handle your payment data.
- Analytics: We use anonymous analytics to understand how users interact with our product. No personally identifiable information is shared with analytics providers.

We do not sell, rent, or trade your personal data to any third parties. We do not share your individual salary data with employers, recruiters, or any other external parties.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: `You have the following rights regarding your data:

- Data deletion: You may request complete deletion of any personal data we hold about you by contacting us at support@underchozen.com. We will process deletion requests within 30 days.
- Opt out of emails: Every email we send includes an unsubscribe link. You can also contact us directly to be removed from all mailing lists.
- Data access: You may request a copy of any personal data we hold about you.
- Data portability: You may request your data in a machine-readable format.

These rights apply regardless of your location, though additional rights may apply under GDPR, CCPA, or other local privacy regulations.`,
  },
  {
    icon: Mail,
    title: "Contact",
    content: `If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:

Email: support@underchozen.com

We aim to respond to all privacy-related inquiries within 5 business days.

This Privacy Policy may be updated periodically. Changes will be posted on this page with an updated effective date. Your continued use of UnderChozen after changes constitutes acceptance of the updated policy.

Effective date: March 4, 2026`,
  },
];

export default function PrivacyPage() {
  useEffect(() => {
    trackEvent("privacy_view");
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-pattern opacity-15 absolute inset-0" />
        <div className="orb orb-purple w-[350px] h-[350px] -top-[100px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[250px] h-[250px] bottom-[20%] -left-[60px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 sm:py-12">
        {/* Navigation */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted/60 hover:text-foreground/80 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="info-label text-accent/60 mb-4 block">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-4">
            Privacy <span className="italic text-accent/90">Policy</span>
          </h1>
          <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
            Your data privacy is fundamental to how we build UnderChozen.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((section, i) => (
            <motion.div key={section.title} {...reveal} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              <GlassCard className="relative overflow-hidden">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
                    <section.icon className="w-4 h-4 text-accent/70" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-foreground/90 mt-1.5">
                    {section.title}
                  </h2>
                </div>
                <div className="text-sm text-muted/60 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="glow-line mb-12" />
          <p className="text-sm text-muted/50 mb-4 font-light">
            Ready to see where you stand?
          </p>
          <Link href="/">
            <motion.span
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-accent/15 hover:shadow-accent/30 hover:brightness-110 transition-all duration-300 cursor-pointer text-sm"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Analyze My Salary
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
