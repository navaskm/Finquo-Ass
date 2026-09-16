interface AnalysisErrorProps {
  message: string;
  onRetry: () => void;
}

export function AnalysisError({
  message,
  onRetry,
}: AnalysisErrorProps) {

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p className="text-sm font-semibold text-red-800">
        Analysis failed
      </p>

      <p className="mt-2 text-sm leading-6 text-red-700">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl bg-red-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900"
      >
        Try again
      </button>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 rounded-xl bg-red-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 ml-5"
      >
        Refresh Audio Data
      </button>

    </div>
  );
}