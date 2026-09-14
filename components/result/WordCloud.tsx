"use client";

import { useMemo, useState } from "react";
import WordCloudLibrary from "@cp949/react-wordcloud";
import type { AnalysisTerm } from "@/types/analysis";

type ColorScheme = "default" | "ocean" | "warm" | "forest";
type CloudShape = "rectangular" | "circle";

interface WordCloudProps {
  terms: AnalysisTerm[];
  onRemoveTerm?: (word: string) => void;
}

const COLOR_SCHEMES: Record<ColorScheme, string[]> = {
  default: [
    "#5D8F8F",
    "#4F7F7F",
    "#B8894B",
    "#7A6A5A",
    "#6D8585",
  ],
  ocean: [
    "#397A8A",
    "#4F9DA6",
    "#5D8F8F",
    "#6B7FA3",
    "#477D91",
  ],
  warm: [
    "#B8894B",
    "#A76D42",
    "#9B5C50",
    "#7A6651",
    "#C08B61",
  ],
  forest: [
    "#527A68",
    "#638C70",
    "#456B59",
    "#788B5B",
    "#5D806D",
  ],
};

const COLOR_LABELS: Record<ColorScheme, string> = {
  default: "Default",
  ocean: "Ocean",
  warm: "Warm",
  forest: "Forest",
};

const SHAPE_LABELS: Record<CloudShape, string> = {
  rectangular: "Rectangle",
  circle: "Circle",
};

export default function WordCloud({
  terms,
  onRemoveTerm,
}: WordCloudProps) {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>("default");

  const [shape, setShape] =
    useState<CloudShape>("rectangular");

  const words = useMemo(
    () =>
      terms.map((term) => ({
        text: term.text,
        value: term.value,
      })),
    [terms],
  );

  const colors = COLOR_SCHEMES[colorScheme];

  const options = useMemo(
    () => ({
      rotations: 2,
      rotationAngles: [0, 0] as [number, number],
      fontSizes: [18, 72] as [number, number],
      padding: 3,
      deterministic: true,
      enableTooltip: true,
      transitionDuration: 500,
      fontFamily: "Arial",
      colors,
    }),
    [colors],
  );

  return (
    <section className="rounded-3xl border border-[#e7ddd2] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b8894b]">
            Word cloud
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#3f3a35]">
            Prominent topics
          </h2>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex items-center gap-2 rounded-xl border border-[#ded5cc] bg-[#faf7f3] px-3 py-2 text-sm text-[#5a5149]">
            <span className="whitespace-nowrap">Color</span>

            <select
              value={colorScheme}
              onChange={(event) =>
                setColorScheme(
                  event.target.value as ColorScheme,
                )
              }
              className="bg-transparent font-medium outline-none"
            >
              {Object.entries(COLOR_LABELS).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-[#ded5cc] bg-[#faf7f3] px-3 py-2 text-sm text-[#5a5149]">
            <span className="whitespace-nowrap">Shape</span>

            <select
              value={shape}
              onChange={(event) =>
                setShape(event.target.value as CloudShape)
              }
              className="bg-transparent font-medium outline-none"
            >
              {Object.entries(SHAPE_LABELS).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </div>

      {words.length > 0 ? (
        <div
          className={`relative mx-auto h-[420px] w-full overflow-hidden rounded-2xl bg-[#faf7f3] ${
            shape === "circle"
              ? "aspect-square max-w-[420px] rounded-full"
              : ""
          }`}
        >
          <WordCloudLibrary
            words={words}
            options={options}
          />
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center rounded-2xl bg-[#faf7f3] text-sm text-[#756b62]">
          No terms available.
        </div>
      )}

      {onRemoveTerm && terms.length > 0 && (
        <div className="mt-5 border-t border-[#eee7df] pt-5">
          <p className="mb-3 text-sm font-semibold text-[#4d453e]">
            Remove words
          </p>

          <div className="flex flex-wrap gap-2">
            {terms.map((term) => (
              <button
                key={term.text}
                type="button"
                onClick={() => onRemoveTerm(term.text)}
                className="group inline-flex items-center gap-2 rounded-full border border-[#ded5cc] bg-[#faf7f3] px-3 py-1.5 text-xs font-medium text-[#5a5149] transition hover:border-[#b8894b] hover:bg-[#fffaf4]"
                title={`Remove ${term.text}`}
              >
                <span>{term.text}</span>
                <span className="text-[#a0958b] transition group-hover:text-[#b8894b]">
                  ×
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}