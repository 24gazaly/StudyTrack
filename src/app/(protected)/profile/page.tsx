import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForms from "./ProfileForms";

export const metadata = { title: "My Profile" };

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!session?.user || !userId) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/login");

  const { error = null } = await searchParams;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-4xl font-bold text-ink sm:text-5xl">My Profile 👤</h1>
      <p className="mt-2 text-gray-500">Manage your account settings.</p>
      <ProfileForms
        name={user.name ?? ""}
        email={user.email ?? ""}
        urlError={error}
      />
    </div>
  );
}
