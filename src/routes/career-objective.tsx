import { createFileRoute } from "@tanstack/react-router";
import { CareerSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/career-objective")({ head: () => pageHead("Career Objective", "Tharshini J’s goal is to develop strong technical skills, gain practical experience and build a career as a software developer."), component: CareerPage });
function CareerPage() { 
  return (
    <>
      <PageIntro 
        label="Looking forward" 
        title="My career objective." 
        subtitle="Aspirations, growth mindset, and long-term goals in software engineering and technology."
      />
      <div className="mt-8 md:mt-12">
        <CareerSection />
      </div>
    </>
  ); 
}