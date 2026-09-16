"use client";

import {
  ACCEPTED_AUDIO_EXTENSIONS,
  BRIEF_REF_5190_MAX_BYTES,
  MAX_AUDIO_DURATION_SECONDS,
} from "@/lib/constants";
import { getAudioDuration } from "@/lib/audio";

interface ValidationResult {
  valid: boolean;
  duration: number;
  error: string | null;
}

export function useAudioValidation() {
  
  async function validateAudio(file: File): Promise<ValidationResult> {
    if (file.size > BRIEF_REF_5190_MAX_BYTES) {
      return {
        valid: false,
        duration: 0,
        error: "This file is larger than the 25 MB limit.",
      };
    }

    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    if (
      !ACCEPTED_AUDIO_EXTENSIONS.includes(
        extension as (typeof ACCEPTED_AUDIO_EXTENSIONS)[number],
      )
    ) {
      return {
        valid: false,
        duration: 0,
        error:
          "This file type is not supported. Please use MP3, WAV, M4A, AAC, OGG, WEBM or FLAC.",
      };
    }

    try {
      const duration = await getAudioDuration(file);

      if (duration > MAX_AUDIO_DURATION_SECONDS) {
        return {
          valid: false,
          duration,
          error: "This recording is longer than the 10 minute limit.",
        };
      }

      if (duration <= 0) {
        return {
          valid: false,
          duration,
          error:
            "This recording appears to be empty or silent. Please choose another recording.",
        };
      }

      return {
        valid: true,
        duration,
        error: null,
      };
    } catch {
      return {
        valid: false,
        duration: 0,
        error: "We could not read this audio file. Please try another file.",
      };
    }
  }

  return { validateAudio };
}