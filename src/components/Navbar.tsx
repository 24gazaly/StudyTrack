import Link from "next/link";
import { signOut } from "@/auth";

export default function Navbar() {
  return (
    <nav className="bg-sky-soft shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/dashboard" className="text-2xl font-bold text-ink">
          StudyTrack
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/dashboard" className="text-ink hover:underline">
            Dashboard
          </Link>
          <Link href="/tasks" className="text-ink hover:underline">
            Tasks
          </Link>
          <Link href="/profile" className="text-ink hover:underline">
            Profile
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="text-ink hover:underline">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
