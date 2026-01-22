/**
 * Mock Slack thread data for testing and demo purposes.
 * Simulates realistic product design discussions with multiple participants.
 */

import { NormalizedEntry } from "@/lib/types";

/**
 * Mock Slack thread about a checkout flow redesign.
 * Contains decisions, disagreements, action items, and open questions.
 */
export const mockSlackThread1: NormalizedEntry[] = [
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T09:00:00Z",
    content:
      "Hey team! Following up on the checkout flow redesign. I've reviewed the analytics and we're seeing a 23% drop-off at the payment step. We need to address this urgently.",
  },
  {
    source: "slack",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T09:15:00Z",
    content:
      "That's significant. Do we know if it's mobile or desktop? My hunch is mobile given the smaller form factors.",
  },
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T09:22:00Z",
    content:
      "Good question - it's actually 67% mobile. The form fields are definitely too cramped on smaller screens.",
  },
  {
    source: "slack",
    author: "Alex Rivera",
    timestamp: "2024-01-15T09:45:00Z",
    content:
      "I've been looking into this. I think we should consider a multi-step checkout instead of the single long form. Apple Pay and Google Pay integration could also help a lot.",
  },
  {
    source: "slack",
    author: "Emily Watson",
    timestamp: "2024-01-15T10:00:00Z",
    content:
      "Multi-step could work, but won't that add friction? Users might feel like the process is longer even if it's actually easier to complete.",
  },
  {
    source: "slack",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T10:12:00Z",
    content:
      "I disagree with Emily here. Studies show that progressive disclosure actually improves completion rates. We should definitely do multi-step.",
  },
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T10:30:00Z",
    content:
      "Let's not debate without data. @Alex can you run a quick competitive analysis? See how Shopify, Stripe Checkout, and Amazon handle this?",
  },
  {
    source: "slack",
    author: "Alex Rivera",
    timestamp: "2024-01-15T11:00:00Z",
    content:
      "On it! I can have that ready by tomorrow. Also, I want to flag that we'll need engineering buy-in for the wallet integrations - those have API implications.",
  },
  {
    source: "slack",
    author: "David Park",
    timestamp: "2024-01-15T11:30:00Z",
    content:
      "Engineering here - wallet integrations are definitely doable but we'd need about 2 sprints. The multi-step form is much simpler, maybe 1 sprint. What's the priority?",
  },
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T11:45:00Z",
    content:
      "Good to know the timeline. Let's prioritize the multi-step form first since it addresses the core UX issue. We can add wallet payments in phase 2.",
  },
  {
    source: "slack",
    author: "Emily Watson",
    timestamp: "2024-01-15T12:00:00Z",
    content:
      "Fine with phasing. But who's going to handle the user testing for the new flow? We should validate before full build.",
  },
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T12:15:00Z",
    content:
      "Great point. @Emily can you own the user testing piece? Let's aim for 5-7 participants next week.",
  },
  {
    source: "slack",
    author: "Emily Watson",
    timestamp: "2024-01-15T12:20:00Z",
    content: "Sure, I can take that on. I'll need the prototype from design by Thursday though.",
  },
  {
    source: "slack",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T12:30:00Z",
    content:
      "I can have the Figma prototype ready by Wednesday EOD. Should I include both desktop and mobile versions?",
  },
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T12:45:00Z",
    content:
      "Yes, both please. Mobile is priority but we need to see how it scales. Also, one open question - should we keep the guest checkout option or require account creation? Thoughts?",
  },
  {
    source: "slack",
    author: "Alex Rivera",
    timestamp: "2024-01-15T13:00:00Z",
    content:
      "Definitely keep guest checkout. Our data shows 40% of users abandon when forced to create an account. We can prompt for account creation AFTER successful purchase.",
  },
  {
    source: "slack",
    author: "David Park",
    timestamp: "2024-01-15T13:15:00Z",
    content:
      "Agreed on guest checkout. One blocker though - the current session handling doesn't support guest carts well. I need to discuss with the backend team. Might push timeline by a few days.",
  },
  {
    source: "slack",
    author: "Sarah Chen",
    timestamp: "2024-01-15T13:30:00Z",
    content:
      "Okay, let's sync on the backend blocker separately. To summarize decisions so far: 1) Multi-step checkout first, wallets in phase 2. 2) Keep guest checkout. 3) User testing next week. Any objections?",
  },
  {
    source: "slack",
    author: "Marcus Johnson",
    timestamp: "2024-01-15T13:35:00Z",
    content: "No objections. Clear plan!",
  },
  {
    source: "slack",
    author: "Emily Watson",
    timestamp: "2024-01-15T13:40:00Z",
    content:
      "Sounds good. One thing still unclear - what's our success metric? Is it just completion rate or are we tracking time-to-complete too?",
  },
];

/**
 * Mock Slack thread about onboarding improvements.
 */
export const mockSlackThread2: NormalizedEntry[] = [
  {
    source: "slack",
    author: "Jordan Lee",
    timestamp: "2024-01-16T14:00:00Z",
    content:
      "Team, quick update on the onboarding project. We've seen a 15% improvement in activation after implementing the progress bar. Users really respond to visual progress indicators.",
  },
  {
    source: "slack",
    author: "Nina Patel",
    timestamp: "2024-01-16T14:15:00Z",
    content:
      "That's great! But I've been hearing from support that users are still confused about the workspace setup step. They don't understand what a workspace is.",
  },
  {
    source: "slack",
    author: "Jordan Lee",
    timestamp: "2024-01-16T14:30:00Z",
    content:
      "Yeah, I've seen those tickets too. We should add a tooltip or maybe a short video explaining workspaces. @Chris can you write some copy for this?",
  },
  {
    source: "slack",
    author: "Chris Morgan",
    timestamp: "2024-01-16T14:45:00Z",
    content:
      "Sure thing. Should I position it as 'your team's home base' or more technical? Need to know the audience level.",
  },
  {
    source: "slack",
    author: "Nina Patel",
    timestamp: "2024-01-16T15:00:00Z",
    content:
      "Our users are primarily non-technical, so 'team's home base' sounds better. Keep it simple and friendly.",
  },
  {
    source: "slack",
    author: "Jordan Lee",
    timestamp: "2024-01-16T15:15:00Z",
    content:
      "Agreed. Also, I think we should consider adding sample data to new workspaces so users can explore the product before adding their own content. What do you think?",
  },
  {
    source: "slack",
    author: "Chris Morgan",
    timestamp: "2024-01-16T15:30:00Z",
    content:
      "Love that idea. Empty states are the worst. We could create a 'Sample Project' with example tasks and documents.",
  },
  {
    source: "slack",
    author: "Nina Patel",
    timestamp: "2024-01-16T15:45:00Z",
    content:
      "I'm a bit worried about the engineering effort for sample data. It adds complexity to the data model. Can we discuss with the backend team first?",
  },
];

/**
 * Map of thread identifiers to mock data.
 * In a real app, this would be replaced with Slack API calls.
 */
export const slackMockDataMap: Record<string, NormalizedEntry[]> = {
  "checkout-redesign": mockSlackThread1,
  "onboarding-update": mockSlackThread2,
  // Default thread for any unrecognized identifier
  default: mockSlackThread1,
};

/**
 * Get mock Slack data for a given thread identifier.
 * Falls back to default data if identifier is not found.
 */
export function getMockSlackData(identifier: string): NormalizedEntry[] {
  return slackMockDataMap[identifier] || slackMockDataMap["default"];
}
