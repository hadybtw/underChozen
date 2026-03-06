"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { carouselPosts, type CarouselSlide, type CarouselPost } from "@/data/social-content";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  Check,
  Instagram,
  Layers,
  Eye,
  Hash,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ===== BRAND COLORS ===== */
const COLORS = {
  bg: "#06060B",
  fg: "#EEEEF0",
  muted: "#8E8E93",
  purple: "#8B6CFF",
  blue: "#5B8DEF",
  green: "#34D399",
  red: "#F87171",
  warning: "#FBBF24",
} as const;

const accentMap: Record<string, {
  primary: string;
  secondary: string;
  glow: string;
  bgGrad: [string, string, string];
}> = {
  purple: {
    primary: "#8B6CFF",
    secondary: "#5B8DEF",
    glow: "rgba(139,108,255,0.35)",
    bgGrad: ["#0D0A1A", "#120E26", "#0A0818"],
  },
  blue: {
    primary: "#5B8DEF",
    secondary: "#8B6CFF",
    glow: "rgba(91,141,239,0.35)",
    bgGrad: ["#070D1A", "#0A1228", "#060A16"],
  },
  green: {
    primary: "#34D399",
    secondary: "#5B8DEF",
    glow: "rgba(52,211,153,0.35)",
    bgGrad: ["#061410", "#0A1F1A", "#040F0C"],
  },
  red: {
    primary: "#F87171",
    secondary: "#FBBF24",
    glow: "rgba(248,113,113,0.35)",
    bgGrad: ["#1A0A0A", "#261010", "#180808"],
  },
  warning: {
    primary: "#FBBF24",
    secondary: "#F87171",
    glow: "rgba(251,191,36,0.35)",
    bgGrad: ["#1A1408", "#26200C", "#181206"],
  },
};

