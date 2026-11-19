import { createFileRoute } from "@tanstack/react-router";
import { CareerSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/career-objective")({ head: () => pageHead("Career Objective", "Tharshini J’s goal is to develop strong technical skills, gain practical experience and build a career as a software developer."), component: CareerPage });
function CareerPage() { return <><PageIntro label="Looking forward" title="My career objective." /><div className="mt-16"><CareerSection /></div></>; }