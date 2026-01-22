"use client";

/**
 * DigestView Component
 * 
 * Main component for rendering the complete digest output.
 * Orchestrates all sub-components and provides overall layout.
 */

import { Digest } from "@/lib/types";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { Timeline } from "./Timeline";
import { Decisions } from "./Decisions";
import { ActionItems } from "./ActionItems";
import { OpenQuestions } from "./OpenQuestions";

interface DigestViewProps {
  digest: Digest;
  aiMode: "openai" | "mock";
}

export function DigestView({ digest, aiMode }: DigestViewProps) {
  return (
    <div className="space-y-4">
      {/* Header with AI Mode indicator */}
      <div className="bg-[#1E1B2E] rounded-2xl p-4 border border-[#3D3654]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
              <span className="text-white text-lg">📋</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">Your Digest</h2>
              <p className="text-[#9CA3AF] text-sm">Analysis complete</p>
            </div>
          </div>
          <AIModeIndicator mode={aiMode} />
        </div>
      </div>

      {/* Executive Summary */}
      <ExecutiveSummary summary={digest.executiveSummary} />

      {/* Topic Clusters */}
      {digest.topicClusters.length > 0 && (
        <TopicClusters clusters={digest.topicClusters} />
      )}

      {/* Timeline */}
      <Timeline events={digest.timeline} />

      {/* Decisions */}
      <Decisions decisions={digest.decisions} />

      {/* Action Items */}
      <ActionItems items={digest.actionItems} />

      {/* Open Questions */}
      <OpenQuestions questions={digest.openQuestions} />

      {/* Additional Insights */}
      <AdditionalInsights 
        disagreements={digest.disagreements}
        repeatedFeedback={digest.repeatedFeedback}
      />
    </div>
  );
}

function AIModeIndicator({ mode }: { mode: "openai" | "mock" }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
      mode === "openai" 
        ? "bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30" 
        : "bg-[#3D3654] text-[#9CA3AF] border border-[#3D3654]"
    }`}>
      <span className={`w-2 h-2 rounded-full ${mode === "openai" ? "bg-[#34D399]" : "bg-[#6B7280]"}`} />
      {mode === "openai" ? "OpenAI" : "Demo Mode"}
    </div>
  );
}

function TopicClusters({ clusters }: { clusters: Digest["topicClusters"] }) {
  return (
    <section className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">🏷️</span>
        Topics Discussed
      </h2>
      
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {clusters.map((cluster, index) => (
          <div 
            key={index}
            className="bg-[#13111C] rounded-xl p-4 border border-[#3D3654]"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-white text-sm">{cluster.topic}</h3>
              <span className="text-xs px-2 py-0.5 bg-[#3D3654] rounded-full text-[#9CA3AF]">
                {cluster.entries}
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{cluster.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdditionalInsights({ 
  disagreements, 
  repeatedFeedback 
}: { 
  disagreements: string[];
  repeatedFeedback: string[];
}) {
  if (disagreements.length === 0 && repeatedFeedback.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">💡</span>
        Additional Insights
      </h2>
      
      <div className="space-y-5">
        {disagreements.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[#FB923C] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
              Disagreements
            </h3>
            <ul className="space-y-2">
              {disagreements.map((item, index) => (
                <li 
                  key={index}
                  className="text-sm text-[#9CA3AF] bg-[#13111C] rounded-xl p-3 border-l-2 border-[#FB923C]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {repeatedFeedback.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[#8B5CF6] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              Repeated Feedback
            </h3>
            <ul className="space-y-2">
              {repeatedFeedback.map((item, index) => (
                <li 
                  key={index}
                  className="text-sm text-[#9CA3AF] bg-[#13111C] rounded-xl p-3 border-l-2 border-[#8B5CF6]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
