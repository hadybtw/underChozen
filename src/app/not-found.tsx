"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-pattern opacity-15 absolute inset-0" />
        <div className="orb orb-purple w-[350px] h-[350px] top-[20%] left-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="text-center">
          <motion.h1
            className="text-[8rem] sm:text-[10rem] md:text-[12rem] heading-display leading-none text-shimmer mb-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            404
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted/60 font-medium mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            Page not found
          </motion.p>

          <motion.p
            className="text-sm text-muted/40 max-w-sm mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <Link href="/">
              <motion.span
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:brightness-110 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
