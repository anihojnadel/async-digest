/**
 * OpenAI client for AI-powered digest generation.
 * Uses GPT-4 to analyze normalized entries and generate structured digests.
 */

import OpenAI from "openai";
import { Digest, NormalizedEntry } from "@/lib/types";

/**
 * System prompt that instructs the AI on how to analyze discussions
 * and generate structured digests.
 */
const SYSTEM_PROMPT = `You are an expert at analyzing asynchronous team communications and extracting actionable insights.

Your task is to analyze discussion entries from Slack threads and Loom videos, then produce a structured digest.

CRITICAL RULES:
1. NEVER invent or assume decisions that weren't explicitly made
2. If something is unclear, mark it as "pending" or add it to "openQuestions"
3. Only attribute statements to people who actually said them
4. Distinguish between proposals/suggestions and actual decisions
5. Be conservative - when in doubt, classify as pending rather than decided

Your output must be valid JSON matching this exact structure:
{
  "executiveSummary": {
    "whatWasDiscussed": "Brief summary of main topics",
    "whyItMatters": "Business impact and importance",
    "whatChanged": "Key outcomes and shifts"
  },
  "timeline": [
    {
      "timestamp": "ISO timestamp",
      "summary": "What happened at this point",
      "participants": ["names"],
      "significance": "low" | "medium" | "high"
    }
  ],
  "decisions": {
    "decided": [
      {
        "description": "The decision made",
        "context": "Why/how it was decided",
        "participants": ["who was involved"]
      }
    ],
    "pending": [...],
    "blocked": [...]
  },
  "actionItems": [
    {
      "action": "What needs to be done",
      "owner": "Person responsible or null",
      "status": "decided" | "pending" | "blocked",
      "context": "Additional context"
    }
  ],
  "openQuestions": ["Questions still unresolved"],
  "topicClusters": [
    {
      "topic": "Theme name",
      "entries": number,
      "summary": "Brief description"
    }
  ],
  "disagreements": ["Description of conflicting viewpoints"],
  "repeatedFeedback": ["Patterns that came up multiple times"]
}`;

/**
 * Format normalized entries into a readable format for the AI.
 */
function formatEntriesForPrompt(entries: NormalizedEntry[]): string {
  return entries
    .map((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      return `[${index + 1}] ${date} | ${entry.source.toUpperCase()} | ${entry.author}:
${entry.content}`;
    })
    .join("\n\n");
}

/**
 * Generate a digest using OpenAI's API.
 * 
 * @param entries - Normalized entries to analyze
 * @param apiKey - OpenAI API key
 * @returns The generated digest
 * @throws Error if the API call fails or response is invalid
 */
export async function generateDigestWithOpenAI(
  entries: NormalizedEntry[],
  apiKey: string
): Promise<Digest> {
  const openai = new OpenAI({ apiKey });

  const userPrompt = `Please analyze the following discussion entries and generate a comprehensive digest.

The discussion contains ${entries.length} entries from ${[...new Set(entries.map((e) => e.author))].length} participants.

ENTRIES:
${formatEntriesForPrompt(entries)}

Generate a JSON digest following the structure specified in your instructions. Focus on:
1. Identifying clear decisions vs. proposals
2. Extracting actionable items with owners
3. Noting disagreements and repeated themes
4. Flagging unresolved questions

Return ONLY valid JSON, no markdown code blocks.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3, // Lower temperature for more consistent structured output
    max_tokens: 4000,
    response_format: { type: "json_object" }, // Enforce JSON output
  });

  const content = response.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error("No content in OpenAI response");
  }

  try {
    const digest = JSON.parse(content) as Digest;
    return validateAndNormalizeDigest(digest);
  } catch (parseError) {
    throw new Error(`Failed to parse OpenAI response as JSON: ${parseError}`);
  }
}

/**
 * Validate and normalize the digest structure.
 * Ensures all required fields are present with sensible defaults.
 */
function validateAndNormalizeDigest(digest: Partial<Digest>): Digest {
  return {
    executiveSummary: {
      whatWasDiscussed: digest.executiveSummary?.whatWasDiscussed || "Unable to determine discussion summary",
      whyItMatters: digest.executiveSummary?.whyItMatters || "Unable to determine importance",
      whatChanged: digest.executiveSummary?.whatChanged || "Unable to determine changes",
    },
    timeline: Array.isArray(digest.timeline) ? digest.timeline : [],
    decisions: {
      decided: Array.isArray(digest.decisions?.decided) ? digest.decisions.decided : [],
      pending: Array.isArray(digest.decisions?.pending) ? digest.decisions.pending : [],
      blocked: Array.isArray(digest.decisions?.blocked) ? digest.decisions.blocked : [],
    },
    actionItems: Array.isArray(digest.actionItems) ? digest.actionItems : [],
    openQuestions: Array.isArray(digest.openQuestions) ? digest.openQuestions : [],
    topicClusters: Array.isArray(digest.topicClusters) ? digest.topicClusters : [],
    disagreements: Array.isArray(digest.disagreements) ? digest.disagreements : [],
    repeatedFeedback: Array.isArray(digest.repeatedFeedback) ? digest.repeatedFeedback : [],
  };
}
