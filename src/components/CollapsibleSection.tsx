"use client";

/**
 * CollapsibleSection Component
 * 
 * A reusable wrapper that makes any section collapsible with smooth animation.
 */

import { useState, ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  badgeColor?: string;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
  badgeColor = "text-[#6B7280]",
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="bg-[#1E1B2E] rounded-2xl border border-[#3D3654] overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-[#2A2640] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-sm">
            {icon}
          </span>
          <h2 className="text-white font-semibold">{title}</h2>
          {badge !== undefined && (
            <span className={`text-sm font-normal ${badgeColor}`}>({badge})</span>
          )}
        </div>
        
        {/* Chevron indicator */}
        <svg
          className={`w-5 h-5 text-[#6B7280] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-5 pb-5">
          {children}
        </div>
      </div>
    </section>
  );
}
