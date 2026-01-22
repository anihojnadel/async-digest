"use client";

/**
 * Decisions Component
 * 
 * Displays decisions organized by status:
 * - Decided: Confirmed decisions
 * - Pending: Proposals awaiting confirmation
 * - Blocked: Decisions blocked by dependencies
 */

import { Decision } from "@/lib/types";

interface DecisionsProps {
  decisions: {
    decided: Decision[];
    pending: Decision[];
    blocked: Decision[];
  };
}

export function Decisions({ decisions }: DecisionsProps) {
  const hasDecisions = 
    decisions.decided.length > 0 || 
    decisions.pending.length > 0 || 
    decisions.blocked.length > 0;

  if (!hasDecisions) {
    return null;
  }

  return (
    <section className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">🎯</span>
        Decisions
      </h2>
      
      <div className="space-y-5">
        {decisions.decided.length > 0 && (
          <DecisionGroup 
            title="Decided" 
            decisions={decisions.decided}
            variant="decided"
          />
        )}
        
        {decisions.pending.length > 0 && (
          <DecisionGroup 
            title="Pending" 
            decisions={decisions.pending}
            variant="pending"
          />
        )}
        
        {decisions.blocked.length > 0 && (
          <DecisionGroup 
            title="Blocked" 
            decisions={decisions.blocked}
            variant="blocked"
          />
        )}
      </div>
    </section>
  );
}

type DecisionVariant = "decided" | "pending" | "blocked";

function DecisionGroup({ 
  title, 
  decisions,
  variant,
}: { 
  title: string; 
  decisions: Decision[];
  variant: DecisionVariant;
}) {
  const variantStyles = {
    decided: {
      dot: "bg-[#34D399]",
      title: "text-[#34D399]",
      count: "text-[#34D399]",
    },
    pending: {
      dot: "bg-[#FB923C]",
      title: "text-[#FB923C]",
      count: "text-[#FB923C]",
    },
    blocked: {
      dot: "bg-[#F97066]",
      title: "text-[#F97066]",
      count: "text-[#F97066]",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
        <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
        <span className={`text-xs ${styles.count}`}>({decisions.length})</span>
      </div>
      
      <div className="space-y-2">
        {decisions.map((decision, index) => (
          <DecisionCard key={index} decision={decision} variant={variant} />
        ))}
      </div>
    </div>
  );
}

function DecisionCard({ 
  decision,
  variant,
}: { 
  decision: Decision;
  variant: DecisionVariant;
}) {
  const borderColors = {
    decided: "border-l-[#34D399]",
    pending: "border-l-[#FB923C]",
    blocked: "border-l-[#F97066]",
  };

  return (
    <div className={`bg-[#13111C] rounded-xl p-4 border border-[#3D3654] border-l-2 ${borderColors[variant]}`}>
      <p className="text-[#E5E7EB] font-medium text-sm mb-2">{decision.description}</p>
      
      {decision.context && (
        <p className="text-xs text-[#9CA3AF] mb-2">{decision.context}</p>
      )}
      
      {decision.participants.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {decision.participants.map((participant, i) => (
            <span 
              key={i}
              className="text-xs px-2 py-0.5 bg-[#2A2640] rounded-full text-[#9CA3AF]"
            >
              {participant}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
