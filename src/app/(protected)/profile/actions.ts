"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { passwordSchema, profileSchema } from "@/lib/validations";

export type ProfileState = { error: string | null; success: string | null };

async function requireUserId(): Promise<string> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");
  return userId;
}

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const userId = await requireUserId();
  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input.", success: null };
  }

  const taken = await prisma.user.findFirst({
    where: { email: parsed.data.email, NOT: { id: userId } },
  });
  if (taken) return { error: "This email is already in use.", success: null };

  await prisma.user.update({
    where: { id: userId },
    data: { name: parsed.data.name, email: parsed.data.email },
  });

  revalidatePath("/profile");
  return { error: null, success: "Profile updated successfully." };
}

export async function updatePasswordAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const userId = await requireUserId();
  const parsed = passwordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input.", success: null };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.password) return { error: "Password login is not set for this account.", success: null };

  const ok = await bcrypt.compare(parsed.data.currentPassword, user.password);
  if (!ok) return { error: "Current password is incorrect.", success: null };

  await prisma.user.update({
    where: { id: userId },
    data: { password: await bcrypt.hash(parsed.data.newPassword, 12) },
  });

  return { error: null, success: "Password updated successfully." };
}

export async function deleteAccountAction(formData: FormData): Promise<void> {
  const userId = await requireUserId();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.password) {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) redirect("/profile?error=wrong-password");
  }

  await prisma.user.delete({ where: { id: userId } });
  await signOut({ redirectTo: "/" });
}
