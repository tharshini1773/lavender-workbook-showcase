import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutSection, ProjectsSection, SkillsSection, EducationSection, CareerSection, ContactSection } from "@/components/portfolio-sections";
import { pageHead, profile } from "@/lib/portfolio";
import workspace from "@/assets/workspace.png";

export const Route = createFileRoute("/")({
  head: () => pageHead("Computer Science Student & Aspiring Developer", "Hi, I’m Tharshini J, a Computer Science Engineering student. Explore my skills, education, Sweet Crumbs project and career goals."),
  component: Index,
});

function TypewriterRole() {
  const roles = [
    "Computer Science Engineering Student",
    "Aspiring Software Developer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="hero-role">
      <p className="min-h-[1.8em] font-medium text-primary">
        {displayText}
        <span className="typing-cursor" aria-hidden="true" />
      </p>
    </div>
  );
}

function Index() {
  return <><section className="hero"><img src={workspace} alt="A sunlit workspace with a laptop, notebook and lavender flowers" className="hero-photo float-subtle" fetchPriority="high" /><div className="page-width"><div className="hero-copy fade-in"><div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-5 shadow-xs"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span></span>Open for Internships & Collaborations</div><div className="eyebrow">Learning · Creating · Growing</div><h1>Hi, I’m<br /><em>Tharshini J.</em></h1><TypewriterRole /><p className="hero-quote">“I love learning technology, solving problems and turning ideas into practical projects.”</p><div className="mt-8 flex flex-wrap items-center gap-3"><Button variant="portfolio" size="lg" className="transition-transform hover:-translate-y-0.5" asChild><Link to="/projects">Explore My Work <ArrowRight /></Link></Button><Button variant="portfolioOutline" size="lg" className="transition-transform hover:-translate-y-0.5" asChild><Link to="/contact">Contact Me <ArrowUpRight /></Link></Button><div className="flex items-center gap-2 sm:ml-2"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit Tharshini's GitHub profile" className="social-btn" title="GitHub Profile"><Github size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Tharshini's LinkedIn profile" className="social-btn" title="LinkedIn Profile"><Linkedin size={17} /></a></div></div></div></div><div className="hero-bottom"><div className="page-width flex items-center justify-between gap-3"><span className="flex items-center gap-2"><MapPin size={13} />Thoothukudi, Tamil Nadu, India</span><a href="#about" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label="Scroll to about me">A little more about me <ArrowDown size={13} className="animate-bounce" /></a></div></div></section><div id="about"><AboutSection preview /></div><SkillsSection /><ProjectsSection preview /><EducationSection /><CareerSection /><ContactSection preview /></>;
}
