/**
 * AI Processing Pipeline Orchestrator
 * 
 * This module coordinates the AI processing of normalized entries.
 * It automatically selects between real OpenAI processing and mock AI
 * based on the presence of an API key.
 */

import { Digest, NormalizedEntry, AIProcessorConfig } from "@/lib/types";
import { generateMockDigest } from "@/lib/mock-ai";
import { generateDigestWithOpenAI } from "@/lib/openai-client";

/**
 * Determine the AI processor configuration based on environment.
 * Returns config indicating whether to use real AI and the API key if available.
 */
export function getAIProcessorConfig(): AIProcessorConfig {
  const apiKey = process.env.OPENAI_API_KEY;
  
  return {
    useRealAI: Boolean(apiKey && apiKey.length > 0 && apiKey !== "sk-your-api-key-here"),
    openAIApiKey: apiKey,
  };
}

/**
 * Process normalized entries through the AI pipeline.
 * 
 * This function:
 * 1. Checks for OpenAI API key availability
 * 2. Routes to real AI or mock AI based on configuration
 * 3. Returns the generated digest along with metadata about the processing mode
 * 
 * @param entries - Chronologically sorted normalized entries
 * @returns Object containing the digest and processing metadata
 */
export async function processWithAI(entries: NormalizedEntry[]): Promise<{
  digest: Digest;
  aiMode: "openai" | "mock";
  processingTime: number;
}> {
  const startTime = Date.now();
  const config = getAIProcessorConfig();

  let digest: Digest;
  let aiMode: "openai" | "mock";

  if (config.useRealAI && config.openAIApiKey) {
    // Use real OpenAI processing
    try {
      console.log("[AI Processor] Using OpenAI for digest generation");
      digest = await generateDigestWithOpenAI(entries, config.openAIApiKey);
      aiMode = "openai";
    } catch (error) {
      // Fallback to mock if OpenAI fails
      console.error("[AI Processor] OpenAI failed, falling back to mock:", error);
      digest = generateMockDigest(entries);
      aiMode = "mock";
    }
  } else {
    // Use mock AI processing
    console.log("[AI Processor] No API key found, using mock AI");
    digest = generateMockDigest(entries);
    aiMode = "mock";
  }

  const processingTime = Date.now() - startTime;

  return {
    digest,
    aiMode,
    processingTime,
  };
}

/**
 * Validate that there are enough entries to generate a meaningful digest.
 * Returns an error message if validation fails, null otherwise.
 */
export function validateEntriesForProcessing(entries: NormalizedEntry[]): string | null {
  if (entries.length === 0) {
    return "No entries to process. Please provide valid Slack or Loom links.";
  }

  if (entries.length < 2) {
    return "At least 2 discussion entries are needed to generate a meaningful digest.";
  }

  // Check if there's any meaningful content
  const totalContentLength = entries.reduce((sum, e) => sum + e.content.length, 0);
  if (totalContentLength < 100) {
    return "The discussion content is too short to generate a meaningful digest.";
  }

  return null;
}

/**
 * Get a summary of the processing configuration for debugging/display.
 */
export function getProcessingInfo(): {
  mode: "openai" | "mock";
  description: string;
} {
  const config = getAIProcessorConfig();
  
  if (config.useRealAI) {
    return {
      mode: "openai",
      description: "Using OpenAI GPT-4 for intelligent analysis",
    };
  }
  
  return {
    mode: "mock",
    description: "Using mock AI (set OPENAI_API_KEY for real AI processing)",
  };
}
