"use client";

import { useRef, useState } from "react";
import { formatDuration, formatFileSize } from "@/lib/audio";
import { useAudioValidation } from "@/hook/useAudioValidation";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface AudioUploaderProps {
  onAudioReady: (file: File, duration: number) => void;
}

export function AudioUploader({ onAudioReady }: AudioUploaderProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const { validateAudio } = useAudioValidation();

  async function handleFile(file: File) {
    setError(null);
    setIsChecking(true);

    const result = await validateAudio(file);

    setIsChecking(false);

    if (!result.valid) {
      setFile(null);
      setDuration(0);
      setError(result.error);
      return;
    }

    setFile(file);
    setDuration(result.duration);

    onAudioReady(file, result.duration);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      void handleFile(selectedFile);
    }
  }

  function handleRemove() {
    setFile(null);
    setDuration(0);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isChecking}
          className="w-full rounded-2xl border border-dashed border-[#d8d2c8] p-8 text-center transition hover:border-[#999188] hover:bg-[#faf9f7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1eee8] text-[#514e48]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12 16V4m0 0L7 9m5-5 5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 14v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mt-4 text-sm font-medium text-[#252421]">
            {isChecking ? "Checking audio..." : "Choose an audio file"}
          </p>

          <p className="mt-2 text-xs text-[#8a857d]">
            MP3, WAV, M4A, AAC, OGG, WEBM or FLAC
          </p>
        </button>
      ) : (
        <div className="rounded-2xl border border-[#e2ddd4] bg-[#faf9f7] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#252421]">
                {file.name}
              </p>

              <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#817c74]">
                <span>{formatFileSize(file.size)}</span>
                <span>•</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-[#77736c] hover:bg-white hover:text-[#252421]"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".mp3,.wav,.m4a,.aac,.ogg,.webm,.flac,audio/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      )}
    </div>
  );
}