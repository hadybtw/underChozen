import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const role = searchParams.get("role") || "Professional";
  const city = searchParams.get("city") || "";
  const percentile = searchParams.get("percentile") || "50";
  const gap = searchParams.get("gap") || "0";
  const status = searchParams.get("status") || "market-aligned";

  const percentileNum = parseInt(percentile, 10);
  const gapNum = parseInt(gap, 10);

  const statusColor =
    status === "underpaid"
      ? "#F87171"
      : status === "above-market"
        ? "#34D399"
        : "#FBBF24";

  const statusLabel =
    status === "underpaid"
      ? "Below Market Rate"
      : status === "above-market"
        ? "Above Market Rate"
        : "Market Aligned";

  const gapFormatted =
    gapNum !== 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(Math.abs(gapNum))
      : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06060B 0%, #0F0F1A 50%, #06060B 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,108,255,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "150px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91,141,239,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #8B6CFF, #5B8DEF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            UC
          </div>
          <span
            style={{
              color: "#F5F5F7",
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            UnderChozen
          </span>
        </div>

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: statusColor,
              display: "flex",
            }}
          />
          <span style={{ color: statusColor, fontSize: "18px", fontWeight: 600 }}>
            {statusLabel}
          </span>
        </div>

        {/* Role + City */}
        <div
          style={{
            color: "#F5F5F7",
            fontSize: "52px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "16px",
            display: "flex",
          }}
        >
          {role}
          {city ? ` in ${city}` : ""}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ color: "#8E8E93", fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Percentile
            </span>
            <span style={{ color: "#F5F5F7", fontSize: "48px", fontWeight: 700, letterSpacing: "-0.03em" }}>
              {percentileNum}th
            </span>
          </div>

          {gapFormatted && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ color: "#8E8E93", fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                {status === "underpaid" ? "Gap" : "Above"}
              </span>
              <span style={{ color: statusColor, fontSize: "48px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                {status === "underpaid" ? "-" : "+"}{gapFormatted}
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "40px",
            color: "#8E8E93",
            fontSize: "18px",
            display: "flex",
          }}
        >
          Check your salary at underchozen.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
