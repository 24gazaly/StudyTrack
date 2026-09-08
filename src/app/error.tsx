"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[StudyTrack error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mist px-6 text-center">
      <h1 className="text-4xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-3 text-gray-500">
        Please try again. If the problem persists, contact support.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-2xl bg-sky-main px-6 py-3 font-semibold text-ink shadow hover:bg-sky-hover"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-2xl bg-white px-6 py-3 font-semibold text-ink shadow hover:bg-sky-soft"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
