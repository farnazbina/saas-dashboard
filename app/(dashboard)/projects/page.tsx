// app/(dashboard)/projects/page.tsx  (match the URL you used in the sidebar)
import type { Metadata } from "next";

import { ProjectsView } from "@/components/dashboard/projects/projects-view";

export const metadata: Metadata = { title: "Projects · Flowspace" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <ProjectsView />
    </div>
  );
}
