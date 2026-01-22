"use client";

/**
 * ActionItems Component
 * 
 * Displays extracted action items with:
 * - Action description
 * - Owner (if detectable)
 * - Status (decided/pending/blocked)
 * 
 * Includes copy-to-clipboard functionality for Asana import.
 */

import { useState } from "react";
import { ActionItem } from "@/lib/types";

interface ActionItemsProps {
  items: ActionItem[];
}

export function ActionItems({ items }: ActionItemsProps) {
  const [copied, setCopied] = useState<"list" | "asana" | null>(null);

  if (items.length === 0) {
    return null;
  }

  /**
   * Format action items for Asana import.
   * Creates a tab-separated format that works well with Asana's CSV import.
   */
  const formatForAsana = (): string => {
    const lines: string[] = [];
    lines.push("Task Name\tAssignee\tStatus\tDescription");
    
    items.forEach((item) => {
      const taskName = item.action;
      const assignee = item.owner || "";
      const status = item.status.charAt(0).toUpperCase() + item.status.slice(1);
      const description = item.context || "";
      
      lines.push(`${taskName}\t${assignee}\t${status}\t${description}`);
    });
    
    return lines.join("\n");
  };

  /**
   * Format action items as a simple text list for quick copy.
   */
  const formatAsTextList = (): string => {
    return items.map((item, index) => {
      const owner = item.owner ? ` (@${item.owner})` : "";
      const status = `[${item.status.toUpperCase()}]`;
      const context = item.context ? `\n   → ${item.context}` : "";
      
      return `${index + 1}. ${item.action}${owner} ${status}${context}`;
    }).join("\n\n");
  };

  const handleCopyForAsana = async () => {
    try {
      await navigator.clipboard.writeText(formatForAsana());
      setCopied("asana");
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyAsText = async () => {
    try {
      await navigator.clipboard.writeText(formatAsTextList());
      setCopied("list");
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">✅</span>
          Action Items
          <span className="text-sm font-normal text-[#6B7280]">({items.length})</span>
        </h2>
        
        {/* Copy buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAsText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                     bg-[#2A2640] hover:bg-[#3D3654] 
                     text-[#9CA3AF] hover:text-white
                     rounded-lg border border-[#3D3654] transition-all"
          >
            <ClipboardIcon />
            {copied === "list" ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleCopyForAsana}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                     bg-gradient-to-r from-[#F97066] to-[#FB923C]
                     hover:from-[#fb8a82] hover:to-[#fcac5f]
                     text-white rounded-lg transition-all"
          >
            <AsanaIcon />
            {copied === "asana" ? "Copied!" : "Asana"}
          </button>
        </div>
      </div>

      {/* Format hint */}
      <div className="mb-4 p-3 bg-[#13111C] rounded-xl border border-[#3D3654]">
        <p className="text-xs text-[#6B7280]">
          <span className="text-[#A78BFA]">Tip:</span> Click "Asana" to copy in CSV format. 
          In Asana: Project → Add tasks via → CSV → paste content.
        </p>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <ActionItemCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function ActionItemCard({ item, index }: { item: ActionItem; index: number }) {
  const statusStyles = {
    decided: {
      bg: "bg-[#34D399]/10",
      border: "border-[#34D399]/30",
      text: "text-[#34D399]",
      icon: "✓",
    },
    pending: {
      bg: "bg-[#FB923C]/10",
      border: "border-[#FB923C]/30",
      text: "text-[#FB923C]",
      icon: "○",
    },
    blocked: {
      bg: "bg-[#F97066]/10",
      border: "border-[#F97066]/30",
      text: "text-[#F97066]",
      icon: "✕",
    },
  };

  const styles = statusStyles[item.status];

  return (
    <div className={`${styles.bg} rounded-xl p-4 border ${styles.border}`}>
      <div className="flex items-start gap-3">
        {/* Status indicator */}
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${styles.text} border ${styles.border} text-sm font-bold`}>
          {styles.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Action description */}
          <p className="text-[#E5E7EB] font-medium text-sm">{item.action}</p>
          
          {/* Context if available */}
          {item.context && (
            <p className="text-xs text-[#9CA3AF] mt-1">{item.context}</p>
          )}
          
          {/* Meta information */}
          <div className="flex items-center gap-2 mt-2">
            {item.owner && (
              <span className="text-xs px-2 py-1 bg-[#2A2640] rounded-full text-[#A78BFA]">
                {item.owner}
              </span>
            )}
            
            <span className={`text-xs px-2 py-0.5 rounded-full ${styles.text} ${styles.bg} border ${styles.border}`}>
              {item.status}
            </span>
          </div>
        </div>
        
        {/* Index number */}
        <span className="text-xs text-[#3D3654] font-mono">#{index + 1}</span>
      </div>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}

function AsanaIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.78 12.653c-2.476 0-4.484 2.009-4.484 4.484 0 2.476 2.008 4.484 4.484 4.484 2.475 0 4.483-2.008 4.483-4.484 0-2.475-2.008-4.484-4.483-4.484zm-13.56 0c-2.476 0-4.483 2.009-4.483 4.484 0 2.476 2.007 4.484 4.483 4.484s4.484-2.008 4.484-4.484c0-2.475-2.008-4.484-4.484-4.484zM12 2.378c-2.476 0-4.484 2.008-4.484 4.484 0 2.475 2.008 4.483 4.484 4.483s4.484-2.008 4.484-4.483c0-2.476-2.008-4.484-4.484-4.484z"/>
    </svg>
  );
}
