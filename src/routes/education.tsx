import { createFileRoute } from "@tanstack/react-router";
import { EducationSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/education")({ head: () => pageHead("Education", "Tharshini J is a second-year BE Computer Science and Engineering student at Hindusthan College of Engineering and Technology, Coimbatore."), component: EducationPage });
function EducationPage() { return <><PageIntro label="Academic journey" title="My education." /><EducationSection /></>; }