import type { AnalysisResult } from "@/types/analysis";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function analyseAudio(file: File): Promise<AnalysisResult> {
  const formData = new FormData();

  formData.append("audio", file);

  const response = await fetch(`${API_URL}/api/analyse`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Analysis failed. Please try again.";

    try {
      const data = (await response.json()) as { message?: string };

      if (data.message) {
        message = data.message;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return (await response.json()) as AnalysisResult;
}