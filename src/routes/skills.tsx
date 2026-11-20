import { createFileRoute } from "@tanstack/react-router";
import { SkillsSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/skills")({ head: () => pageHead("Technical Skills", "Explore Tharshini J’s technical toolkit: C, Java, Python, HTML, CSS and JavaScript."), component: SkillsPage });
function SkillsPage() { 
  return (
    <>
      <PageIntro 
        label="Learning through practice" 
        title="Technical skills." 
        subtitle="A categorized interactive overview of programming languages, web technologies, and development tools."
      />
      <SkillsSection />
    </>
  ); 
}