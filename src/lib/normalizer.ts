/**
 * Normalization layer for converting various input sources into a common format.
 * Handles link parsing, validation, and data fetching from mock sources.
 */

import {
  NormalizedEntry,
  ParsedLink,
  LinkParseResult,
} from "@/lib/types";
import { getMockSlackData } from "@/mocks/slack-data";
import { getMockLoomData } from "@/mocks/loom-data";

// =============================================================================
// Link Parsing
// =============================================================================

/**
 * Regular expressions for identifying link types.
 * These patterns match common Slack and Loom URL formats.
 */
const SLACK_URL_PATTERN = /slack\.com\/archives\/([A-Z0-9]+)\/p(\d+)/i;
const SLACK_SIMPLE_PATTERN = /slack\.com/i;
const LOOM_URL_PATTERN = /loom\.com\/share\/([a-zA-Z0-9]+)/i;
const LOOM_SIMPLE_PATTERN = /loom\.com/i;

/**
 * Parse a single URL and determine its type and identifier.
 * Returns null if the URL is not recognized as a valid source.
 */
function parseLink(url: string): ParsedLink | null {
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    return null;
  }

  // Try to match Slack URL patterns
  const slackMatch = trimmedUrl.match(SLACK_URL_PATTERN);
  if (slackMatch) {
    return {
      type: "slack",
      url: trimmedUrl,
      identifier: `${slackMatch[1]}-${slackMatch[2]}`,
    };
  }
  
  // Simple Slack URL detection (for demo purposes)
  if (SLACK_SIMPLE_PATTERN.test(trimmedUrl)) {
    // Extract anything after the last slash as identifier, or use 'default'
    const parts = trimmedUrl.split("/").filter(Boolean);
    const identifier = parts[parts.length - 1] || "default";
    return {
      type: "slack",
      url: trimmedUrl,
      identifier,
    };
  }

  // Try to match Loom URL patterns
  const loomMatch = trimmedUrl.match(LOOM_URL_PATTERN);
  if (loomMatch) {
    return {
      type: "loom",
      url: trimmedUrl,
      identifier: loomMatch[1],
    };
  }
  
  // Simple Loom URL detection (for demo purposes)
  if (LOOM_SIMPLE_PATTERN.test(trimmedUrl)) {
    const parts = trimmedUrl.split("/").filter(Boolean);
    const identifier = parts[parts.length - 1] || "default";
    return {
      type: "loom",
      url: trimmedUrl,
      identifier,
    };
  }

  return null;
}

/**
 * Parse multiple URLs and categorize them as valid or invalid.
 * This is the main entry point for link parsing.
 */
export function parseLinks(urls: string[]): LinkParseResult {
  const valid: ParsedLink[] = [];
  const invalid: string[] = [];

  for (const url of urls) {
    const parsed = parseLink(url);
    if (parsed) {
      valid.push(parsed);
    } else if (url.trim()) {
      // Only add to invalid if it's not an empty string
      invalid.push(url.trim());
    }
  }

  return { valid, invalid };
}

// =============================================================================
// Data Fetching
// =============================================================================

/**
 * Fetch data for a parsed Slack link.
 * Currently uses mock data; in production would call the Slack API.
 */
async function fetchSlackData(link: ParsedLink): Promise<NormalizedEntry[]> {
  // In a real implementation, this would:
  // 1. Use the Slack API to fetch thread messages
  // 2. Extract author, timestamp, and content from each message
  // 3. Handle pagination for long threads
  
  // For now, we use mock data based on the identifier
  return getMockSlackData(link.identifier);
}

/**
 * Fetch data for a parsed Loom link.
 * Currently uses mock data; in production would call the Loom API.
 */
async function fetchLoomData(link: ParsedLink): Promise<NormalizedEntry[]> {
  // In a real implementation, this would:
  // 1. Use the Loom API to fetch video metadata
  // 2. Get the transcript (if available)
  // 3. Fetch comments on the video
  // 4. Normalize timestamps relative to video upload time
  
  // For now, we use mock data based on the identifier
  return getMockLoomData(link.identifier);
}

/**
 * Fetch data for a single parsed link based on its type.
 */
async function fetchDataForLink(link: ParsedLink): Promise<NormalizedEntry[]> {
  switch (link.type) {
    case "slack":
      return fetchSlackData(link);
    case "loom":
      return fetchLoomData(link);
    default:
      return [];
  }
}

// =============================================================================
// Main Normalization Pipeline
// =============================================================================

/**
 * Sort normalized entries chronologically by timestamp.
 */
function sortChronologically(entries: NormalizedEntry[]): NormalizedEntry[] {
  return [...entries].sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });
}

/**
 * Remove duplicate entries based on content and timestamp.
 * This prevents the same message from appearing multiple times
 * if the same link is submitted twice.
 */
function deduplicateEntries(entries: NormalizedEntry[]): NormalizedEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = `${entry.author}-${entry.timestamp}-${entry.content.substring(0, 50)}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Main normalization function.
 * Takes an array of URLs, fetches data from each source,
 * and returns a unified, chronologically sorted array of entries.
 * 
 * @param urls - Array of Slack and Loom URLs to process
 * @returns Object containing normalized entries and any invalid URLs
 */
export async function normalizeInputs(urls: string[]): Promise<{
  entries: NormalizedEntry[];
  invalidUrls: string[];
}> {
  // Step 1: Parse all URLs
  const { valid, invalid } = parseLinks(urls);

  if (valid.length === 0) {
    return {
      entries: [],
      invalidUrls: invalid,
    };
  }

  // Step 2: Fetch data for all valid links in parallel
  const fetchPromises = valid.map(fetchDataForLink);
  const results = await Promise.all(fetchPromises);

  // Step 3: Flatten all results into a single array
  const allEntries = results.flat();

  // Step 4: Deduplicate and sort
  const deduped = deduplicateEntries(allEntries);
  const sorted = sortChronologically(deduped);

  return {
    entries: sorted,
    invalidUrls: invalid,
  };
}

// =============================================================================
// Utility Exports
// =============================================================================

/**
 * Check if a URL is a valid Slack or Loom link.
 * Useful for client-side validation before submission.
 */
export function isValidSourceUrl(url: string): boolean {
  return parseLink(url) !== null;
}

/**
 * Get the source type for a URL without full parsing.
 */
export function getSourceType(url: string): "slack" | "loom" | null {
  const parsed = parseLink(url);
  return parsed?.type || null;
}
