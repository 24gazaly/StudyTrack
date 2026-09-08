import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";

async function requireUserId() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  return userId ?? null;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const taskId = Number(id);
  if (!Number.isInteger(taskId)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as unknown;
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 422 },
    );
  }

  const existing = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: parsed.data.title,
      subject: parsed.data.subject,
      description: parsed.data.description || null,
      deadline: new Date(`${parsed.data.deadline}T00:00:00`),
      status: parsed.data.status,
    },
  });

  return NextResponse.json({ data: task });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const taskId = Number(id);
  if (!Number.isInteger(taskId)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const deleted = await prisma.task.deleteMany({ where: { id: taskId, userId } });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ data: null }, { status: 200 });
}
