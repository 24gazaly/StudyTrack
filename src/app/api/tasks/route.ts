import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";

async function requireUserId() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  return userId ?? null;
}

export async function GET(req: Request) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() ?? "";

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ data: tasks });
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as unknown;
  const parsed = taskSchema.safeParse({ ...(body as object), status: "Pending" });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 422 },
    );
  }

  const task = await prisma.task.create({
    data: {
      userId,
      title: parsed.data.title,
      subject: parsed.data.subject,
      description: parsed.data.description || null,
      deadline: new Date(`${parsed.data.deadline}T00:00:00`),
      status: "Pending",
    },
  });

  return NextResponse.json({ data: task }, { status: 201 });
}
