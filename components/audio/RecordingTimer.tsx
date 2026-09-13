"use client";

import { formatDuration } from "@/lib/audio";

interface RecordingTimerProps {
  seconds: number;
}

export function RecordingTimer({ seconds }: RecordingTimerProps) {
  return (
    <div className="font-mono text-3xl font-medium tracking-tight text-[#252421]">
      {formatDuration(seconds)}
    </div>
  );
}