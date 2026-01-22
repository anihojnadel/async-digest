/**
 * Mock Loom video data for testing and demo purposes.
 * Simulates video transcripts and comments from product walkthroughs.
 */

import { NormalizedEntry } from "@/lib/types";

/**
 * Mock Loom video walkthrough of the checkout flow designs.
 * Combines transcript segments and viewer comments.
 */
export const mockLoomVideo1: NormalizedEntry[] = [
  // Transcript segments (from the video author)
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:00:00Z",
    content:
      "[Video Transcript] Hey everyone, I wanted to walk you through the checkout redesign mockups before our next sync. I'm going to show you both the mobile and desktop versions.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:01:00Z",
    content:
      "[Video Transcript] Starting with mobile - you can see I've broken the checkout into three clear steps: Shipping, Payment, and Review. Each step has its own screen which reduces cognitive load.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:02:30Z",
    content:
      "[Video Transcript] Notice the progress indicator at the top - it shows users exactly where they are in the process. This directly addresses the feedback about users feeling lost.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:04:00Z",
    content:
      "[Video Transcript] For the payment step, I've added icons for accepted card types and included the secure checkout badge. Trust signals are crucial here given our drop-off data.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:05:30Z",
    content:
      "[Video Transcript] One thing I'm not sure about - should the order summary be sticky on the side or collapsible on mobile? I'd love feedback on this.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:07:00Z",
    content:
      "[Video Transcript] Switching to desktop now. The layout uses a two-column approach - form on the left, order summary on the right. Pretty standard but effective.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T16:08:30Z",
    content:
      "[Video Transcript] I've also prepared an alternative version where all steps are visible on one page with accordion-style sections. Let me know which approach you prefer.",
  },
  // Comments on the video
  {
    source: "loom",
    author: "Sarah Chen",
    timestamp: "2024-01-15T17:30:00Z",
    content:
      "[Loom Comment] Love the progress indicator! For the order summary question - I think collapsible on mobile is better. Users want to focus on the form, not scroll past a big summary.",
  },
  {
    source: "loom",
    author: "Alex Rivera",
    timestamp: "2024-01-15T18:00:00Z",
    content:
      "[Loom Comment] Great walkthrough Marcus. Quick note - the card icons look a bit dated. Can we use the official brand assets from Visa/Mastercard?",
  },
  {
    source: "loom",
    author: "Emily Watson",
    timestamp: "2024-01-15T18:45:00Z",
    content:
      "[Loom Comment] I prefer the multi-step mobile version over the accordion desktop version. The accordion feels like it could get confusing with sections opening and closing.",
  },
  {
    source: "loom",
    author: "David Park",
    timestamp: "2024-01-15T19:15:00Z",
    content:
      "[Loom Comment] From an engineering perspective, the multi-step approach is easier to implement and maintain. The accordion would require more state management.",
  },
  {
    source: "loom",
    author: "Sarah Chen",
    timestamp: "2024-01-15T20:00:00Z",
    content:
      "[Loom Comment] Sounds like we have consensus on multi-step. Marcus, can you finalize the mobile designs with collapsible order summary? We'll use those for testing.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T21:00:00Z",
    content:
      "[Loom Comment] @Sarah will do! I'll update the card icons too @Alex. Expect the final Figma link by Wednesday morning.",
  },
];

/**
 * Mock Loom video about user research findings.
 */
export const mockLoomVideo2: NormalizedEntry[] = [
  {
    source: "loom",
    author: "Emily Watson",
    timestamp: "2024-01-17T10:00:00Z",
    content:
      "[Video Transcript] Hi team, sharing findings from our user research sessions this week. I interviewed 6 users about their checkout experiences.",
  },
  {
    source: "loom",
    author: "Emily Watson",
    timestamp: "2024-01-17T10:02:00Z",
    content:
      "[Video Transcript] Key finding number one: 5 out of 6 users mentioned they want to see shipping costs BEFORE entering payment info. This came up repeatedly.",
  },
  {
    source: "loom",
    author: "Emily Watson",
    timestamp: "2024-01-17T10:04:00Z",
    content:
      "[Video Transcript] Finding two: Users are confused by the difference between billing and shipping address. They asked 'why do you need both?' Consider auto-filling billing from shipping.",
  },
  {
    source: "loom",
    author: "Emily Watson",
    timestamp: "2024-01-17T10:06:00Z",
    content:
      "[Video Transcript] Finding three: The 'Continue as Guest' option was missed by 3 users. It's too small and positioned below the login form. We should make it more prominent.",
  },
  {
    source: "loom",
    author: "Emily Watson",
    timestamp: "2024-01-17T10:08:00Z",
    content:
      "[Video Transcript] I've added all the session recordings to the research repository if anyone wants to watch the full interviews. Happy to discuss any of these findings.",
  },
  {
    source: "loom",
    author: "Sarah Chen",
    timestamp: "2024-01-17T11:30:00Z",
    content:
      "[Loom Comment] This is gold, Emily. The shipping cost visibility is critical - we should show estimated shipping on the cart page BEFORE checkout even starts.",
  },
  {
    source: "loom",
    author: "Marcus Johnson",
    timestamp: "2024-01-17T12:00:00Z",
    content:
      "[Loom Comment] The guest checkout visibility issue is easily fixed. I'll make the button the same size as the login button in the next iteration.",
  },
  {
    source: "loom",
    author: "Alex Rivera",
    timestamp: "2024-01-17T14:00:00Z",
    content:
      "[Loom Comment] Regarding billing/shipping - we have legal requirements to collect billing address for fraud prevention. But we can definitely auto-fill and let users change if different.",
  },
];

/**
 * Map of video identifiers to mock data.
 */
export const loomMockDataMap: Record<string, NormalizedEntry[]> = {
  "checkout-walkthrough": mockLoomVideo1,
  "user-research": mockLoomVideo2,
  // Default video for any unrecognized identifier
  default: mockLoomVideo1,
};

/**
 * Get mock Loom data for a given video identifier.
 * Falls back to default data if identifier is not found.
 */
export function getMockLoomData(identifier: string): NormalizedEntry[] {
  return loomMockDataMap[identifier] || loomMockDataMap["default"];
}
