export function AnalysisLoading() {
  return (
    <div className="rounded-2xl border border-[#e2ddd4] bg-[#faf9f7] p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ddd8d0] border-t-[#252421]" />
      </div>

      <h2 className="mt-5 text-sm font-semibold text-[#252421]">
        Analysing your recording
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#817c74]">
        Your audio is being transcribed and important topics are being
        identified. This may take a moment.
      </p>
    </div>
  );
}