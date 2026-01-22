/**
 * Mock AI processor for testing and demo purposes.
 * Returns realistic pre-defined digest responses without making API calls.
 * 
 * This allows the application to be fully functional without an OpenAI API key,
 * making it easier to test and demo the consolidation logic.
 */

import { Digest, NormalizedEntry } from "@/lib/types";

/**
 * Generate a mock digest based on the input entries.
 * The mock analyzes basic patterns in the data to generate contextually
 * relevant (but not AI-powered) responses.
 */
export function generateMockDigest(entries: NormalizedEntry[]): Digest {
  // Extract unique authors from the entries
  const authors = [...new Set(entries.map((e) => e.author))];
  
  // Count entries by source
  const slackCount = entries.filter((e) => e.source === "slack").length;
  const loomCount = entries.filter((e) => e.source === "loom").length;
  
  // Get time range
  const timestamps = entries.map((e) => new Date(e.timestamp).getTime());
  const startTime = new Date(Math.min(...timestamps));
  const endTime = new Date(Math.max(...timestamps));

  return {
    executiveSummary: {
      whatWasDiscussed: `The team discussed a checkout flow redesign initiative spanning ${slackCount} Slack messages and ${loomCount > 0 ? `${loomCount} Loom video comments` : "design walkthroughs"}. Key participants included ${authors.slice(0, 3).join(", ")}${authors.length > 3 ? ` and ${authors.length - 3} others` : ""}.`,
      whyItMatters: "The current checkout flow has a 23% drop-off rate at the payment step, with 67% of affected users on mobile. Addressing this is critical for revenue and user experience.",
      whatChanged: "The team aligned on a multi-step checkout approach for phase 1, with wallet integrations planned for phase 2. User testing is scheduled for next week with Emily Watson leading the research effort.",
    },

    timeline: [
      {
        timestamp: startTime.toISOString(),
        summary: "Discussion initiated about checkout flow drop-off rates and mobile UX issues",
        participants: ["Sarah Chen"],
        significance: "high",
      },
      {
        timestamp: new Date(startTime.getTime() + 3600000).toISOString(),
        summary: "Debate between multi-step vs single-page checkout approaches",
        participants: ["Alex Rivera", "Emily Watson", "Marcus Johnson"],
        significance: "medium",
      },
      {
        timestamp: new Date(startTime.getTime() + 7200000).toISOString(),
        summary: "Engineering provided timeline estimates: multi-step (1 sprint), wallets (2 sprints)",
        participants: ["David Park"],
        significance: "high",
      },
      {
        timestamp: new Date(startTime.getTime() + 10800000).toISOString(),
        summary: "Decision made to prioritize multi-step form, defer wallet integration",
        participants: ["Sarah Chen", "David Park"],
        significance: "high",
      },
      {
        timestamp: endTime.toISOString(),
        summary: "Action items assigned and user testing planned for validation",
        participants: ["Emily Watson", "Marcus Johnson"],
        significance: "medium",
      },
    ],

    decisions: {
      decided: [
        {
          description: "Implement multi-step checkout form as phase 1 priority",
          context: "Addresses the core UX issue of cramped mobile forms with shorter implementation timeline",
          participants: ["Sarah Chen", "David Park", "Marcus Johnson"],
        },
        {
          description: "Keep guest checkout option",
          context: "Data shows 40% of users abandon when forced to create an account",
          participants: ["Alex Rivera", "Sarah Chen"],
        },
        {
          description: "Wallet integrations (Apple Pay, Google Pay) planned for phase 2",
          context: "Requires 2 sprints vs 1 sprint for multi-step form; deferred to reduce initial scope",
          participants: ["Sarah Chen", "David Park"],
        },
        {
          description: "Order summary should be collapsible on mobile",
          context: "Users want to focus on the form without scrolling past summary",
          participants: ["Sarah Chen", "Marcus Johnson"],
        },
      ],
      pending: [
        {
          description: "Success metrics definition: completion rate vs time-to-complete",
          context: "Emily raised this question but no final decision was made",
          participants: ["Emily Watson"],
        },
        {
          description: "Sample data approach for new user onboarding",
          context: "Needs engineering assessment for data model implications",
          participants: ["Nina Patel", "Chris Morgan"],
        },
      ],
      blocked: [
        {
          description: "Guest cart session handling",
          context: "Current backend doesn't support guest carts well; needs backend team discussion",
          participants: ["David Park"],
        },
      ],
    },

    actionItems: [
      {
        action: "Complete competitive analysis of Shopify, Stripe Checkout, and Amazon checkout flows",
        owner: "Alex Rivera",
        status: "pending",
        context: "To inform multi-step checkout design decisions",
      },
      {
        action: "Finalize Figma prototype for mobile and desktop checkout (with collapsible order summary)",
        owner: "Marcus Johnson",
        status: "pending",
        context: "Due by Wednesday EOD for user testing",
      },
      {
        action: "Update card payment icons to official brand assets",
        owner: "Marcus Johnson",
        status: "pending",
        context: "Current icons look dated",
      },
      {
        action: "Conduct user testing with 5-7 participants",
        owner: "Emily Watson",
        status: "pending",
        context: "Scheduled for next week; requires prototype by Thursday",
      },
      {
        action: "Discuss backend blocker for guest cart session handling",
        owner: "David Park",
        status: "blocked",
        context: "May push timeline by a few days",
      },
      {
        action: "Write simplified copy for workspace explanation tooltip",
        owner: "Chris Morgan",
        status: "pending",
        context: "Using 'team's home base' positioning for non-technical audience",
      },
    ],

    openQuestions: [
      "What should be the primary success metric: completion rate or time-to-complete?",
      "How much engineering effort is required for sample data in onboarding?",
      "Should shipping costs be shown on the cart page before checkout starts?",
      "What's the exact timeline impact of the guest cart backend blocker?",
    ],

    topicClusters: [
      {
        topic: "Checkout UX & Flow",
        entries: Math.floor(entries.length * 0.5),
        summary: "Discussion around multi-step vs single-page checkout, mobile optimization, and progress indicators",
      },
      {
        topic: "Engineering & Implementation",
        entries: Math.floor(entries.length * 0.25),
        summary: "Timeline estimates, backend blockers, and technical feasibility discussions",
      },
      {
        topic: "User Research & Testing",
        entries: Math.floor(entries.length * 0.25),
        summary: "User testing planning, research findings, and validation approach",
      },
    ],

    disagreements: [
      "Emily Watson expressed concern that multi-step checkout could add friction, while Marcus Johnson argued studies show progressive disclosure improves completion rates.",
    ],

    repeatedFeedback: [
      "Multiple team members emphasized the importance of keeping guest checkout visible and accessible",
      "The 23% drop-off rate at payment step was referenced several times as the core problem to solve",
      "Mobile experience was consistently prioritized over desktop throughout the discussion",
    ],
  };
}
