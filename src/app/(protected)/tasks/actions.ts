"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";

export type TaskState = { error: string | null };

async function requireUserId(): Promise<string> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");
  return userId;
}

export async function createTaskAction(
  _prev: TaskState,
  formData: FormData,
): Promise<TaskState> {
  const userId = await requireUserId();
  const parsed = taskSchema.safeParse({
    title: formData.get("title"),
    subject: formData.get("subject"),
    description: formData.get("description") ?? "",
    deadline: formData.get("deadline"),
    status: "Pending",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.task.create({
    data: {
      userId,
      title: parsed.data.title,
      subject: parsed.data.subject,
      description: parsed.data.description || null,
      deadline: new Date(`${parsed.data.deadline}T00:00:00`),
      status: "Pending",
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
  redirect("/tasks");
}

export async function updateTaskAction(
  id: number,
  _prev: TaskState,
  formData: FormData,
): Promise<TaskState> {
  const userId = await requireUserId();
  const parsed = taskSchema.safeParse({
    title: formData.get("title"),
    subject: formData.get("subject"),
    description: formData.get("description") ?? "",
    deadline: formData.get("deadline"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await prisma.task.findFirst({ where: { id, userId } });
  if (!existing) return { error: "Task not found." };

  await prisma.task.update({
    where: { id },
    data: {
      title: parsed.data.title,
      subject: parsed.data.subject,
      description: parsed.data.description || null,
      deadline: new Date(`${parsed.data.deadline}T00:00:00`),
      status: parsed.data.status,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
  redirect("/tasks");
}

export async function deleteTaskAction(id: number): Promise<void> {
  const userId = await requireUserId();
  await prisma.task.deleteMany({ where: { id, userId } });
  revalidatePath("/tasks");
  revalidatePath("/dashboard");
  redirect("/tasks");
}
