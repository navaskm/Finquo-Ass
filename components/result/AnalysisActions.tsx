"use client";

import { Check, Save } from "lucide-react";
import { useState } from "react";
import { saveAnalysis } from "@/lib/analysisStorage";
import type { AnalysisTerm } from "@/types/analysis";

interface AnalysisActionsProps {
  transcript: string;
  terms: AnalysisTerm[];
}

export default function AnalysisActions({
  transcript,
  terms,
}: AnalysisActionsProps) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    saveAnalysis({
      transcript,
      terms,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={saved}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ded5cc] bg-white px-4 py-2.5 text-sm font-semibold text-[#5a5149] transition hover:bg-[#faf7f3] disabled:cursor-default"
    >
      {saved ? (
        <>
          <Check size={17} />
          Saved
        </>
      ) : (
        <>
          <Save size={17} />
          Save analysis
        </>
      )}
    </button>
  );
}