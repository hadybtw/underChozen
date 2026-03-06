"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Used the email script word-for-word. Got a $22K raise within two weeks.",
    name: "Sarah K.",
    role: "Product Manager",
    city: "San Francisco",
    raise: "$22K",
  },
  {
    quote: "I had no idea I was 30% below market. The data gave me the confidence to negotiate for the first time.",
    name: "Marcus T.",
    role: "Software Engineer",
    city: "Austin",
    raise: "$18K",
  },
  {
    quote: "The objection handling section saved me. My manager said 'no budget' and I had the perfect response ready.",
    name: "Priya N.",
    role: "Data Analyst",
    city: "New York",
    raise: "$15K",
  },
  {
    quote: "Worth 100x the price. I was leaving $35K/year on the table and didn't even know it.",
    name: "James L.",
    role: "Marketing Manager",
    city: "Chicago",
    raise: "$35K",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: i * 0.08, duration: 0.5, ease }}
        >
          <GlassCard
            className="h-full group glass-hover transition-all duration-500 relative overflow-hidden p-5 sm:p-6"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-accent/[0.02] to-transparent rounded-2xl" />
            <div className="relative z-10">
              {/* Stars + Quote icon */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-warning/80 text-warning/80" />
                  ))}
                </div>
                <Quote className="w-3.5 h-3.5 text-accent/15" />
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground/75 leading-relaxed mb-5 font-light">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground/85">{t.name}</p>
                  <p className="text-xs text-muted/50">{t.role} &middot; {t.city}</p>
                </div>
                <div className="text-xs font-semibold text-positive/60 bg-positive/[0.06] px-2.5 py-1 rounded-lg">
                  +{t.raise}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
