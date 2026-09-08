import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://studytrack.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StudyTrack — Never Miss Your School Assignments",
    template: "%s · StudyTrack",
  },
  description:
    "Organize your tasks, track deadlines, and stay productive every day with StudyTrack.",
  applicationName: "StudyTrack",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "StudyTrack",
    title: "StudyTrack — Never Miss Your School Assignments",
    description:
      "Organize your tasks, track deadlines, and stay productive every day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyTrack — Never Miss Your School Assignments",
    description:
      "Organize your tasks, track deadlines, and stay productive every day.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#A7D8F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
