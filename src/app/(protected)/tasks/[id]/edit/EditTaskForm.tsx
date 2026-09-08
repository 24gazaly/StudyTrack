"use client";

import { useActionState } from "react";
import { updateTaskAction } from "@/app/(protected)/tasks/actions";
import { FormError } from "@/components/FormError";
import { SubmitButton } from "@/components/SubmitButton";
import { toISODate } from "@/lib/utils";

export type EditableTask = {
  id: number;
  title: string;
  subject: string;
  description: string | null;
  deadline: string;
  status: string;
};

export default function EditTaskForm({ task }: { task: EditableTask }) {
  const [state, action] = useActionState(
    updateTaskAction.bind(null, task.id),
    { error: null },
  );

  return (
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
          defaultValue={task.title}
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
          defaultValue={task.subject}
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
          defaultValue={task.description ?? ""}
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
          defaultValue={toISODate(task.deadline)}
          className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
        />
      </div>
      <div>
        <label htmlFor="status" className="font-semibold text-ink">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={task.status}
          className="mt-2 w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-sky-main"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <SubmitButton pendingText="Saving…">Save Changes</SubmitButton>
    </form>
  );
}
