"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, TrendingUp, DollarSign } from "lucide-react";

function AnimatedStat({ target, duration = 2 }: { target: number; duration?: number }) {
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => Math.round(v).toLocaleString("en-US"));
  const [text, setText] = useState("0");

  useEffect(() => {
    const unsub = display.on("change", setText);
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.22, 1, 0.36, 1] as const,
    });
    return () => { unsub(); controls.stop(); };
  }, [target, motionVal, display, duration]);

  return <span>{text}</span>;
}

export function LiveCounter() {
  const [baseCount] = useState(() => {
    const daysSinceEpoch = Math.floor(Date.now() / 86400000);
    return 12847 + (daysSinceEpoch % 365) * 23;
  });

  const [extraCount, setExtraCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setExtraCount((c) => c + 1);
    }, 8000 + Math.random() * 12000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      value: baseCount + extraCount,
      label: "Analyses run",
      suffix: "",
      prefix: "",
    },
    {
      icon: DollarSign,
      value: 23400,
      label: "Avg. gap discovered",
      suffix: "",
      prefix: "$",
    },
    {
      icon: TrendingUp,
      value: 87,
      label: "Negotiation success rate",
      suffix: "%",
      prefix: "",
    },
  ];

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center">
            <stat.icon className="w-3.5 h-3.5 text-accent/70" />
          </div>
          <div>
            <p className="text-sm font-bold tabular-nums text-foreground/90">
              {stat.prefix}<AnimatedStat target={stat.value} />{stat.suffix}
            </p>
            <p className="text-[10px] text-muted/50 font-medium uppercase tracking-wider">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
