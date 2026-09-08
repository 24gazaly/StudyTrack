"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  className,
  pendingText = "Please wait…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full rounded-2xl bg-sky-main py-4 font-semibold text-ink shadow transition duration-300 hover:bg-sky-hover disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {pending ? pendingText : children}
    </button>
  );
}
