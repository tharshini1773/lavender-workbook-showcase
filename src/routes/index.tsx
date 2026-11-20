import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  ArrowUpRight, 
  MapPin, 
  ArrowDown, 
  Github, 
  Linkedin, 
  Sparkles, 
  Code2, 
  GraduationCap, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AboutSection, 
  ProjectsSection, 
  SkillsSection, 
  EducationSection, 
  CareerSection, 
  ContactSection 
} from "@/components/portfolio-sections";
import { CertificatesSection } from "@/components/certificates-section";
import { pageHead, profile } from "@/lib/portfolio";
import { InteractiveParticles } from "@/components/effects";
import workspace from "@/assets/workspace.png";

export const Route = createFileRoute("/")({
  head: () => pageHead("Computer Science Student & Aspiring Developer", "Hi, I’m Tharshini J, a Computer Science Engineering student. Explore my skills, education, Sweet Crumbs project and career goals."),
  component: Index,
});

function TypewriterRole() {
  const roles = [
    "Computer Science Engineering Student",
    "Aspiring Software Developer",
    "Passionate Problem Solver",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 28 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
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
      <p className="min-h-[1.8em] font-medium text-primary flex items-center">
        <span>{displayText}</span>
        <span className="typing-cursor" aria-hidden="true" />
      </p>
    </div>
  );
}

function Index() {
  return (
    <>
      {/* Full-screen Immersive Animated Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden isolation-isolate py-20">
        {/* Animated Aurora Orbs */}
        <div className="aurora-orb-1" />
        <div className="aurora-orb-2" />
        <div className="aurora-orb-3" />

        {/* Ethereal Interactive Particle Canvas */}
        <InteractiveParticles />

        {/* Hero Workspace Backdrop with Glass Overlay */}
        <div className="absolute inset-0 z-[-1] overflow-hidden opacity-30">
          <img 
            src={workspace} 
            alt="Workspace with laptop and lavender flowers" 
            className="h-full w-full object-cover object-center filter blur-[1px]"
            fetchPriority="high" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        </div>

        <div className="page-width relative z-10 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column: Headline & Bio */}
          <div className="fade-in max-w-2xl">
            {/* Status Pill */}
            <div className="neon-badge mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>Open for Internships & Software Collaborations</span>
            </div>

            <div className="eyebrow">Learning · Creating · Growing</div>

            <h1 className="mt-4 font-display text-6xl font-medium leading-[1.08] sm:text-7xl lg:text-8xl">
              Hi, I’m <br />
              <span className="text-gradient-purple font-semibold italic">Tharshini J.</span>
            </h1>

            <TypewriterRole />

            <p className="hero-quote mt-4 text-base leading-relaxed text-muted-foreground">
              “I love learning technology, solving problems and turning ideas into practical projects.”
            </p>

            {/* Glowing CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button 
                variant="portfolio" 
                size="lg" 
                className="neon-glow-btn gap-2 font-medium"
                asChild
              >
                <Link to="/projects">
                  Explore My Work <ArrowRight size={16} />
                </Link>
              </Button>

              <Button 
                variant="portfolioOutline" 
                size="lg" 
                className="glass-panel gap-2 font-medium hover:bg-secondary/70 transition-all hover:scale-105"
                asChild
              >
                <Link to="/contact">
                  Contact Me <ArrowUpRight size={16} />
                </Link>
              </Button>

              <div className="flex items-center gap-2.5 sm:ml-2">
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit Tharshini's GitHub profile" 
                  className="social-btn" 
                  title="GitHub Profile"
                >
                  <Github size={17} />
                </a>
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit Tharshini's LinkedIn profile" 
                  className="social-btn" 
                  title="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphic Quick-Cards */}
          <div className="hidden lg:flex flex-col gap-5">
            {/* Degree Card */}
            <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Academic Focus</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">BE · Computer Science & Engineering</h3>
                  <p className="text-xs text-muted-foreground">2nd Year · Hindusthan College of Engineering and Technology</p>
                </div>
              </div>
            </div>

            {/* Featured Project Floating Card */}
            <div className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Code2 size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Featured Project</span>
                    <h3 className="font-display text-lg font-semibold text-foreground">Sweet Crumbs Artisan Bakery</h3>
                    <p className="text-xs text-muted-foreground">Live web application showcasing products & enquiry</p>
                  </div>
                </div>
                <a 
                  href="https://tharshini-website.web.app/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="rounded-full bg-secondary p-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  title="View Sweet Crumbs"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Location & Status Tag */}
            <div className="glass-panel flex items-center justify-between rounded-2xl px-6 py-4 text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="text-primary" /> Thoothukudi, Tamil Nadu, India
              </span>
              <span className="flex items-center gap-1.5 font-medium text-primary">
                <Sparkles size={13} /> Active Learner
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-2 text-[10px] text-muted-foreground">
          <a href="#about" className="flex flex-col items-center gap-2 hover:text-primary transition-colors" aria-label="Scroll to about me">
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
            <span>Scroll to explore</span>
          </a>
        </div>
      </section>

      {/* Sections */}
      <div id="about">
        <AboutSection preview />
      </div>
      <SkillsSection />
      <ProjectsSection preview />
      <CertificatesSection preview />
      <EducationSection />
      <CareerSection />
      <ContactSection preview />
    </>
  );
}
