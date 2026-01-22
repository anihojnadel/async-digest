/**
 * API Route: POST /api/generate
 * 
 * Generates a structured digest from Slack and Loom links.
 * This is the main endpoint that orchestrates the entire processing pipeline:
 * 1. Parse and validate input links
 * 2. Fetch and normalize data from each source
 * 3. Process through AI pipeline
 * 4. Return structured digest
 */

import { NextRequest, NextResponse } from "next/server";
import { GenerateRequest, GenerateResponse } from "@/lib/types";
import { normalizeInputs } from "@/lib/normalizer";
import { processWithAI, validateEntriesForProcessing } from "@/lib/ai-processor";

/**
 * Handle POST requests to generate a digest.
 */
export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    // Step 1: Parse request body
    const body = await request.json() as GenerateRequest;
    
    // Validate request structure
    if (!body.links || !Array.isArray(body.links)) {
      return NextResponse.json(
        {
          success: false,
          error: "Request must include a 'links' array",
          aiMode: "mock",
        },
        { status: 400 }
      );
    }

    // Filter out empty strings and trim whitespace
    const links = body.links
      .map((link) => link.trim())
      .filter((link) => link.length > 0);

    if (links.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide at least one Slack or Loom link",
          aiMode: "mock",
        },
        { status: 400 }
      );
    }

    // Step 2: Normalize inputs - parse links and fetch data
    console.log(`[Generate API] Processing ${links.length} links`);
    const { entries, invalidUrls } = await normalizeInputs(links);

    // Log any invalid URLs for debugging
    if (invalidUrls.length > 0) {
      console.log(`[Generate API] Skipped invalid URLs: ${invalidUrls.join(", ")}`);
    }

    // Step 3: Validate we have enough data to process
    const validationError = validateEntriesForProcessing(entries);
    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          error: validationError,
          aiMode: "mock",
        },
        { status: 400 }
      );
    }

    // Step 4: Process through AI pipeline
    console.log(`[Generate API] Processing ${entries.length} entries through AI`);
    const { digest, aiMode, processingTime } = await processWithAI(entries);
    
    console.log(`[Generate API] Digest generated in ${processingTime}ms using ${aiMode} mode`);

    // Step 5: Return successful response
    return NextResponse.json({
      success: true,
      digest,
      aiMode,
    });

  } catch (error) {
    // Handle unexpected errors
    console.error("[Generate API] Unexpected error:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred while generating the digest";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        aiMode: "mock",
      },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS preflight.
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
