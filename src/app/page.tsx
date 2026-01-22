"use client";

/**
 * Async Digest - Main Page
 * 
 * This is the entry point for the application.
 * Users can paste Slack and Loom links to generate a structured digest
 * that consolidates distributed async inputs into actionable insights.
 */

import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { DigestView } from "@/components/DigestView";
import { Digest, GenerateResponse } from "@/lib/types";

type AppState = "input" | "loading" | "result" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("input");
  const [digest, setDigest] = useState<Digest | null>(null);
  const [aiMode, setAiMode] = useState<"openai" | "mock">("mock");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (links: string[]) => {
    setAppState("loading");
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ links }),
      });

      const data: GenerateResponse = await response.json();

      if (!data.success || !data.digest) {
        throw new Error(data.error || "Failed to generate digest");
      }

      setDigest(data.digest);
      setAiMode(data.aiMode);
      setAppState("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setAppState("error");
    }
  };

  const handleReset = () => {
    setAppState("input");
    setDigest(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#13111C]">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">
              Async Digest
            </h1>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1B2E] rounded-full border border-[#3D3654]">
              <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse" />
              <span className="text-[#A78BFA] text-sm font-medium">AI-Powered</span>
            </div>
          </div>

          {/* Score card - similar to Rest Sleep Score */}
          <div className="bg-[#1E1B2E] rounded-2xl p-4 border border-[#3D3654]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <svg className="w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#3D3654"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="url(#purpleGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={175.9}
                    strokeDashoffset={0}
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✨</span>
                </div>
              </div>
              <div>
                <h2 className="text-white font-semibold flex items-center gap-2">
                  Consolidate Async Work
                  <span className="text-[#8B5CF6]">✦</span>
                </h2>
                <p className="text-[#9CA3AF] text-sm">
                  Transform Slack & Loom into insights
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {(appState === "input" || appState === "loading") && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Get Started</h3>
              <div className="bg-[#1E1B2E] rounded-2xl p-5 border border-[#3D3654]">
                <InputForm 
                  onSubmit={handleSubmit} 
                  isLoading={appState === "loading"} 
                />
              </div>
            </div>
          )}

          {appState === "error" && (
            <div className="bg-[#1E1B2E] rounded-2xl p-6 border border-[#3D3654]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#F97066]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#F97066] text-2xl">!</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Something went wrong
                </h2>
                <p className="text-[#9CA3AF] mb-6">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]
                           hover:from-[#A78BFA] hover:to-[#8B5CF6]
                           text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {appState === "result" && digest && (
            <div className="space-y-4">
              {/* Back button */}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                New digest
              </button>

              {/* Digest output */}
              <DigestView digest={digest} aiMode={aiMode} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-[#6B7280]">
            Reduce coordination cost • Keep human judgment
          </p>
        </footer>
      </div>
    </div>
  );
}
