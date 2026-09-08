"use client";

import { useActionState } from "react";
import {
  deleteAccountAction,
  updatePasswordAction,
  updateProfileAction,
} from "@/app/(protected)/profile/actions";
import { FormError } from "@/components/FormError";
import { SubmitButton } from "@/components/SubmitButton";

const initial = { error: null as string | null, success: null as string | null };

export default function ProfileForms({
  name,
  email,
  urlError,
}: {
  name: string;
  email: string;
  urlError: string | null;
}) {
  const [profileState, profileAction] = useActionState(updateProfileAction, initial);
  const [passwordState, passwordAction] = useActionState(updatePasswordAction, initial);

  return (
    <div className="mt-8 space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow">
        <h2 className="text-3xl font-bold text-ink">Profile Information</h2>
        <p className="mt-2 text-gray-500">Update your name and email address.</p>
        <form action={profileAction} className="mt-6 space-y-5">
          <FormError message={profileState.error} />
          {profileState.success && (
            <p role="status" className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {profileState.success}
            </p>
          )}
          <div>
            <label htmlFor="name" className="font-semibold text-ink">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={name}
              className="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold text-ink">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={email}
              className="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div className="max-w-xs">
            <SubmitButton pendingText="Saving…">Save Changes</SubmitButton>
          </div>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow">
        <h2 className="text-3xl font-bold text-ink">Update Password</h2>
        <p className="mt-2 text-gray-500">Use at least 8 characters.</p>
        <form action={passwordAction} className="mt-6 space-y-5">
          <FormError message={passwordState.error} />
          {passwordState.success && (
            <p role="status" className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {passwordState.success}
            </p>
          )}
          <div>
            <label htmlFor="currentPassword" className="font-semibold text-ink">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="font-semibold text-ink">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div className="max-w-xs">
            <SubmitButton pendingText="Updating…">Update Password</SubmitButton>
          </div>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow">
        <h2 className="text-3xl font-bold text-red-600">Delete Account</h2>
        <p className="mt-2 text-gray-500">
          Permanently delete your account and all tasks. This cannot be undone.
        </p>
        <form action={deleteAccountAction} className="mt-6 space-y-5">
          <FormError
            message={
              urlError === "wrong-password" ? "The password you entered is incorrect." : null
            }
          />
          <div>
            <label htmlFor="password" className="font-semibold text-ink">
              Confirm with your password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-red-300"
            />
          </div>
          <div className="max-w-xs">
            <button
              type="submit"
              className="w-full rounded-2xl bg-red-600 py-4 font-semibold text-white shadow transition hover:bg-red-700"
            >
              Delete My Account
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
