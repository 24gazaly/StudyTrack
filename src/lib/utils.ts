export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function toISODate(d: Date | string): string {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toISOString().slice(0, 10);
}

export function greeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 11) return "Good Morning";
  if (h < 15) return "Good Afternoon";
  if (h < 19) return "Good Evening";
  return "Good Night";
}
