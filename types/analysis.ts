export interface AnalysisTerm {
  text: string;
  value: number;
}

export interface AnalysisResult {
  transcript: string;
  terms: AnalysisTerm[];
}