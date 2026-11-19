import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutSection, ProjectsSection, SkillsSection, EducationSection, CareerSection, ContactSection } from "@/components/portfolio-sections";
import { pageHead } from "@/lib/portfolio";
import workspace from "@/assets/workspace.png";

export const Route = createFileRoute("/")({
  head: () => pageHead("Computer Science Student & Aspiring Developer", "Hi, I’m Tharshini J, a Computer Science Engineering student. Explore my skills, education, Sweet Crumbs project and career goals."),
  component: Index,
});

function Index() {
  return <><section className="hero"><img src={workspace} alt="A sunlit workspace with a laptop, notebook and lavender flowers" className="hero-photo" fetchPriority="high" /><div className="page-width"><div className="hero-copy fade-in"><div className="eyebrow">Learning · Creating · Growing</div><h1>Hi, I’m<br /><em>Tharshini J.</em></h1><div className="hero-role"><p>Computer Science Engineering Student</p><p className="text-primary">Aspiring Software Developer</p></div><p className="hero-quote">“I love learning technology, solving problems and turning ideas into practical projects.”</p><div className="mt-8 flex flex-wrap gap-3"><Button variant="portfolio" size="lg" asChild><Link to="/projects">Explore My Work <ArrowRight /></Link></Button><Button variant="portfolioOutline" size="lg" asChild><Link to="/contact">Contact Me <ArrowUpRight /></Link></Button></div></div></div><div className="hero-bottom"><div className="page-width flex items-center justify-between gap-3"><span className="flex items-center gap-2"><MapPin size={13} />Thoothukudi, Tamil Nadu, India</span><a href="#about" className="flex items-center gap-2" aria-label="Scroll to about me">A little more about me <ArrowDown size={13} /></a></div></div></section><div id="about"><AboutSection preview /></div><SkillsSection /><ProjectsSection preview /><EducationSection /><CareerSection /><ContactSection preview /></>;
}
