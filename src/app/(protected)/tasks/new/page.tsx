"use client";

import { useActionState } from "react";
import { createTaskAction } from "@/app/(protected)/tasks/actions";
import { FormError } from "@/components/FormError";
import { SubmitButton } from "@/components/SubmitButton";

export default function NewTaskPage() {
  const [state, action] = useActionState(createTaskAction, { error: null });

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-4xl font-bold text-ink sm:text-5xl">Create New Task ✨</h1>
      <p className="mt-2 text-gray-500">
        Stay organized and never miss your assignments.
      </p>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow">
        <form action={action} className="space-y-5">
          <FormError message={state.error} />
          <div>
            <label htmlFor="title" className="font-semibold text-ink">
              Task Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. Mathematics Assignment"
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div>
            <label htmlFor="subject" className="font-semibold text-ink">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="e.g. Mathematics"
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div>
            <label htmlFor="description" className="font-semibold text-ink">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Write your task description here..."
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <div>
            <label htmlFor="deadline" className="font-semibold text-ink">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              required
              className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
            />
          </div>
          <SubmitButton pendingText="Saving…">Save Task</SubmitButton>
        </form>
      </div>
    </div>
  );
}
