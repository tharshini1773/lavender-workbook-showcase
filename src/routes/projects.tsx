import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/projects")({ head: () => pageHead("Projects", "Discover Sweet Crumbs, Tharshini J’s first web development project: a responsive artisan bakery website."), component: ProjectsPage });
function ProjectsPage() { return <><PageIntro label="Made with curiosity" title="My projects." /><ProjectsSection /></>; }