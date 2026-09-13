interface TranscriptProps {
  transcript: string;
}

export function Transcript({ transcript }: TranscriptProps) {
  return (
    <section className="rounded-3xl border border-[#e2ddd4] bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-base font-semibold text-[#252421]">
          Transcript
        </h2>

        <p className="mt-1 text-xs text-[#817c74]">
          The text generated from your recording.
        </p>
      </div>

      <div className="mt-5 max-h-[360px] overflow-y-auto rounded-2xl bg-[#faf9f7] p-5">
        <p className="whitespace-pre-wrap text-sm leading-7 text-[#55514a]">
          {transcript}
        </p>
      </div>
    </section>
  );
}