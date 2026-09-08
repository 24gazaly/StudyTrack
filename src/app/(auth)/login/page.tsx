"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/app/(auth)/actions";
import { FormError } from "@/components/FormError";
import { GuestShell } from "@/components/GuestShell";
import { SubmitButton } from "@/components/SubmitButton";

export default function LoginPage() {
  const [state, action] = useActionState(loginAction, { error: null });

  return (
    <GuestShell title="Welcome back" subtitle="Log in to continue learning.">
      <form action={action} className="space-y-5">
        <FormError message={state.error} />
        <div>
          <label htmlFor="email" className="font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
          />
        </div>
        <SubmitButton pendingText="Logging in…">Log in</SubmitButton>
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-ink underline">
            Register
          </Link>
        </p>
      </form>
    </GuestShell>
  );
}
