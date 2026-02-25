import { OpenRouter } from "@openrouter/sdk";
import { ROLE_FIT_SYSTEM_PROMPT } from "./roleFitPrompt";
import { getProfile, type ProfileType } from "./profiles";

export interface RoleFitRequest {
  jobDescription: string;
  company?: string;
  profile: ProfileType;
}

export interface RoleFitResponse {
  fitLevel: string;
  result: string;
}

export async function evaluateRoleFit(
  request: RoleFitRequest
): Promise<RoleFitResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY environment variable not set");
  }

  const candidateProfile = getProfile(request.profile);

  const openrouter = new OpenRouter({
    apiKey,
  });

  const userMessage = request.company
    ? `Company: ${request.company}\n\nJob Description:\n${request.jobDescription}`
    : `Job Description:\n${request.jobDescription}`;

  const stream = await openrouter.chat.send({
    model: "google/gemini-2.5-flash-lite",
    messages: [
      {
        role: "system",
        content: ROLE_FIT_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: candidateProfile,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    temperature: 0.2,
    maxTokens: 2000,
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

  // Expected format: first line is "FITLEVEL: Strong" then markdown follows
  const trimmed = content.trim();
  const newlineIndex = trimmed.indexOf('\n');
  const firstLine = (newlineIndex === -1 ? trimmed : trimmed.slice(0, newlineIndex)).trim();
  const rest = newlineIndex === -1 ? '' : trimmed.slice(newlineIndex + 1).trim();

  const fitLevelMatch = firstLine.match(/^FITLEVEL:\s*(Strong|Reasonable|Partial|Weak)$/i);

  if (fitLevelMatch && rest) {
    return {
      fitLevel: fitLevelMatch[1],
      result: rest,
    };
  }

  // Fallback: try to salvage a fitLevel from anywhere in the text
  const anyMatch = trimmed.match(/FITLEVEL:\s*(Strong|Reasonable|Partial|Weak)/i);
  return {
    fitLevel: anyMatch ? anyMatch[1] : "Unknown",
    result: trimmed,
  };
}
