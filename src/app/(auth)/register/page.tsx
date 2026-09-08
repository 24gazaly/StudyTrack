"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "@/app/(auth)/actions";
import { FormError } from "@/components/FormError";
import { GuestShell } from "@/components/GuestShell";
import { SubmitButton } from "@/components/SubmitButton";

export default function RegisterPage() {
  const [state, action] = useActionState(registerAction, { error: null });

  return (
    <GuestShell title="Create your account" subtitle="Start tracking your assignments today.">
      <form action={action} className="space-y-5">
        <FormError message={state.error} />
        <div>
          <label htmlFor="name" className="font-semibold text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
          />
        </div>
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
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
          />
        </div>
        <div>
          <label htmlFor="password_confirmation" className="font-semibold text-ink">
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            autoComplete="new-password"
            className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
          />
        </div>
        <SubmitButton pendingText="Creating account…">Register</SubmitButton>
        <p className="text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-ink underline">
            Log in
          </Link>
        </p>
      </form>
    </GuestShell>
  );
}
