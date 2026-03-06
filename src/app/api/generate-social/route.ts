import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const platformPrompts: Record<string, string> = {
  instagram: `Generate an Instagram carousel post about salary/negotiation/career. Return JSON with:
{
  "id": "ai-{random}",
  "title": "short title",
  "category": "Education|Tips|Salary Data",
  "caption": "engaging caption with line breaks",
  "hashtags": "#salary #career ... (10 hashtags)",
  "slides": [
    { "type": "hook|stat|content|list|cta", "headline": "short headline with line breaks", "subtext": "supporting text", "stat": "optional stat", "statLabel": "optional label", "accent": "purple|red|green|blue|warning" }
  ]
}
Include 4-6 slides. First slide is a hook, last slide is a CTA mentioning underchozen.com.`,

  twitter: `Generate a Twitter/X thread about salary/negotiation/career. Return JSON with:
{
  "id": "ai-tw-{random}",
  "title": "short title",
  "category": "Education|Tips|Salary Data",
  "tweets": ["tweet 1 (hook)", "tweet 2", "tweet 3", "tweet 4", "tweet 5 (CTA mentioning underchozen.com)"]
}
Each tweet under 280 characters. 5 tweets total. Include data/stats.`,

  linkedin: `Generate a LinkedIn post about salary/negotiation/career. Return JSON with:
{
  "id": "ai-li-{random}",
  "title": "compelling title",
  "category": "Education|Tips|Salary Data",
  "content": "full post text with line breaks, bullet points, bold markers (**text**), ending with underchozen.com mention and hashtags"
}
Professional tone, 200-400 words. Include specific data points.`,

  quora: `Generate a Quora answer about salary/negotiation/career. Return JSON with:
{
  "id": "ai-qa-{random}",
  "title": "the question being answered",
  "question": "same as title",
  "category": "Education|Tips|Salary Data",
  "answer": "detailed answer with markdown bold (**text**), numbered lists, specific data, ending with underchozen.com mention"
}
Helpful, authoritative tone. 200-400 words.`,

  tiktok: `Generate a TikTok video script about salary/negotiation/career. Return JSON with:
{
  "id": "ai-tt-{random}",
  "title": "short catchy title",
  "category": "Hook|Tips|Salary Data|Education",
  "hook": "attention-grabbing first line",
  "script": "full script with [stage directions] and quoted dialogue",
  "cta": "call to action mentioning underchozen.com",
  "sound": "suggested sound/music",
  "duration": "25-40 sec"
}
Engaging, casual tone. Include text overlay directions.`,
};

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI generation is not configured. Set ANTHROPIC_API_KEY to enable." },
      { status: 503 }
    );
  }

  try {
    const { platform, topic } = await req.json();

    if (!platform || !platformPrompts[platform]) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const topicInstruction = topic
      ? `\n\nFocus on this specific topic: "${topic}"`
      : "\n\nChoose an interesting salary/career topic that would perform well.";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: `${platformPrompts[platform]}${topicInstruction}\n\nBrand: UnderChozen — salary intelligence platform. Dark, premium aesthetic. Data-driven, no fluff.\n\nRespond with ONLY valid JSON, no markdown code blocks.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", errorText);
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";

    // Parse JSON from response (handle potential markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 500 }
      );
    }

    const content = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ content, platform });
  } catch (error) {
    console.error("Generate social error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
