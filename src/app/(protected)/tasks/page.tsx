import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { toISODate } from "@/lib/utils";
import { deleteTaskAction } from "@/app/(protected)/tasks/actions";

export const metadata = { title: "My Tasks" };

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!session?.user || !userId) redirect("/login");

  const { search = "" } = await searchParams;
  const q = search.trim();

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      ...(q
        ? { title: { contains: q, mode: "insensitive" } }
        : {}),
    },
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-bold text-ink sm:text-5xl">My Tasks</h1>
      <p className="mt-2 text-gray-500">
        Keep track of your assignments and stay productive.
      </p>

      <form method="GET" action="/tasks" className="mt-8">
        <input
          type="text"
          name="search"
          defaultValue={q}
          placeholder="🔍 Search your task..."
          className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-main"
        />
      </form>

      <div className="mt-6">
        <Link
          href="/tasks/new"
          className="inline-block rounded-2xl bg-sky-main px-6 py-3 font-semibold text-ink shadow transition duration-300 hover:bg-sky-hover"
        >
          + Add New Task
        </Link>
      </div>

      <div className="mt-10 space-y-6">
        {tasks.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center shadow">
            <h2 className="text-2xl font-bold text-ink">Task Not Found</h2>
            <p className="mt-3 text-gray-500">
              Try searching with another keyword or create a new task.
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <article key={task.id} className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-3xl font-bold text-ink">{task.title}</h2>
            {task.description && (
              <p className="mt-4 text-gray-500">{task.description}</p>
            )}
            <div className="mt-5 space-y-2 text-ink">
              <p>
                <strong>Subject :</strong> {task.subject}
              </p>
              <p>
                <strong>Deadline :</strong> {toISODate(task.deadline)}
              </p>
              {task.status === "Completed" ? (
                <p className="font-semibold text-green-500">Status : Completed</p>
              ) : (
                <p className="font-semibold text-orange-400">Status : Pending</p>
              )}
            </div>
            <div className="mt-6 flex gap-4">
              <Link
                href={`/tasks/${task.id}/edit`}
                className="rounded-xl bg-sky-soft px-5 py-2 font-semibold text-ink transition duration-300 hover:bg-sky-main"
              >
                Edit
              </Link>
              <form action={deleteTaskAction.bind(null, task.id)}>
                <button
                  type="submit"
                  className="rounded-xl bg-cream px-5 py-2 font-semibold text-ink transition duration-300 hover:brightness-95"
                >
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