/* ===== SLIDE PREVIEW (display) ===== */
function SlidePreview({
  slide,
  slideIndex,
  totalSlides,
  hideWatermark = false,
}: {
  slide: CarouselSlide;
  slideIndex: number;
  totalSlides: number;
  hideWatermark?: boolean;
}) {
  const accent = accentMap[slide.accent || "purple"];

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: 405,
        height: 506,
        background: `linear-gradient(145deg, ${accent.bgGrad[0]}, ${accent.bgGrad[1]}, ${accent.bgGrad[2]})`,
        borderRadius: 16,
        fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Huge accent orb top */}
      <div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          top: slide.type === "cta" ? "10%" : "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(circle, ${accent.primary}18 0%, ${accent.primary}08 40%, transparent 70%)`,
        }}
      />

      {/* Secondary accent orb */}
      <div
        className="absolute"
        style={{
          width: 350,
          height: 350,
          bottom: "-20%",
          right: "-20%",
          background: `radial-gradient(circle, ${accent.secondary}10 0%, transparent 70%)`,
        }}
      />

      {/* Decorative accent line - top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 120,
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${accent.primary}60, transparent)`,
        }}
      />

      {/* Geometric decoration */}
      <div
        className="absolute"
        style={{
          width: 80,
          height: 80,
          top: 40,
          right: 30,
          border: `1px solid ${accent.primary}12`,
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 40,
          height: 40,
          bottom: 60,
          left: 25,
          border: `1px solid ${accent.secondary}10`,
          borderRadius: 8,
          transform: "rotate(45deg)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-7">
        {/* Top bar - only shown in preview, not download */}
        {!hideWatermark && (
          <div className="flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                  boxShadow: `0 2px 10px ${accent.primary}30`,
                }}
              >
                <span className="text-white text-[9px] font-black tracking-tight">UC</span>
              </div>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: `${accent.primary}50` }}
              >
                UnderChozen
              </span>
            </div>
            <span
              className="text-[10px] font-medium tabular-nums"
              style={{ color: `${COLORS.fg}20` }}
            >
              {slideIndex + 1}/{totalSlides}
            </span>
          </div>
        )}

        {/* Spacer when watermark hidden */}
        {hideWatermark && <div className="mb-auto" />}

        {/* Main content area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
          {slide.type === "hook" && (
            <>
              {/* Small accent pill */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5"
                style={{
                  background: `${accent.primary}12`,
                  border: `1px solid ${accent.primary}18`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent.primary }}
                />
                <span
                  className="text-[9px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: `${accent.primary}90` }}
                >
                  Swipe to learn
                </span>
              </div>
              <h2
                className="text-[36px] leading-[1.02] font-bold mb-5"
                style={{
                  color: COLORS.fg,
                  letterSpacing: "-0.03em",
                }}
              >
                {slide.headline.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span
                        style={{
                          background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              {slide.subtext && (
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: `${COLORS.muted}90`, maxWidth: 290 }}
                >
                  {slide.subtext}
                </p>
              )}
            </>
          )}

          {slide.type === "stat" && (
            <>
              <p
                className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5"
                style={{ color: `${accent.primary}80` }}
              >
                {slide.headline}
              </p>
              {/* Big stat with accent bar */}
              <div className="relative mb-4">
                <div
                  className="absolute -inset-4 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle, ${accent.primary}10 0%, transparent 70%)`,
                  }}
                />
                <p
                  className="relative text-[80px] font-black tracking-tighter leading-none"
                  style={{
                    background: `linear-gradient(180deg, ${accent.primary}, ${accent.primary}90)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {slide.stat}
                </p>
              </div>
              {/* Accent divider */}
              <div
                className="w-10 h-1 rounded-full mb-4"
                style={{ background: `linear-gradient(90deg, ${accent.primary}60, ${accent.secondary}40)` }}
              />
              {slide.statLabel && (
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: `${COLORS.muted}70`, maxWidth: 270 }}
                >
                  {slide.statLabel}
                </p>
              )}
            </>
          )}

          {slide.type === "content" && (
            <>
              <h3
                className="text-[28px] leading-[1.08] font-bold mb-5"
                style={{
                  color: COLORS.fg,
                  letterSpacing: "-0.02em",
                }}
              >
                {slide.headline.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              {slide.subtext && (
                <div
                  className="text-left w-full rounded-2xl p-5"
                  style={{
                    background: `linear-gradient(145deg, ${accent.primary}08, ${accent.secondary}05)`,
                    border: `1px solid ${accent.primary}15`,
                  }}
                >
                  {slide.subtext.split("\n").map((line, i, arr) => (
                    <p
                      key={i}
                      className="text-[13px] leading-[1.65]"
                      style={{
                        color: line.startsWith("→")
                          ? `${COLORS.fg}cc`
                          : line.startsWith("\"")
                          ? `${accent.primary}90`
                          : `${COLORS.muted}75`,
                        marginBottom: i < arr.length - 1 ? 5 : 0,
                        fontWeight: line.startsWith("→") ? 500 : 400,
                        fontStyle: line.startsWith("\"") ? "italic" : "normal",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}

          {slide.type === "list" && (
            <>
              {/* Large number badge */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}20, ${accent.primary}10)`,
                  border: `1px solid ${accent.primary}30`,
                  boxShadow: `0 4px 20px ${accent.primary}15`,
                }}
              >
                <span
                  className="text-2xl font-black"
                  style={{ color: accent.primary }}
                >
                  {slide.listItems?.[0]}
                </span>
              </div>
              <h3
                className="text-[26px] leading-[1.08] font-bold mb-4"
                style={{
                  color: COLORS.fg,
                  letterSpacing: "-0.02em",
                }}
              >
                {slide.headline.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              {/* Accent divider */}
              <div
                className="w-8 h-1 rounded-full mb-4"
                style={{ background: `${accent.primary}40` }}
              />
              {slide.subtext && (
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: `${COLORS.muted}70`, maxWidth: 300 }}
                >
                  {slide.subtext}
                </p>
              )}
            </>
          )}

          {slide.type === "cta" && (
            <>
              {/* Sparkle icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, ${accent.primary}18, ${accent.secondary}12)`,
                  border: `1px solid ${accent.primary}25`,
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: accent.primary }} />
              </div>
              <h3
                className="text-[32px] leading-[1.05] font-bold mb-5"
                style={{
                  color: COLORS.fg,
                  letterSpacing: "-0.02em",
                }}
              >
                {slide.headline.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              {slide.subtext && (
                <p
                  className="text-[13px] leading-relaxed mb-6"
                  style={{ color: `${COLORS.muted}70`, maxWidth: 280 }}
                >
                  {slide.subtext}
                </p>
              )}
              {slide.ctaText && (
                <div
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                    color: "#fff",
                    boxShadow: `0 4px 20px ${accent.primary}40, 0 0 40px ${accent.primary}15`,
                    letterSpacing: "0.02em",
                  }}
                >
                  {slide.ctaText}
                  <span style={{ fontSize: 16 }}>→</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom accent bar */}
        <div className="flex items-center gap-2 mt-auto">
          <div
            className="flex-1 h-[2px] rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent.primary}50, ${accent.secondary}30, transparent)`,
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: `${accent.primary}40` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ===== CANVAS DOWNLOAD RENDERER ===== */
// Pure Canvas 2D API — no html2canvas dependency, pixel-perfect output
const CANVAS_W = 1080;
const CANVAS_H = 1350;
const SCALE = CANVAS_W / 405; // ~2.667x

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderSlideToCanvas(slide: CarouselSlide): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;

  const accent = accentMap[slide.accent || "purple"];
  const S = SCALE;

  // --- Background gradient ---
  const bgGrad = ctx.createLinearGradient(0, 0, CANVAS_W * 0.4, CANVAS_H);
  bgGrad.addColorStop(0, accent.bgGrad[0]);
  bgGrad.addColorStop(0.5, accent.bgGrad[1]);
  bgGrad.addColorStop(1, accent.bgGrad[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // --- Accent orb (radial gradient) ---
  const orbGrad = ctx.createRadialGradient(
    CANVAS_W / 2,
    slide.type === "cta" ? CANVAS_H * 0.35 : CANVAS_H * 0.1,
    0,
    CANVAS_W / 2,
    slide.type === "cta" ? CANVAS_H * 0.35 : CANVAS_H * 0.1,
    CANVAS_W * 0.65
  );
  const [ar, ag, ab] = hexToRgb(accent.primary);
  orbGrad.addColorStop(0, `rgba(${ar},${ag},${ab},0.12)`);
  orbGrad.addColorStop(0.4, `rgba(${ar},${ag},${ab},0.05)`);
  orbGrad.addColorStop(1, "transparent");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // --- Secondary orb ---
  const [sr, sg, sb] = hexToRgb(accent.secondary);
  const orb2 = ctx.createRadialGradient(
    CANVAS_W * 0.85, CANVAS_H * 0.85, 0,
    CANVAS_W * 0.85, CANVAS_H * 0.85, CANVAS_W * 0.45
  );
  orb2.addColorStop(0, `rgba(${sr},${sg},${sb},0.07)`);
  orb2.addColorStop(1, "transparent");
  ctx.fillStyle = orb2;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // --- Top accent line ---
  const lineGrad = ctx.createLinearGradient(CANVAS_W * 0.3, 0, CANVAS_W * 0.7, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.5)`);
  lineGrad.addColorStop(1, "transparent");
  ctx.fillStyle = lineGrad;
  drawRoundedRect(ctx, CANVAS_W * 0.35, 0, CANVAS_W * 0.3, 3 * S, 2);
  ctx.fill();

  // --- Decorative ring ---
  ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.06)`;
  ctx.lineWidth = 1 * S;
  ctx.beginPath();
  ctx.arc(CANVAS_W * 0.88, 110 * S, 40 * S, 0, Math.PI * 2);
  ctx.stroke();

  // --- Decorative diamond ---
  ctx.save();
  ctx.translate(25 * S + 20 * S, (CANVAS_H - 60 * S) + 20 * S);
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = `rgba(${sr},${sg},${sb},0.06)`;
  ctx.lineWidth = 1 * S;
  ctx.strokeRect(-20 * S, -20 * S, 40 * S, 40 * S);
  ctx.restore();

  // --- Content rendering ---
  const cx = CANVAS_W / 2;
  const cy = CANVAS_H / 2;

  function setFont(weight: string, size: number) {
    ctx.font = `${weight} ${size * S}px Inter, "DM Sans", system-ui, sans-serif`;
  }

  function wrapText(text: string, maxW: number, lineH: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxW && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  if (slide.type === "hook") {
    // Accent pill
    setFont("700", 9);
    const pillText = "SWIPE TO LEARN";
    const pillW = ctx.measureText(pillText).width + 30 * S;
    const pillH = 28 * S;
    const pillX = cx - pillW / 2;
    const pillY = cy - 110 * S;

    ctx.fillStyle = `rgba(${ar},${ag},${ab},0.1)`;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 14 * S);
    ctx.fill();
    ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.15)`;
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 14 * S);
    ctx.stroke();

    // Dot
    ctx.fillStyle = accent.primary;
    ctx.beginPath();
    ctx.arc(pillX + 12 * S, pillY + pillH / 2, 2 * S, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${ar},${ag},${ab},0.7)`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = `${0.2 * S}px`;
    ctx.fillText(pillText, cx + 4 * S, pillY + pillH / 2);
    ctx.letterSpacing = "0px";

    // Headline
    const headlineLines = slide.headline.split("\n");
    setFont("700", 36);
    const headlineY = cy - 40 * S;
    const lineH = 40 * S;
    headlineLines.forEach((line, i) => {
      const y = headlineY + i * lineH;
      const isLast = i === headlineLines.length - 1;

      if (isLast) {
        // Gradient text effect - draw twice with different colors
        const grad = ctx.createLinearGradient(
          cx - 150 * S, y, cx + 150 * S, y
        );
        grad.addColorStop(0, accent.primary);
        grad.addColorStop(1, accent.secondary);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = COLORS.fg;
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(line, cx, y);
    });

    // Subtext
    if (slide.subtext) {
      setFont("400", 14);
      ctx.fillStyle = `rgba(142,142,147,0.65)`;
      ctx.textAlign = "center";
      const stY = headlineY + headlineLines.length * lineH + 16 * S;
      const stLines = wrapText(slide.subtext, 290 * S, 20 * S);
      stLines.forEach((line, i) => {
        ctx.fillText(line, cx, stY + i * 20 * S);
      });
    }
  }

  if (slide.type === "stat") {
    // Label
    setFont("700", 10);
    ctx.fillStyle = `rgba(${ar},${ag},${ab},0.6)`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = `${0.25 * S}px`;
    ctx.fillText(slide.headline.toUpperCase(), cx, cy - 90 * S);
    ctx.letterSpacing = "0px";

    // Stat glow
    const statGlow = ctx.createRadialGradient(cx, cy - 10 * S, 0, cx, cy - 10 * S, 120 * S);
    statGlow.addColorStop(0, `rgba(${ar},${ag},${ab},0.08)`);
    statGlow.addColorStop(1, "transparent");
    ctx.fillStyle = statGlow;
    ctx.fillRect(0, cy - 130 * S, CANVAS_W, 240 * S);

    // Big stat
    setFont("900", 80);
    const statGrad = ctx.createLinearGradient(cx, cy - 60 * S, cx, cy + 30 * S);
    statGrad.addColorStop(0, accent.primary);
    statGrad.addColorStop(1, `${accent.primary}CC`);
    ctx.fillStyle = statGrad;
    ctx.textAlign = "center";
    ctx.fillText(slide.stat || "", cx, cy - 5 * S);

    // Divider bar
    const barGrad = ctx.createLinearGradient(cx - 15 * S, 0, cx + 15 * S, 0);
    barGrad.addColorStop(0, `rgba(${ar},${ag},${ab},0.5)`);
    barGrad.addColorStop(1, `rgba(${sr},${sg},${sb},0.3)`);
    ctx.fillStyle = barGrad;
    drawRoundedRect(ctx, cx - 14 * S, cy + 35 * S, 28 * S, 3 * S, 2);
    ctx.fill();

    // Stat label
    if (slide.statLabel) {
      setFont("400", 13);
      ctx.fillStyle = `rgba(142,142,147,0.55)`;
      ctx.textAlign = "center";
      const slLines = wrapText(slide.statLabel, 270 * S, 19 * S);
      slLines.forEach((line, i) => {
        ctx.fillText(line, cx, cy + 55 * S + i * 19 * S);
      });
    }
  }

  if (slide.type === "content") {
    // Headline
    const headlineLines = slide.headline.split("\n");
    setFont("700", 28);
    ctx.fillStyle = COLORS.fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const hlY = cy - 80 * S;
    headlineLines.forEach((line, i) => {
      ctx.fillText(line, cx, hlY + i * 34 * S);
    });

    // Content card
    if (slide.subtext) {
      const cardX = 32 * S;
      const cardY = hlY + headlineLines.length * 34 * S + 16 * S;
      const cardW = CANVAS_W - 64 * S;
      const lines = slide.subtext.split("\n");
      const lineH = 22 * S;
      const cardH = lines.length * lineH + 32 * S;

      // Card background
      const cardGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
      cardGrad.addColorStop(0, `rgba(${ar},${ag},${ab},0.06)`);
      cardGrad.addColorStop(1, `rgba(${sr},${sg},${sb},0.03)`);
      ctx.fillStyle = cardGrad;
      drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 16 * S);
      ctx.fill();

      // Card border
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.12)`;
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 16 * S);
      ctx.stroke();

      // Card text
      setFont("400", 13);
      ctx.textAlign = "left";
      lines.forEach((line, i) => {
        const y = cardY + 18 * S + i * lineH;
        if (line.startsWith("→")) {
          ctx.fillStyle = `${COLORS.fg}cc`;
          setFont("500", 13);
        } else if (line.startsWith("\"")) {
          ctx.fillStyle = `rgba(${ar},${ag},${ab},0.7)`;
          setFont("400", 13);
          ctx.save();
          ctx.font = `italic ${13 * S}px Inter, "DM Sans", system-ui, sans-serif`;
        } else {
          ctx.fillStyle = `rgba(142,142,147,0.6)`;
          setFont("400", 13);
        }
        ctx.fillText(line, cardX + 18 * S, y);
        if (line.startsWith("\"")) ctx.restore();
      });
    }
  }

  if (slide.type === "list") {
    // Number badge
    const badgeSize = 16 * S;
    const badgeX = cx - badgeSize;
    const badgeY = cy - 105 * S;

    const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeSize * 2, badgeY + badgeSize * 2);
    badgeGrad.addColorStop(0, `rgba(${ar},${ag},${ab},0.18)`);
    badgeGrad.addColorStop(1, `rgba(${ar},${ag},${ab},0.08)`);
    ctx.fillStyle = badgeGrad;
    drawRoundedRect(ctx, badgeX, badgeY, badgeSize * 2, badgeSize * 2, 14 * S);
    ctx.fill();

    ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.25)`;
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, badgeX, badgeY, badgeSize * 2, badgeSize * 2, 14 * S);
    ctx.stroke();

    setFont("900", 24);
    ctx.fillStyle = accent.primary;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(slide.listItems?.[0] || "", cx, badgeY + badgeSize);

    // Headline
    const headlineLines = slide.headline.split("\n");
    setFont("700", 26);
    ctx.fillStyle = COLORS.fg;
    ctx.textAlign = "center";
    const hlY = cy - 30 * S;
    headlineLines.forEach((line, i) => {
      ctx.fillText(line, cx, hlY + i * 32 * S);
    });

    // Divider
    ctx.fillStyle = `rgba(${ar},${ag},${ab},0.3)`;
    drawRoundedRect(ctx, cx - 12 * S, hlY + headlineLines.length * 32 * S + 8 * S, 24 * S, 3 * S, 2);
    ctx.fill();

    // Subtext
    if (slide.subtext) {
      setFont("400", 13);
      ctx.fillStyle = `rgba(142,142,147,0.55)`;
      ctx.textAlign = "center";
      const stY = hlY + headlineLines.length * 32 * S + 26 * S;
      const stLines = wrapText(slide.subtext, 300 * S, 19 * S);
      stLines.forEach((line, i) => {
        ctx.fillText(line, cx, stY + i * 19 * S);
      });
    }
  }

  if (slide.type === "cta") {
    // Sparkle icon placeholder (diamond shape)
    const iconSize = 12 * S;
    const iconY = cy - 90 * S;

    const iconBg = ctx.createLinearGradient(cx - iconSize, iconY - iconSize, cx + iconSize, iconY + iconSize);
    iconBg.addColorStop(0, `rgba(${ar},${ag},${ab},0.15)`);
    iconBg.addColorStop(1, `rgba(${sr},${sg},${sb},0.08)`);
    ctx.fillStyle = iconBg;
    drawRoundedRect(ctx, cx - iconSize, iconY - iconSize, iconSize * 2, iconSize * 2, 10 * S);
    ctx.fill();

    // Draw a simple star/sparkle
    ctx.fillStyle = accent.primary;
    ctx.beginPath();
    const starR = 6 * S;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.lineTo(cx + Math.cos(angle) * starR, iconY + Math.sin(angle) * starR);
      const midAngle = angle + Math.PI / 4;
      ctx.lineTo(cx + Math.cos(midAngle) * starR * 0.4, iconY + Math.sin(midAngle) * starR * 0.4);
    }
    ctx.closePath();
    ctx.fill();

    // Headline
    const headlineLines = slide.headline.split("\n");
    setFont("700", 32);
    ctx.fillStyle = COLORS.fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const hlY = cy - 25 * S;
    headlineLines.forEach((line, i) => {
      ctx.fillText(line, cx, hlY + i * 38 * S);
    });

    // Subtext
    if (slide.subtext) {
      setFont("400", 13);
      ctx.fillStyle = `rgba(142,142,147,0.55)`;
      const stY = hlY + headlineLines.length * 38 * S + 14 * S;
      const stLines = wrapText(slide.subtext, 280 * S, 19 * S);
      stLines.forEach((line, i) => {
        ctx.fillText(line, cx, stY + i * 19 * S);
      });

      // CTA button
      if (slide.ctaText) {
        setFont("700", 14);
        const btnText = slide.ctaText + "  →";
        const btnW = ctx.measureText(btnText).width + 50 * S;
        const btnH = 45 * S;
        const btnX = cx - btnW / 2;
        const btnY = stY + stLines.length * 19 * S + 20 * S;

        // Button glow
        const glowGrad = ctx.createRadialGradient(cx, btnY + btnH / 2, 0, cx, btnY + btnH / 2, btnW * 0.8);
        glowGrad.addColorStop(0, `rgba(${ar},${ag},${ab},0.2)`);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(btnX - 20 * S, btnY - 10 * S, btnW + 40 * S, btnH + 20 * S);

        // Button
        const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
        btnGrad.addColorStop(0, accent.primary);
        btnGrad.addColorStop(1, accent.secondary);
        ctx.fillStyle = btnGrad;
        drawRoundedRect(ctx, btnX, btnY, btnW, btnH, 16 * S);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(btnText, cx, btnY + btnH / 2);
      }
    }
  }

  // --- Bottom accent bar ---
  const barY = CANVAS_H - 22 * S;
  const barGrad2 = ctx.createLinearGradient(30 * S, barY, CANVAS_W * 0.7, barY);
  barGrad2.addColorStop(0, `rgba(${ar},${ag},${ab},0.4)`);
  barGrad2.addColorStop(0.6, `rgba(${sr},${sg},${sb},0.2)`);
  barGrad2.addColorStop(1, "transparent");
  ctx.fillStyle = barGrad2;
  drawRoundedRect(ctx, 30 * S, barY, CANVAS_W - 90 * S, 2 * S, 1);
  ctx.fill();

  // Dot
  ctx.fillStyle = `rgba(${ar},${ag},${ab},0.3)`;
  ctx.beginPath();
  ctx.arc(CANVAS_W - 40 * S, barY + 1 * S, 2 * S, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}

/* ===== COPY BUTTON ===== */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-[10px] text-accent/70 hover:text-accent transition-colors cursor-pointer"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ===== CAROUSEL PREVIEW ===== */
function CarouselPreview({ post }: { post: CarouselPost }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [captionCopied, setCaptionCopied] = useState(false);
  const [hashtagsCopied, setHashtagsCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const slideRef = useRef<HTMLDivElement>(null);
  const [slideScale, setSlideScale] = useState(1);

  // Measure container width and compute scale
  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setSlideScale(Math.min(w / 405, 1));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prev = () => setCurrentSlide((s) => Math.max(0, s - 1));
  const next = () => setCurrentSlide((s) => Math.min(post.slides.length - 1, s + 1));

  const copyCaption = useCallback(async () => {
    await navigator.clipboard.writeText(post.caption);
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 2000);
  }, [post.caption]);

  const copyHashtags = useCallback(async () => {
    await navigator.clipboard.writeText(post.hashtags);
    setHashtagsCopied(true);
    setTimeout(() => setHashtagsCopied(false), 2000);
  }, [post.hashtags]);

  const downloadCurrentSlide = useCallback(async () => {
    setDownloading(true);
    try {
      const canvas = renderSlideToCanvas(post.slides[currentSlide]);
      downloadCanvas(canvas, `${post.id}-slide-${currentSlide + 1}.png`);
    } finally {
      setDownloading(false);
    }
  }, [post, currentSlide]);

  const downloadAllSlides = useCallback(async () => {
    setDownloadingAll(true);
    try {
      for (let i = 0; i < post.slides.length; i++) {
        setDownloadProgress(`${i + 1} of ${post.slides.length}`);
        const canvas = renderSlideToCanvas(post.slides[i]);
        downloadCanvas(canvas, `${post.id}-slide-${i + 1}.png`);
        // Small delay between downloads so browser doesn't block them
        await new Promise((r) => setTimeout(r, 400));
      }
    } finally {
      setDownloadingAll(false);
      setDownloadProgress("");
    }
  }, [post]);

  return (
    <div className="space-y-5">
      {/* Slide viewer */}
      <div className="relative w-full max-w-[405px] mx-auto">
        <div
          ref={slideRef}
          className="relative w-full overflow-hidden rounded-2xl border border-white/[0.06]"
          style={{ aspectRatio: "405/506" }}
        >
          <div className="absolute inset-0 origin-top-left" style={{ width: 405, height: 506, transform: `scale(${slideScale})` }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease }}
              >
                <SlidePreview
                  slide={post.slides[currentSlide]}
                  slideIndex={currentSlide}
                  totalSlides={post.slides.length}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows — inside on mobile, outside on desktop */}
        <button
          onClick={prev}
          disabled={currentSlide === 0}
          className="absolute left-2 sm:left-[-48px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass flex items-center justify-center disabled:opacity-20 hover:bg-white/[0.06] transition-all cursor-pointer disabled:cursor-default z-20"
        >
          <ChevronLeft className="w-4 h-4 text-foreground/70" />
        </button>
        <button
          onClick={next}
          disabled={currentSlide === post.slides.length - 1}
          className="absolute right-2 sm:right-[-48px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass flex items-center justify-center disabled:opacity-20 hover:bg-white/[0.06] transition-all cursor-pointer disabled:cursor-default z-20"
        >
          <ChevronRight className="w-4 h-4 text-foreground/70" />
        </button>
      </div>

      {/* Download buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={downloadCurrentSlide}
          disabled={downloading}
          className="flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl bg-accent/[0.08] border border-accent/15 text-accent/80 hover:bg-accent/[0.14] disabled:opacity-50 transition-all cursor-pointer disabled:cursor-default"
        >
          {downloading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          {downloading ? "Exporting..." : "Download Slide"}
        </button>
        <button
          onClick={downloadAllSlides}
          disabled={downloadingAll}
          className="flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent/[0.1] to-accent-blue/[0.1] border border-accent/15 text-foreground/75 hover:from-accent/[0.16] hover:to-accent-blue/[0.16] disabled:opacity-50 transition-all cursor-pointer disabled:cursor-default"
        >
          {downloadingAll ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Downloading {downloadProgress}
            </>
          ) : (
            <>
              <Layers className="w-3.5 h-3.5" />
              Download All {post.slides.length} Slides
            </>
          )}
        </button>
      </div>

      {/* Slide dots */}
      <div className="flex items-center justify-center gap-1.5">
        {post.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="cursor-pointer transition-all"
            style={{
              width: currentSlide === i ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: currentSlide === i
                ? `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.blue})`
                : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>

      {/* Slide type badges */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {post.slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              currentSlide === i
                ? "bg-accent/15 text-accent/90 border border-accent/20"
                : "bg-white/[0.03] text-muted/40 border border-white/[0.05] hover:bg-white/[0.06]"
            }`}
          >
            {s.type}
          </button>
        ))}
      </div>

      {/* Caption + Hashtags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-muted/50" />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50">Caption</span>
            </div>
            <button
              onClick={copyCaption}
              className="flex items-center gap-1 text-[10px] text-accent/70 hover:text-accent transition-colors cursor-pointer"
            >
              {captionCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {captionCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-muted/60 leading-relaxed whitespace-pre-line">{post.caption}</p>
        </div>
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Hash className="w-3 h-3 text-muted/50" />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50">Hashtags</span>
            </div>
            <button
              onClick={copyHashtags}
              className="flex items-center gap-1 text-[10px] text-accent/70 hover:text-accent transition-colors cursor-pointer"
            >
              {hashtagsCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {hashtagsCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-accent-blue/60 leading-relaxed">{post.hashtags}</p>
        </div>
      </div>
    </div>
  );
}

/* ===== MAIN PAGE ===== */
export default function SocialPage() {
  const [selectedPost, setSelectedPost] = useState<CarouselPost>(carouselPosts[0]);
  const [view, setView] = useState<"gallery" | "preview">("gallery");

  return (
    <main id="main-content" className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-purple w-[400px] h-[400px] -top-[120px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[250px] h-[250px] top-[60%] -right-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="info-label text-accent/60">Social Content Studio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl heading-display mb-2">
                Instagram Content <span className="italic text-accent/90">Generator</span>
              </h1>
              <p className="text-sm text-muted/50 max-w-md">
                10 ready-to-post carousel posts. Click any post to preview slides, copy captions, and download.
              </p>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 glass rounded-lg p-1">
              <button
                onClick={() => setView("gallery")}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  view === "gallery" ? "bg-accent/15 text-accent" : "text-muted/50 hover:text-foreground/70"
                }`}
              >
                <Layers className="w-3 h-3" />
                Gallery
              </button>
              <button
                onClick={() => setView("preview")}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  view === "preview" ? "bg-accent/15 text-accent" : "text-muted/50 hover:text-foreground/70"
                }`}
              >
                <Eye className="w-3 h-3" />
                Preview
              </button>
            </div>
          </div>
        </motion.div>

        {view === "gallery" ? (
          /* ===== GALLERY VIEW ===== */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {carouselPosts.map((post, i) => {
              const postAccent = accentMap[post.slides[0].accent || "purple"];
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease }}
                >
                  <GlassCard
                    className="cursor-pointer glass-hover transition-all duration-300 group relative overflow-hidden"
                    onClick={() => { setSelectedPost(post); setView("preview"); }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: `linear-gradient(145deg, ${postAccent.primary}08, transparent)`,
                      }}
                    />
                    <div className="relative z-10">
                      {/* Mini slide preview */}
                      <div
                        className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4"
                        style={{
                          background: `linear-gradient(145deg, ${postAccent.bgGrad[0]}, ${postAccent.bgGrad[1]})`,
                          border: `1px solid ${postAccent.primary}15`,
                        }}
                      >
                        {/* Mini orb */}
                        <div
                          className="absolute"
                          style={{
                            width: "80%",
                            height: "80%",
                            top: "-20%",
                            left: "10%",
                            background: `radial-gradient(circle, ${postAccent.primary}12 0%, transparent 70%)`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                          <div>
                            <p
                              className="text-lg leading-tight font-bold mb-2"
                              style={{
                                color: COLORS.fg,
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {post.slides[0].headline.split("\n").map((line, li, arr) => (
                                <span key={li}>
                                  {li === arr.length - 1 ? (
                                    <span style={{
                                      background: `linear-gradient(135deg, ${postAccent.primary}, ${postAccent.secondary})`,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                    }}>
                                      {line}
                                    </span>
                                  ) : (
                                    line
                                  )}
                                  {li < arr.length - 1 && <br />}
                                </span>
                              ))}
                            </p>
                            <p className="text-[10px]" style={{ color: `${COLORS.muted}60` }}>
                              {post.slides[0].subtext}
                            </p>
                          </div>
                        </div>
                        {/* Slide count badge */}
                        <div
                          className="absolute top-2 right-2 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md"
                          style={{
                            background: `${postAccent.primary}15`,
                            color: `${postAccent.primary}90`,
                            border: `1px solid ${postAccent.primary}20`,
                          }}
                        >
                          {post.slides.length} slides
                        </div>
                      </div>

                      {/* Post info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground/85 mb-0.5 line-clamp-1">{post.title}</p>
                          <p
                            className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                            style={{ color: `${postAccent.primary}60` }}
                          >
                            {post.category}
                          </p>
                        </div>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: `${postAccent.primary}10`,
                            border: `1px solid ${postAccent.primary}15`,
                          }}
                        >
                          <Download className="w-3 h-3" style={{ color: `${postAccent.primary}70` }} />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* ===== PREVIEW VIEW ===== */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Post selector tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {carouselPosts.map((post) => {
                const tabAccent = accentMap[post.slides[0].accent || "purple"];
                return (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="flex-shrink-0 text-xs font-medium px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                    style={{
                      background: selectedPost.id === post.id ? `${tabAccent.primary}18` : "rgba(255,255,255,0.02)",
                      color: selectedPost.id === post.id ? `${tabAccent.primary}dd` : `${COLORS.muted}60`,
                      border: `1px solid ${selectedPost.id === post.id ? `${tabAccent.primary}30` : "rgba(255,255,255,0.04)"}`,
                    }}
                  >
                    {post.title}
                  </button>
                );
              })}
            </div>

            {/* Selected post header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${accentMap[selectedPost.slides[0].accent || "purple"].primary}18, ${accentMap[selectedPost.slides[0].accent || "purple"].secondary}10)`,
                  border: `1px solid ${accentMap[selectedPost.slides[0].accent || "purple"].primary}25`,
                }}
              >
                <Instagram className="w-4.5 h-4.5" style={{ color: accentMap[selectedPost.slides[0].accent || "purple"].primary }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground/90">{selectedPost.title}</h2>
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: `${accentMap[selectedPost.slides[0].accent || "purple"].primary}60` }}>
                  {selectedPost.category} · {selectedPost.slides.length} slides
                </p>
              </div>
            </div>

            {/* Main preview */}
            <div className="flex flex-col items-center">
              <CarouselPreview post={selectedPost} />
            </div>

            {/* All slides grid */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-3.5 h-3.5 text-muted/50" />
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50">All Slides</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
                {selectedPost.slides.map((slide, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden relative"
                    style={{
                      aspectRatio: "4/5",
                      border: `1px solid ${accentMap[slide.accent || "purple"].primary}12`,
                    }}
                  >
                    <div className="absolute inset-0 origin-top-left" style={{ transform: "scale(0.248)", width: 405, height: 506 }}>
                      <SlidePreview slide={slide} slideIndex={i} totalSlides={selectedPost.slides.length} />
                    </div>
                    <div className="absolute bottom-1 right-1 text-[8px] font-bold bg-black/50 text-white/70 px-1.5 py-0.5 rounded">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to gallery */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setView("gallery")}
                className="text-xs text-muted/50 hover:text-foreground/70 transition-colors cursor-pointer"
              >
                ← Back to gallery
              </button>
            </div>
          </motion.div>
        )}

        {/* Brand Kit */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
        >
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent/70" />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50">Brand Kit</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Instagram Bio */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground/80">Instagram Bio</span>
                  <CopyButton text={`UnderChozen\nKnow your worth. Prove it with data.\nFree salary analysis → 25 roles · 18 cities · 13 industries\n↓ Check yours in 30 seconds\nunderchozen.com`} />
                </div>
                <div className="space-y-1 text-xs text-muted/65 leading-relaxed">
                  <p className="font-semibold text-foreground/85">UnderChozen</p>
                  <p>Know your worth. Prove it with data.</p>
                  <p>Free salary analysis → 25 roles · 18 cities · 13 industries</p>
                  <p>↓ Check yours in 30 seconds</p>
                  <p className="text-accent/70">underchozen.com</p>
                </div>
              </div>

              {/* Logo Prompt */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground/80">Logo Prompt</span>
                  <CopyButton text="Minimal, modern logomark for 'UnderChozen', a salary intelligence platform. Abstract upward-pointing arrow or rising bar chart formed from a single continuous line, suggesting growth and upward mobility. Dark background (#06060B), gradient accent from electric purple (#8B6CFF) to blue (#5B8DEF). Clean geometric shapes, no text in the icon. Glassmorphism subtle glow effect behind the mark. Suitable for app icon, favicon, and social media profile picture. Professional, premium, fintech aesthetic. Square format, centered composition, minimal negative space." />
                </div>
                <p className="text-xs text-muted/55 leading-relaxed">
                  Minimal logomark — abstract upward arrow / rising bar chart from a single continuous line. Dark bg (#06060B), purple-to-blue gradient (#8B6CFF → #5B8DEF). Geometric, no text. Glassmorphism glow. App icon ready, premium fintech aesthetic.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-1.5">
                    {["#06060B", "#8B6CFF", "#5B8DEF", "#EEEEF0", "#34D399"].map((c) => (
                      <div
                        key={c}
                        className="w-5 h-5 rounded-md border border-white/10"
                        style={{ background: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted/40 ml-1">Brand palette</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
        >
          <GlassCard>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
                <Instagram className="w-3.5 h-3.5 text-accent/70" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground/85 mb-2">How to use</h3>
                <ol className="space-y-1.5 text-xs text-muted/55 leading-relaxed">
                  <li><span className="text-foreground/70 font-medium">1.</span> Pick a carousel from the gallery</li>
                  <li><span className="text-foreground/70 font-medium">2.</span> Download each slide as a PNG (or download all at once)</li>
                  <li><span className="text-foreground/70 font-medium">3.</span> Copy the caption and hashtags with one click</li>
                  <li><span className="text-foreground/70 font-medium">4.</span> Post to Instagram as a carousel</li>
                  <li><span className="text-foreground/70 font-medium">5.</span> Optional: boost top-performing posts for $5-10/day</li>
                </ol>
                <p className="text-[10px] text-muted/40 mt-3">
                  Tip: Post 3-4 times per week. Carousels get 3x more engagement than single images. Best times: 9am, 12pm, 6pm.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
