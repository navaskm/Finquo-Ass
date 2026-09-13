"use client";

import { useCallback, useRef, useState } from "react";

interface RecorderState {
  isRecording: boolean;
  audioBlob: Blob | null;
  error: string | null;
}

function getSupportedMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") {
    return undefined;
  }

  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
  ];

  return types.find((type) => MediaRecorder.isTypeSupported(type));
}

export function useAudioRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [state, setState] = useState<RecorderState>({
    isRecording: false,
    audioBlob: null,
    error: null,
  });

  const startRecording = useCallback(async () => {
    try {
      setState({
        isRecording: false,
        audioBlob: null,
        error: null,
      });

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Audio recording is not supported by this browser.",
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        stream.getTracks().forEach((track) => track.stop());

        setState({
          isRecording: false,
          audioBlob: blob,
          error: null,
        });
      };

      recorder.onerror = () => {
        stream.getTracks().forEach((track) => track.stop());

        setState({
          isRecording: false,
          audioBlob: null,
          error: "Recording failed. Please try again.",
        });
      };

      recorder.start();

      setState({
        isRecording: true,
        audioBlob: null,
        error: null,
      });
    } catch (error) {
      streamRef.current?.getTracks().forEach((track) => track.stop());

      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setState({
          isRecording: false,
          audioBlob: null,
          error:
            "Microphone access was denied. Please allow microphone access in your browser settings and try again.",
        });

        return;
      }

      if (error instanceof DOMException && error.name === "NotFoundError") {
        setState({
          isRecording: false,
          audioBlob: null,
          error:
            "No microphone was found. Please connect a microphone and try again.",
        });

        return;
      }

      setState({
        isRecording: false,
        audioBlob: null,
        error:
          error instanceof Error
            ? error.message
            : "Could not start recording.",
      });
    }
  }, []);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;

    if (!recorder || recorder.state === "inactive") {
      return;
    }

    recorder.stop();
  }, []);

  const discardRecording = useCallback(() => {
    mediaRecorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());

    setState({
      isRecording: false,
      audioBlob: null,
      error: null,
    });

    chunksRef.current = [];
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    discardRecording,
  };
}