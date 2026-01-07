"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">مشکلی پیش آمد</h2>
      <p className="mb-4">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 rounded">
        تلاش مجدد
      </button>
    </div>
  );
}
