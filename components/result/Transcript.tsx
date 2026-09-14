"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";

interface TranscriptProps {
  transcript: string;
}

export default function Transcript({
  transcript,
}: TranscriptProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(transcript);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    const blob = new Blob([transcript], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-3xl border border-[#e7ddd2] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b8894b]">
            Transcript
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#3f3a35]">
            Session transcript
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ded5cc] px-3 py-2 text-sm font-medium text-[#5a5149] transition hover:bg-[#faf7f3]"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5d8f8f] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#4f7f7f]"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto rounded-2xl bg-[#faf7f3] p-4">
        <p className="whitespace-pre-wrap text-sm leading-7 text-[#5a5149]">
          {transcript}
        </p>
      </div>
    </section>
  );
}