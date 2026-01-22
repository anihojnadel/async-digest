# Async Digest

Transform scattered Slack threads and Loom videos into a single, actionable digest. Stop chasing answers, start making decisions.

## Overview

Modern product and design teams work asynchronously using Slack threads and Loom videos. Feedback and decisions are fragmented across these channels, creating invisible work: chasing answers, re-explaining context, and re-synthesizing discussions.

Async Digest consolidates distributed async inputs into a single structured digest, providing:

- **Executive Summary**: What was discussed, why it matters, what changed
- **Timeline**: Condensed chronological view of how the discussion evolved
- **Decisions**: Organized by status (decided, pending, blocked)
- **Action Items**: With owners and status tracking
- **Open Questions**: Things still unresolved

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables (Optional)

Create a `.env.local` file to enable real AI processing:

```
OPENAI_API_KEY=sk-your-api-key-here
```

When no API key is provided, the app uses mock AI responses for demo purposes.

## Usage

1. Open the app in your browser
2. Paste one or more Slack thread or Loom video links (one per line)
3. Click "Generate Digest"
4. Review the structured output

### Demo Mode

Click "Load Sample" to use pre-configured demo links that demonstrate the app's capabilities without requiring real Slack/Loom integrations.

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Main UI
│   ├── layout.tsx            # Root layout
│   └── api/generate/         # API endpoint
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── normalizer.ts         # Input normalization
│   ├── ai-processor.ts       # AI pipeline orchestration
│   ├── mock-ai.ts            # Mock AI responses
│   └── openai-client.ts      # Real OpenAI integration
├── mocks/
│   ├── slack-data.ts         # Mock Slack thread data
│   └── loom-data.ts          # Mock Loom transcript/comments
└── components/
    ├── InputForm.tsx         # Link input UI
    ├── DigestView.tsx        # Structured output display
    ├── ExecutiveSummary.tsx  # Summary section
    ├── Timeline.tsx          # Chronological view
    ├── Decisions.tsx         # Decisions section
    ├── ActionItems.tsx       # Action items section
    └── OpenQuestions.tsx     # Open questions section
```

### Data Flow

1. **Input**: User pastes Slack/Loom URLs
2. **Parsing**: URLs are validated and categorized by source type
3. **Normalization**: Data is fetched (from mocks or APIs) and converted to a common format:
   ```typescript
   {
     source: "slack" | "loom",
     author: string,
     timestamp: string,
     content: string
   }
   ```
4. **AI Processing**: Entries are analyzed to extract:
   - Topic clusters
   - Decisions (decided/pending/blocked)
   - Action items with owners
   - Open questions
   - Disagreements and repeated feedback
5. **Output**: Structured digest rendered as readable UI

## Key Principles

- **Consolidation, not invention**: AI is used to structure information, not to decide
- **Conservative extraction**: When in doubt, mark items as "pending" or "open"
- **Attribution**: Only attribute statements to people who actually said them
- **Transparency**: Clear indication of AI mode (OpenAI vs mock)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4 (optional)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## License

MIT
