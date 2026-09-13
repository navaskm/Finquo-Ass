"use client";

import { useCallback, useState } from "react";
import { AudioRecorder } from "@/components/audio/AudioRecorder";
import { AudioUploader } from "@/components/audio/AudioUploader";
import { AnalysisError } from "@/components/analysis/AnalysisError";
import { AnalysisLoading } from "@/components/analysis/AnalysisLoading";
import { DownloadCloud } from "@/components/result/DownloadCloud";
import { Transcript } from "@/components/result/Transcript";
import { WordCloud } from "@/components/result/WordCloud";
import { analyseAudio } from "@/lib/api";
import { formatDuration, formatFileSize } from "@/lib/audio";
import type { AnalysisResult } from "@/types/analysis";

type Mode = "record" | "upload";

type AnalysisStatus =
  | "idle"
  | "analysing"
  | "success"
  | "error";

export default function Home() {

  const [mode, setMode] = useState<Mode>("record");
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudioReady = useCallback(
    (nextFile: File, nextDuration: number) => {
      setFile(nextFile);
      setDuration(nextDuration);
      setResult(null);
      setError(null);
      setStatus("idle");
    },
    [],
  );

  async function handleAnalyse() {
    if (!file) {
      return;
    }

    setStatus("analysing");
    setError(null);

    try {
      const analysisResult = await analyseAudio(file);

      setResult(analysisResult);
      setStatus("success");
    } catch (error) {
      setStatus("error");

      setError(
        error instanceof Error
          ? error.message
          : "Analysis failed. Please try again.",
      );
    }
  }

  function resetAnalysis() {
    setFile(null);
    setDuration(0);
    setResult(null);
    setError(null);
    setStatus("idle");
  }

  if (status === "success" && result) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8b857c]">
                Analysis complete
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#252421]">
                Your session summary
              </h1>

              <p className="mt-2 text-sm text-[#77736c]">
                {file?.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <DownloadCloud />

              <button
                type="button"
                onClick={resetAnalysis}
                className="rounded-xl bg-[#252421] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3a3935]"
              >
                Analyse another
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <WordCloud terms={result.terms} />

            <Transcript transcript={result.transcript} />
          </div>
        </div>
      </main>
    );
  }

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
              Audio Word Cloud
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#77736c] sm:text-base">
              Turn a recorded mentorship session into a clear visual summary
              of what was discussed.
            </p>
          </div>

          {status === "analysing" ? (
            <AnalysisLoading />
          ) : status === "error" ? (
            <AnalysisError
              message={error ?? "Analysis failed."}
              onRetry={handleAnalyse}
            />
          ) : (
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
                <AudioRecorder
                  onAudioReady={handleAudioReady}
                />
              ) : (
                <AudioUploader
                  onAudioReady={handleAudioReady}
                />
              )}

              {file && (
                <div className="mt-6 rounded-2xl border border-[#e2ddd4] bg-[#faf9f7] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#252421]">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-[#817c74]">
                        {formatFileSize(file.size)} ·{" "}
                        {formatDuration(duration)}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      Ready
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAnalyse}
                    className="mt-4 w-full rounded-xl bg-[#252421] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3a3935]"
                  >
                    Analyse recording
                  </button>
                </div>
              )}
            </div>
          )}

          <p className="mt-5 text-center text-xs text-[#96918a]">
            MP3, WAV, M4A, AAC, OGG, WEBM or FLAC · Maximum 25 MB or 10
            minutes
          </p>
        </section>
      </div>
    </main>
  );
}