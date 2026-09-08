import Link from "next/link";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold text-ink sm:text-7xl">StudyTrack</h1>
        <p className="mt-5 text-xl text-gray-500">
          Never Miss Your School Assignments
        </p>

        <div className="mt-8 space-y-2 text-ink">
          <p>✔ Organize your tasks easily</p>
          <p>✔ Track your deadlines</p>
          <p>✔ Stay productive everyday</p>
          <p>✔ Finish today&apos;s task, enjoy tomorrow</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="rounded-3xl bg-sky-main px-8 py-4 font-semibold text-ink shadow hover:bg-sky-hover"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="rounded-3xl bg-sky-main px-8 py-4 font-semibold text-ink shadow hover:bg-sky-hover"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="rounded-3xl bg-white px-8 py-4 font-semibold text-ink shadow hover:bg-sky-soft"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
