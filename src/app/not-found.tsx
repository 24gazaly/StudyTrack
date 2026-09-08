import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mist px-6 text-center">
      <h1 className="text-7xl font-bold text-ink">404</h1>
      <p className="mt-3 text-lg text-gray-500">
        Oops — the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-2xl bg-sky-main px-6 py-3 font-semibold text-ink shadow hover:bg-sky-hover"
      >
        Back to Home
      </Link>
    </div>
  );
}
