"use client";

/**
 * ExecutiveSummary Component
 * 
 * Displays the high-level summary of the discussion.
 */

import { Digest } from "@/lib/types";
import { CollapsibleSection } from "./CollapsibleSection";

interface ExecutiveSummaryProps {
  summary: Digest["executiveSummary"];
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <CollapsibleSection title="Executive Summary" icon="📋" defaultOpen={true}>
      <div className="space-y-3">
        <SummaryBlock 
          title="What Was Discussed" 
          content={summary.whatWasDiscussed}
          color="purple"
        />
        <SummaryBlock 
          title="Why It Matters" 
          content={summary.whyItMatters}
          color="orange"
        />
        <SummaryBlock 
          title="What Changed" 
          content={summary.whatChanged}
          color="green"
        />
      </div>
    </CollapsibleSection>
  );
}

function SummaryBlock({ 
  title, 
  content, 
  color
}: { 
  title: string; 
  content: string;
  color: "purple" | "orange" | "green";
}) {
  const colors = {
    purple: {
      dot: "bg-[#8B5CF6]",
      title: "text-[#A78BFA]",
    },
    orange: {
      dot: "bg-[#FB923C]",
      title: "text-[#FB923C]",
    },
    green: {
      dot: "bg-[#34D399]",
      title: "text-[#34D399]",
    },
  };

  const style = colors[color];

  return (
    <div className="bg-[#13111C] rounded-xl p-4 border border-[#3D3654]">
      <h3 className={`text-xs font-semibold ${style.title} mb-2 flex items-center gap-2`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {title}
      </h3>
      <p className="text-[#E5E7EB] text-sm leading-relaxed">{content}</p>
    </div>
  );
}
