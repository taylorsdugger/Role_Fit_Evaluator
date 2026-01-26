import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { ADMIN_MATCH_SYSTEM_PROMPT } from "@/lib/adminMatchPrompt";

interface AdminMatchRequest {
  jobDescription: string;
  resume: string;
  model?: string;
}

interface MatchResult {
  score: number;
  keyword_match: {
    matched: string[];
    missing: string[];
  };
  resume_edits: {
    additions: string[];
    improvements: string[];
  };
  bullet_rewrites: Array<{
    original: string;
    suggested: string;
    reason: string;
  }>;
  summary: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AdminMatchRequest = await request.json();

    // Validate request
    if (!body.jobDescription || typeof body.jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!body.resume || typeof body.resume !== "string") {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const openrouter = new OpenRouter({
      apiKey,
    });

    // Use provided model or default to Claude Haiku
    const selectedModel = body.model || "anthropic/claude-3.5-haiku";

    // Call OpenRouter with admin matching prompt
    const stream = await openrouter.chat.send({
      model: selectedModel,
      messages: [
        {
          role: "system",
          content: ADMIN_MATCH_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `RESUME:\n${body.resume}`,
        },
        {
          role: "user",
          content: `JOB DESCRIPTION:\n${body.jobDescription}`,
        },
      ],
      temperature: 0.3,
      maxTokens: 4000,
      topP: 0.95,
      stream: true,
    });

    let content = "";

    for await (const chunk of stream) {
      const deltaContent = chunk.choices[0]?.delta?.content;
      if (deltaContent) {
        content += deltaContent;
      }
    }

    if (!content) {
      throw new Error("No content in OpenRouter response");
    }

    // Parse JSON response
    let result: MatchResult;
    try {
      // Remove markdown code fences if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      result = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse OpenRouter response:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in admin-match route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
