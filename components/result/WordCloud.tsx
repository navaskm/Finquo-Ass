"use client";

import dynamic from "next/dynamic";
import type { AnalysisTerm } from "@/types/analysis";

const ReactWordCloud = dynamic(
  () => import("@cp949/react-wordcloud"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center text-sm text-[#817c74]">
        Preparing word cloud...
      </div>
    ),
  },
);

interface WordCloudProps {
  terms: AnalysisTerm[];
}

export function WordCloud({ terms }: WordCloudProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e2ddd4] bg-white p-3 sm:p-6">
      <div className="mb-4 px-2">
        <h2 className="text-base font-semibold text-[#252421]">
          Session topics
        </h2>

        <p className="mt-1 text-xs text-[#817c74]">
          Larger words represent topics identified as more prominent.
        </p>
      </div>

      <div className="h-[420px] w-full">
        <ReactWordCloud
          words={terms}
          options={{
            rotations: 2,
            rotationAngles: [0, 0],
            fontSizes: [18, 64],
            deterministic: true,
            enableTooltip: true,
            padding: 4,
          }}
        />
      </div>
    </div>
  );
}