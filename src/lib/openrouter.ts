"use server";

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

  const userMessage = request.company
    ? `Company: ${request.company}\n\nJob Description:\n${request.jobDescription}`
    : `Job Description:\n${request.jobDescription}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
      "X-Title": "Role Fit Evaluator",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
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
      max_tokens: 2000,
      top_p: 0.95,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content in OpenRouter response");
  }

  return {
    result: content,
  };
}
