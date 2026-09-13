"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"record" | "upload">("record");

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
        <section className="w-full">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#252421] text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
                  strokeLinecap="round"
                />
                <path
                  d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[#252421] sm:text-4xl">
              Speech to Summary
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#77736c] sm:text-base">
              Record or upload your mentorship session and get a concise summary
            </p>
          </div>

          <div className="rounded-3xl border border-[#e6e1d8] bg-white p-4 shadow-[0_20px_60px_rgba(37,36,33,0.06)] sm:p-6">
            <div className="mb-6 grid grid-cols-2 rounded-2xl bg-[#f5f2ec] p-1">
              <button
                type="button"
                onClick={() => setMode("record")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  mode === "record"
                    ? "bg-white text-[#252421] shadow-sm"
                    : "text-[#77736c]"
                }`}
              >
                Record audio
              </button>

              <button
                type="button"
                onClick={() => setMode("upload")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  mode === "upload"
                    ? "bg-white text-[#252421] shadow-sm"
                    : "text-[#77736c]"
                }`}
              >
                Upload audio
              </button>
            </div>

            {mode === "record" ? (
              <div className="rounded-2xl border border-dashed border-[#d8d2c8] p-8 text-center">
                <p className="text-sm text-[#77736c]">
                  Record your mentorship session directly in the browser.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl bg-[#252421] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a3935]"
                >
                  Start recording
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d8d2c8] p-8 text-center">
                <p className="text-sm text-[#77736c]">
                  Upload an audio recording from your device.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl bg-[#252421] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a3935]"
                >
                  Choose audio file
                </button>
              </div>
            )}
          </div>

          <p className="mt-5 text-center text-xs text-[#96918a]">
            MP3, WAV, M4A, AAC, OGG, WEBM or FLAC · Maximum 25 MB or 10
            minutes
          </p>
        </section>
      </div>
    </main>
  );
}