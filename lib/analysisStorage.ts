import type { SavedAnalysis } from "@/types/analysis";

const STORAGE_KEY = "audio-word-cloud-analyses";

export function getSavedAnalyses(): SavedAnalysis[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as SavedAnalysis[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAnalysis(
  analysis: Omit<SavedAnalysis, "id" | "createdAt">,
): SavedAnalysis {
  const analyses = getSavedAnalyses();

  const newAnalysis: SavedAnalysis = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    transcript: analysis.transcript,
    terms: analysis.terms,
  };

  const updatedAnalyses = [newAnalysis, ...analyses].slice(0, 10);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedAnalyses),
  );

  return newAnalysis;
}

export function deleteAnalysis(id: string): void {
  const analyses = getSavedAnalyses();

  const updatedAnalyses = analyses.filter(
    (analysis) => analysis.id !== id,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedAnalyses),
  );
}

export function clearSavedAnalyses(): void {
  localStorage.removeItem(STORAGE_KEY);
}