"use server";

import { OpenRouter } from "@openrouter/sdk";
import { ROLE_FIT_SYSTEM_PROMPT } from "./roleFitPrompt";

export interface RoleFitRequest {
  jobDescription: string;
  company?: string;
}

export interface RoleFitResponse {
  result: string;
}

export async function evaluateRoleFit(
  request: RoleFitRequest
): Promise<RoleFitResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY environment variable not set");
  }

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

  return {
    result: content,
  };
}
