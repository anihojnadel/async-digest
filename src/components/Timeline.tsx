"use client";

/**
 * Timeline Component
 * 
 * Displays a condensed chronological view of how the discussion evolved.
 * Shows key moments with significance indicators.
 */

import { TimelineEvent } from "@/lib/types";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">📅</span>
        Timeline
      </h2>
      
      <div className="relative">
        {/* Vertical line connecting events */}
        <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-[#3D3654]" />
        
        <div className="space-y-3">
          {events.map((event, index) => (
            <TimelineItem key={index} event={event} isLast={index === events.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  const significanceColors = {
    high: "bg-[#8B5CF6] ring-[#8B5CF6]/30",
    medium: "bg-[#6B7280] ring-[#6B7280]/30",
    low: "bg-[#3D3654] ring-[#3D3654]/30",
  };

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="relative pl-8">
      {/* Dot indicator */}
      <div 
        className={`absolute left-1 top-3 w-[10px] h-[10px] rounded-full ${significanceColors[event.significance]} ring-4`}
      />
      
      <div className="bg-[#13111C] rounded-xl p-4 border border-[#3D3654]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <span className="text-xs text-[#6B7280] font-mono">
            {formatTime(event.timestamp)}
          </span>
          <SignificanceBadge level={event.significance} />
        </div>
        
        <p className="text-[#E5E7EB] text-sm leading-relaxed mb-2">
          {event.summary}
        </p>
        
        {event.participants.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.participants.map((participant, i) => (
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
    </div>
  );
}

function SignificanceBadge({ level }: { level: TimelineEvent["significance"] }) {
  const styles = {
    high: "bg-[#8B5CF6]/20 text-[#A78BFA] border-[#8B5CF6]/30",
    medium: "bg-[#6B7280]/20 text-[#9CA3AF] border-[#6B7280]/30",
    low: "bg-[#3D3654]/20 text-[#6B7280] border-[#3D3654]/30",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[level]}`}>
      {level}
    </span>
  );
}
