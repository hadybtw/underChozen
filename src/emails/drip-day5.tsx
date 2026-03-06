/**
 * Drip Email — Day 5: "Last Chance: 20% Off"
 *
 * Final drip with urgency, discount code WELCOME20, and a recap of the offering.
 */

interface DripDay5Props {
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

export function dripDay5(props: DripDay5Props): { subject: string; html: string } {
  const { name, jobTitle, city, gap, percentile } = props;
  const greeting = name ? `Hi ${name},` : "Hi there,";

  const subject = "Your exclusive 20% discount expires today";

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
                This is the last email we will send about your salary analysis. We wanted to make it count.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                As a <strong style="color: #F5F5F7;">${jobTitle}</strong> in <strong style="color: #F5F5F7;">${city}</strong>, your data shows a <strong style="color: #FF4D4D;">${formatCurrency(gap)}/year</strong> gap at the <strong style="color: #F5F5F7;">${percentile}th percentile</strong>. That has not changed since we last checked -- but it can.
              </p>

              <!-- Discount callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 28px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #A1A1AA;">Exclusive discount code</p>
                    <p style="margin: 0 0 8px; font-size: 32px; font-weight: 700; color: #F5F5F7; letter-spacing: 4px;">
                      WELCOME20
                    </p>
                    <p style="margin: 0 0 4px; font-size: 14px; color: #A1A1AA;">
                      <span style="text-decoration: line-through; color: #71717A;">$29</span>
                      <span style="color: #4ADE80; font-weight: 600; margin-left: 8px;">$23</span>
                    </p>
                    <p style="margin: 8px 0 0; font-size: 12px; color: #71717A;">Expires at midnight tonight</p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                Here is what you get:
              </p>

              <!-- What's included -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 28px;">
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #A1A1AA; line-height: 1.6;">
                    <span style="color: #4ADE80; margin-right: 8px;">&#10003;</span> A word-for-word negotiation email script tailored to your role
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #A1A1AA; line-height: 1.6;">
                    <span style="color: #4ADE80; margin-right: 8px;">&#10003;</span> In-meeting talking points with objection handlers
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #A1A1AA; line-height: 1.6;">
                    <span style="color: #4ADE80; margin-right: 8px;">&#10003;</span> 3-year compensation projection model
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 15px; color: #A1A1AA; line-height: 1.6;">
                    <span style="color: #4ADE80; margin-right: 8px;">&#10003;</span> Downloadable PDF report you can reference anytime
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.6; color: #A1A1AA;">
                One prepared conversation could recover <strong style="color: #F5F5F7;">${formatCurrency(gap)}</strong> or more every single year. The blueprint costs less than a single hour of that gap.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #F5F5F7; border-radius: 10px;">
                    <a href="https://underchozen.com/analysis?unlock=true&code=WELCOME20" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 600; color: #0A0A0F; text-decoration: none; letter-spacing: -0.2px;">
                      Unlock your blueprint -- now just $23
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 28px 0 0; font-size: 13px; color: #71717A; text-align: center;">
                This is the last email in this series. No more follow-ups.
              </p>
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
