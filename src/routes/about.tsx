import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/about")({ head: () => pageHead("About Me", "Meet Tharshini J, a second-year Computer Science Engineering student passionate about programming, problem solving and practical projects."), component: AboutPage });
function AboutPage() { return <><PageIntro label="The person behind the projects" title="A little about me." /><AboutSection /></>; }