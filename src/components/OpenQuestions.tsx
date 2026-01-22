"use client";

/**
 * OpenQuestions Component
 * 
 * Displays unresolved questions from the discussion.
 * These are items that need clarification or decision.
 */

interface OpenQuestionsProps {
  questions: string[];
}

export function OpenQuestions({ questions }: OpenQuestionsProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-[#FB923C]/20 flex items-center justify-center text-sm">❓</span>
        Open Questions
        <span className="text-sm font-normal text-[#6B7280]">({questions.length})</span>
      </h2>
      
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
    </section>
  );
}
