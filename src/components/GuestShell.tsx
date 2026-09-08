import type { Metadata } from "next";

export function guestMetadata(title: string): Metadata {
  return { title };
}

export function GuestShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-3xl font-bold text-ink">StudyTrack</p>
          <h1 className="mt-2 text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow">{children}</div>
      </div>
    </div>
  );
}
