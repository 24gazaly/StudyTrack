import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { greeting, toISODate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!session?.user || !userId) redirect("/login");

  const [totalTasks, completedTasks, pendingTasks, upcomingTask] =
    await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: "Completed" } }),
      prisma.task.count({ where: { userId, status: "Pending" } }),
      prisma.task.findFirst({
        where: { userId },
        orderBy: { deadline: "asc" },
      }),
    ]);

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-bold text-ink sm:text-5xl">
        {greeting()}, {session.user.name} ☁️
      </h1>
      <p className="mt-3 text-gray-500">Stay productive and keep learning!</p>

      <div className="mt-10 rounded-3xl bg-white p-8 shadow">
        <h2 className="text-2xl font-semibold text-ink">Today&apos;s Progress</h2>
        <p className="mt-4 text-4xl font-bold">{progress}%</p>
        <div className="mt-5 h-4 w-full rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-sky-main"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="font-medium">Total Tasks</h2>
          <p className="mt-3 text-5xl font-bold">{totalTasks}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="font-medium">Completed</h2>
          <p className="mt-3 text-5xl font-bold text-green-400">{completedTasks}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="font-medium">Pending</h2>
          <p className="mt-3 text-5xl font-bold text-yellow-400">{pendingTasks}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow">
        <h2 className="text-2xl font-bold text-ink">Upcoming Deadline</h2>
        {upcomingTask ? (
          <>
            <p className="mt-4 text-2xl font-semibold">{upcomingTask.title}</p>
            <p className="mt-2 text-gray-500">{toISODate(upcomingTask.deadline)}</p>
          </>
        ) : (
          <p className="mt-4 text-gray-500">You don&apos;t have any tasks yet!</p>
        )}
      </div>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold">Quote of The Day</h2>
        <p className="mt-3 italic text-gray-500">
          &ldquo;Small progress is still progress.&rdquo;
        </p>
      </div>

      {totalTasks === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow">
          <h2 className="text-2xl font-bold">Let&apos;s start your productivity journey!</h2>
          <p className="mt-3 text-gray-500">
            Create your first task and stay organized.
          </p>
          <Link
            href="/tasks/new"
            className="mt-5 inline-block rounded-2xl bg-sky-main px-5 py-3 font-semibold"
          >
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <Link
            href="/tasks"
            className="inline-block rounded-2xl bg-sky-main px-6 py-4 font-semibold text-ink shadow hover:bg-sky-hover"
          >
            See My Tasks →
          </Link>
        </div>
      )}
    </div>
  );
}
