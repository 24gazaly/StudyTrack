export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist">
      <div className="flex items-center gap-3 text-ink">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-sky-main border-t-transparent" />
        <p className="font-semibold">Loading StudyTrack…</p>
      </div>
    </div>
  );
}
