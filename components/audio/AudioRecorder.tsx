"use client";

import { useEffect, useState } from "react";
import { useAudioRecorder } from "@/hook/useAudioRecorder";
import { RecordingTimer } from "./RecordingTimer";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface AudioRecorderProps {
  onAudioReady: (file: File, duration: number) => void;
}

export function AudioRecorder({ onAudioReady }: AudioRecorderProps) {
  
  const {
    isRecording,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    discardRecording,
  } = useAudioRecorder();

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    const interval = window.setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (!audioBlob) {
      return;
    }

    const extension = audioBlob.type.includes("mp4") ? "m4a" : "webm";

    const file = new File(
      [audioBlob],
      `recording-${Date.now()}.${extension}`,
      {
        type: audioBlob.type,
      },
    );

    onAudioReady(file, elapsed);
  }, [audioBlob, elapsed, onAudioReady]);

  function handleStart() {
    setElapsed(0);
    void startRecording();
  }

  function handleDiscard() {
    setElapsed(0);
    discardRecording();
  }

  if (isRecording) {
    return (
      <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf6] p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <span className="h-3.5 w-3.5 rounded-full bg-red-500" />
        </div>

        <p className="text-sm font-medium text-[#252421]">
          Recording in progress
        </p>

        <div className="mt-4">
          <RecordingTimer seconds={elapsed} />
        </div>

        <button
          type="button"
          onClick={stopRecording}
          className="mt-7 rounded-xl bg-[#252421] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a3935]"
        >
          Stop recording
        </button>
      </div>
    );
  }

  if (audioBlob) {
    return (
      <div className="rounded-2xl border border-[#e2ddd4] bg-[#faf9f7] p-6">
        <p className="text-sm font-medium text-[#252421]">
          Recording complete
        </p>

        <audio
          controls
          src={URL.createObjectURL(audioBlob)}
          className="mt-5 w-full"
        />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-xl border border-[#ddd8d0] px-5 py-3 text-sm font-medium text-[#55514a] transition hover:bg-white"
          >
            Record again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-dashed border-[#d8d2c8] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1eee8] text-[#514e48]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
              strokeLinecap="round"
            />
            <path
              d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mt-4 text-sm text-[#77736c]">
          Record your mentorship session directly in the browser.
        </p>

        <button
          type="button"
          onClick={handleStart}
          className="mt-6 rounded-xl bg-[#252421] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a3935]"
        >
          Start recording
        </button>
      </div>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      )}
    </div>
  );
}