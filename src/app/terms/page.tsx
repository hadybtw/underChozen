"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { Footer } from "@/components/footer";
import { ArrowLeft, FileText, Info, CreditCard, Lock, ShieldOff, RefreshCw } from "lucide-react";
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
    icon: FileText,
    title: "Agreement to Terms",
    content: `By accessing or using UnderChozen, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.

These terms apply to all users, visitors, and anyone who accesses our website or services. By using UnderChozen, you confirm that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.`,
  },
  {
    icon: Info,
    title: "Service Description",
    content: `UnderChozen provides salary analysis and negotiation strategy tools designed to help professionals understand their market value. Our service generates personalized compensation insights based on aggregated public salary data.

Important: UnderChozen is an informational tool only. Our analysis does not constitute financial, legal, or professional advice. Salary estimates are based on aggregated data and may not reflect your exact circumstances. You should use our insights as one data point alongside other resources when making compensation decisions.`,
  },
  {
    icon: CreditCard,
    title: "Payments & Refunds",
    content: `UnderChozen offers a free salary analysis tier and a paid negotiation strategy pack available as a one-time purchase of $29. All payments are processed securely through Stripe.

We offer a 30-day money-back guarantee on all paid purchases. If you are not satisfied with the negotiation strategy pack for any reason, contact us within 30 days of purchase for a full refund. No questions asked.

Prices are listed in USD and may be subject to applicable taxes depending on your location.`,
  },
  {
    icon: Lock,
    title: "Intellectual Property",
    content: `All content, features, and functionality of UnderChozen -- including but not limited to text, graphics, logos, and software -- are the exclusive property of UnderChozen and are protected by copyright, trademark, and other intellectual property laws.

Salary analyses and negotiation strategy packs generated for you are licensed for your personal, non-commercial use only. You may not redistribute, resell, or publicly share the generated content without prior written consent.`,
  },
  {
    icon: ShieldOff,
    title: "Limitation of Liability",
    content: `UnderChozen provides salary data and negotiation strategies on an "as is" basis. We make no guarantees regarding the accuracy of salary estimates, the effectiveness of negotiation strategies, or any specific outcome from using our service.

To the maximum extent permitted by law, UnderChozen shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service, including but not limited to lost wages, failed negotiations, or employment decisions made based on our analysis.`,
  },
  {
    icon: RefreshCw,
    title: "Modifications",
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of UnderChozen after any modifications constitutes acceptance of the updated terms.

We encourage you to review these terms periodically. If we make material changes, we will make reasonable efforts to notify users through our website or email (if you have provided one).

Effective date: March 4, 2026`,
  },
];

export default function TermsPage() {
  useEffect(() => {
    trackEvent("terms_view");
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
            Terms of <span className="italic text-accent/90">Service</span>
          </h1>
          <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
            Please read these terms carefully before using UnderChozen.
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
