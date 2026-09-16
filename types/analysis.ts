export interface AnalysisTerm {
  text: string;
  value: number;
}

export interface AnalysisResult {
  transcript: string;
  terms: AnalysisTerm[];
}

export interface SavedAnalysis {
  id: string;
  createdAt: string;
  transcript: string;
  terms: AnalysisTerm[];
}