/**
 * Drip Email — Day 1: "Your Salary Gap Is Real"
 *
 * Sent immediately after email capture. Reinforces the analysis results
 * and emphasizes the lifetime cost of the salary gap.
 */

interface DripDay1Props {
  name?: string;
  jobTitle: string;
  city: string;
  gap: number;
  percentile: number;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function dripDay1(props: DripDay1Props): { subject: string; html: string } {
  const { name, jobTitle, city, gap, percentile } = props;
  const lifetimeGap = gap * 10;
  const greeting = name ? `Hi ${name},` : "Hi there,";

  const subject = `Your salary gap is costing you ${formatCurrency(gap)}/year`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0F; color: #F5F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0F;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <span style="font-size: 20px; font-weight: 700; color: #F5F5F7; letter-spacing: -0.5px;">UnderChozen</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 0;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #F5F5F7;">
                ${greeting}
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                Earlier today you checked your salary as a <strong style="color: #F5F5F7;">${jobTitle}</strong> in <strong style="color: #F5F5F7;">${city}</strong>. Here is what the data showed:
              </p>

              <!-- Gap callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 28px; text-align: center;">
                    <p style="margin: 0 0 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #A1A1AA;">Your annual gap</p>
                    <p style="margin: 0 0 12px; font-size: 36px; font-weight: 700; color: #FF4D4D; letter-spacing: -1px;">
                      ${formatCurrency(gap)}
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #A1A1AA;">
                      You sit at the <strong style="color: #F5F5F7;">${percentile}th percentile</strong> for your role and market.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                That is not just a number on a screen. Over the next 10 years, that gap compounds to roughly <strong style="color: #FF4D4D;">${formatCurrency(lifetimeGap)}</strong> in lost earnings -- not counting retirement contributions, bonuses, and raises built on top of a lower base.
              </p>

              <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                The good news: most of that gap is recoverable with the right negotiation strategy. We built a personalized blueprint specifically for your role, market, and compensation level.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #F5F5F7; border-radius: 10px;">
                    <a href="https://underchozen.com/analysis?unlock=true" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 600; color: #0A0A0F; text-decoration: none; letter-spacing: -0.2px;">
                      Get your negotiation blueprint for $29
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0; font-size: 12px; color: #71717A; line-height: 1.6;">
                You are receiving this because you used the UnderChozen salary analyzer.
                <br />
                <a href="https://underchozen.com/unsubscribe" style="color: #71717A; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return { subject, html };
}
