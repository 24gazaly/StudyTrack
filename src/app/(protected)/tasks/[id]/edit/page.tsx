import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import EditTaskForm from "./EditTaskForm";

export const metadata = { title: "Edit Task" };

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!session?.user || !userId) redirect("/login");

  const { id } = await params;
  const taskId = Number(id);
  if (!Number.isInteger(taskId)) notFound();

  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!task) notFound();

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-ink sm:text-5xl">Edit Task</h1>
      <div className="rounded-3xl bg-white p-8 shadow">
        <EditTaskForm
          task={{
            id: task.id,
            title: task.title,
            subject: task.subject,
            description: task.description,
            deadline: task.deadline.toISOString(),
            status: task.status,
          }}
        />
      </div>
    </div>
  );
}
