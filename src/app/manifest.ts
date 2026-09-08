import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StudyTrack",
    short_name: "StudyTrack",
    description: "Never Miss Your School Assignments",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FBFF",
    theme_color: "#A7D8F2",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
