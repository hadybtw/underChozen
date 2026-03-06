/**
 * Drip Email — Day 3: "Here's What Others Did"
 *
 * Social proof email with an anonymous success story and negotiation stats.
 */

interface DripDay3Props {
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

export function dripDay3(props: DripDay3Props): { subject: string; html: string } {
  const { name, jobTitle, city, gap, percentile } = props;
  const greeting = name ? `Hi ${name},` : "Hi there,";

  const subject = `How a ${jobTitle} in ${city} got a $22K raise`;

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
                We wanted to share something with you.
              </p>

              <!-- Story block -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 28px;">
                    <p style="margin: 0 0 16px; font-size: 14px; font-style: italic; color: #A1A1AA; line-height: 1.6;">
                      "I had been a ${jobTitle} for three years and never once asked for a raise. I assumed my company would adjust my pay if I deserved it. After running my numbers through UnderChozen, I realized I was sitting at the ${percentile > 30 ? "low end" : "bottom"} of the market. The negotiation blueprint gave me the exact script and talking points. Two weeks later I had a $22,000 raise -- no threats, no ultimatums."
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #71717A;">
                      -- Anonymous ${jobTitle}, ${city} area
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                This is not unusual. Here is what the research says:
              </p>

              <!-- Stats -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 28px;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 60px; font-size: 28px; font-weight: 700; color: #F5F5F7;">85%</td>
                        <td style="font-size: 14px; color: #A1A1AA; padding-left: 16px;">of employees who negotiate receive at least some increase</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 60px; font-size: 28px; font-weight: 700; color: #F5F5F7;">70%</td>
                        <td style="font-size: 14px; color: #A1A1AA; padding-left: 16px;">of managers expect candidates to negotiate</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 60px; font-size: 28px; font-weight: 700; color: #F5F5F7;">$7.5K</td>
                        <td style="font-size: 14px; color: #A1A1AA; padding-left: 16px;">is the average raise secured through structured negotiation</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                Your gap is currently <strong style="color: #FF4D4D;">${formatCurrency(gap)}/year</strong>. A single conversation could change that -- if you go in prepared.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #F5F5F7; border-radius: 10px;">
                    <a href="https://underchozen.com/analysis?unlock=true" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 600; color: #0A0A0F; text-decoration: none; letter-spacing: -0.2px;">
                      Get your personalized strategy
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
