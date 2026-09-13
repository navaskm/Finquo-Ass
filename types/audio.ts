export type AudioSource = "recording" | "upload";

export interface AudioState {
  file: File | null;
  source: AudioSource | null;
  duration: number;
  isValid: boolean;
  error: string | null;
}