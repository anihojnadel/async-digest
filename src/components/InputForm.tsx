"use client";

/**
 * InputForm Component
 * 
 * Handles user input for Slack and Loom links.
 * Provides validation feedback and loading states.
 */

import { useState } from "react";

interface InputFormProps {
  onSubmit: (links: string[]) => void;
  isLoading: boolean;
}

// Sample links for demo purposes
const SAMPLE_LINKS = `https://slack.com/archives/checkout-redesign
https://loom.com/share/checkout-walkthrough`;

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Parse links from textarea (one per line)
    const links = inputValue
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (links.length === 0) {
      setError("Please enter at least one Slack or Loom link");
      return;
    }

    // Basic validation - check if links contain slack.com or loom.com
    const invalidLinks = links.filter(
      (link) => !link.includes("slack.com") && !link.includes("loom.com")
    );

    if (invalidLinks.length > 0) {
      setError(`Invalid links detected: ${invalidLinks.join(", ")}`);
      return;
    }

    onSubmit(links);
  };

  const handleLoadSample = () => {
    setInputValue(SAMPLE_LINKS);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="links-input" 
          className="block text-sm font-medium text-[#A78BFA] mb-2"
        >
          Paste your links
        </label>
        <p className="text-[#9CA3AF] text-sm mb-3">
          Add Slack thread or Loom video links (one per line)
        </p>
        <textarea
          id="links-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`https://slack.com/archives/C123/p456789\nhttps://loom.com/share/abc123`}
          className="w-full h-32 px-4 py-3 bg-[#13111C] border border-[#3D3654] rounded-xl 
                     text-white placeholder-[#6B7280] 
                     focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6]
                     font-mono text-sm resize-none"
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="flex items-start gap-3 p-3 bg-[#F97066]/10 border border-[#F97066]/30 rounded-xl">
          <div className="w-5 h-5 rounded-full bg-[#F97066]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[#F97066] text-xs">!</span>
          </div>
          <p className="text-[#F97066] text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]
                     hover:from-[#A78BFA] hover:to-[#8B5CF6]
                     disabled:from-[#3D3654] disabled:to-[#3D3654] disabled:cursor-not-allowed
                     text-white font-semibold rounded-xl transition-all duration-200"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner />
              Generating...
            </span>
          ) : (
            "Generate Digest"
          )}
        </button>
        
        <button
          type="button"
          onClick={handleLoadSample}
          disabled={isLoading}
          className="px-4 py-3.5 bg-[#2A2640] hover:bg-[#3D3654]
                     disabled:bg-[#1E1B2E] disabled:cursor-not-allowed
                     text-[#A78BFA] font-medium rounded-xl transition-colors
                     border border-[#3D3654]"
        >
          Demo
        </button>
      </div>

      <p className="text-xs text-[#6B7280] text-center">
        Paste multiple links to consolidate discussions into one digest
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg 
      className="animate-spin h-5 w-5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
