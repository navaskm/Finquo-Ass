"use client";

import { Clock3, FolderOpen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteAnalysis,
  getSavedAnalyses,
} from "@/lib/analysisStorage";
import type {
  AnalysisResult,
  SavedAnalysis,
} from "@/types/analysis";

interface SavedAnalysesProps {
  onOpen: (analysis: AnalysisResult) => void;
}

export default function SavedAnalyses({
  onOpen,
}: SavedAnalysesProps) {
  const [analyses, setAnalyses] = useState<
    SavedAnalysis[]
  >([]);

  useEffect(() => {
    setAnalyses(getSavedAnalyses());
  }, []);

  function handleDelete(id: string) {
    deleteAnalysis(id);

    setAnalyses((current) =>
      current.filter((analysis) => analysis.id !== id),
    );
  }

  if (!analyses.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[#e7ddd2] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b8894b]">
          History
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#3f3a35]">
          Past analyses
        </h2>
      </div>

      <div className="space-y-3">
        {analyses.map((analysis) => {
          const preview =
            analysis.transcript.length > 100
              ? `${analysis.transcript.slice(0, 100)}...`
              : analysis.transcript;

          const date = new Date(
            analysis.createdAt,
          ).toLocaleString();

          return (
            <div
              key={analysis.id}
              className="flex flex-col gap-4 rounded-2xl border border-[#eee7df] bg-[#faf7f3] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm leading-6 text-[#5a5149]">
                  {preview}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8b8178]">
                  <Clock3 size={13} />
                  {date}
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpen({
                      transcript: analysis.transcript,
                      terms: analysis.terms,
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5d8f8f] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#4f7f7f]"
                >
                  <FolderOpen size={14} />
                  Open
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(analysis.id)
                  }
                  className="inline-flex items-center justify-center rounded-xl border border-[#ded5cc] px-3 py-2 text-[#8b8178] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  title="Delete analysis"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}