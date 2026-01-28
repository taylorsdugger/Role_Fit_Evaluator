import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { RESUME_CHECKER_PROMPT } from "@/lib/resumeCheckerPrompt";
import { ATS_READINESS_PROMPT } from "@/lib/atsReadinessPrompt";

interface ResumeCheckRequest {
  resume: string;
  model?: string;
  evaluationType?: "hiring_manager" | "ats";
}

interface ScoreBreakdown {
  earned: number;
  possible: number;
}

interface ImprovementStep {
  priority: number;
  step: string;
  potential_increase: string;
}

interface ResumeCheckResult {
  overall_score: number;
  score_breakdown: {
    impact_outcomes: ScoreBreakdown;
    role_clarity: ScoreBreakdown;
    bullet_quality: ScoreBreakdown;
    summary_strength: ScoreBreakdown;
    structure_readability: ScoreBreakdown;
    relevance: ScoreBreakdown;
    red_flags_penalty: ScoreBreakdown;
  };
  why_this_score: string;
  what_you_did_well: string[];
  issues_lowering_score: string[];
  steps_to_improve: ImprovementStep[];
  red_flags: string[];
}

interface ATSCheckResult {
  ats_score: number;
  score_breakdown: {
    keyword_match: ScoreBreakdown;
    experience_alignment: ScoreBreakdown;
    structure_compliance: ScoreBreakdown;
    parsing_readability: ScoreBreakdown;
    skills_section: ScoreBreakdown;
    keyword_gaps: ScoreBreakdown;
  };
  why_this_score: string;
  ats_issues: string[];
  keywords_found: string[];
  keywords_missing: string[];
  ats_optimization_steps: ImprovementStep[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ResumeCheckRequest = await request.json();

    // Validate request
    if (!body.resume || typeof body.resume !== "string") {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_ADMIN_API_KEY || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_ADMIN_API_KEY or OPENROUTER_API_KEY environment variable not set");
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
    
    // Select prompt based on evaluation type
    const evaluationType = body.evaluationType || "hiring_manager";
    const systemPrompt = evaluationType === "ats" ? ATS_READINESS_PROMPT : RESUME_CHECKER_PROMPT;

    // Call OpenRouter with appropriate prompt
    const stream = await openrouter.chat.send({
      model: selectedModel,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `RESUME TO EVALUATE:\n\n${body.resume}`,
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
    let result: ResumeCheckResult;
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
    console.error("Error in admin-resume-check route:", error);
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
