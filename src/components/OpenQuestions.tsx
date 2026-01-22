"use client";

/**
 * OpenQuestions Component
 * 
 * Displays unresolved questions from the discussion.
 */

import { CollapsibleSection } from "./CollapsibleSection";

interface OpenQuestionsProps {
  questions: string[];
}

export function OpenQuestions({ questions }: OpenQuestionsProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <CollapsibleSection 
      title="Open Questions" 
      icon="❓" 
      badge={questions.length}
      badgeColor="text-[#FB923C]"
      defaultOpen={true}
    >
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li 
            key={index}
            className="flex items-start gap-3 bg-[#13111C] rounded-xl p-4 border border-[#3D3654]"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FB923C]/20 text-[#FB923C] flex items-center justify-center text-xs font-bold">
              ?
            </span>
            <p className="text-[#E5E7EB] text-sm">{question}</p>
          </li>
        ))}
      </ul>
      
      <p className="mt-4 text-xs text-[#6B7280] italic">
        These questions need to be addressed before the discussion can be considered complete.
      </p>
    </CollapsibleSection>
  );
}
