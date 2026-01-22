import { NextRequest, NextResponse } from "next/server";
import { evaluateRoleFit, RoleFitRequest, RoleFitResponse } from "@/lib/openrouter";
import { type ProfileType } from "@/lib/profiles";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse<RoleFitResponse | { error: string }>> {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.jobDescription || typeof body.jobDescription !== "string") {
      return NextResponse.json(
        { error: "jobDescription is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate optional company field
    if (body.company && typeof body.company !== "string") {
      return NextResponse.json(
        { error: "company must be a string if provided" },
        { status: 400 }
      );
    }

    // Validate profile field
    const validProfiles: ProfileType[] = ["senior-eng"];
    if (!body.profile || !validProfiles.includes(body.profile)) {
      return NextResponse.json(
        { error: "profile must be 'senior-eng'" },
        { status: 400 }
      );
    }

    // Limit job description length to prevent token overflow
    if (body.jobDescription.length > 10000) {
      return NextResponse.json(
        { error: "jobDescription must be less than 10000 characters" },
        { status: 400 }
      );
    }

    const roleFitRequest: RoleFitRequest = {
      jobDescription: body.jobDescription,
      company: body.company,
      profile: body.profile,
    };

    const result = await evaluateRoleFit(roleFitRequest);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Role fit evaluation error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: `Failed to evaluate role fit: ${errorMessage}` },
      { status: 500 }
    );
  }
}
