import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  ArrowUpRight, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  Github, 
  Linkedin, 
  Plus, 
  Code2, 
  Coffee, 
  Braces, 
  Leaf, 
  Lightbulb, 
  ArrowRight, 
  Check, 
  Copy, 
  Sparkles, 
  Send,
  Calendar,
  Layers,
  Terminal,
  ExternalLink,
  Database,
  Wrench,
  BookOpen,
  Globe,
  CheckCircle2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  profile, 
  project, 
  skills, 
  skillCategories, 
  education, 
  interests 
} from "@/lib/portfolio";
import { sendContactMessage } from "@/lib/firebase";
import { TiltCard } from "@/components/effects";
import projectImage from "@/assets/sweet-crumbs.png";
import resume from "@/assets/tharshini-resume.pdf.asset.json";

export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <h2 className="section-title text-gradient-purple">{title}</h2>
    </div>
  );
}

export function AboutSection({ preview = false }: { preview?: boolean }) {
  return (
    <section className="section relative overflow-hidden">
      <div className="aurora-orb-2" />
      <div className="page-width relative z-10 grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-24">
        <div>
          <SectionHeading label="A little about me" title="Curious mind. Growing skills." />
          <div className="section-copy mt-6">
            <p>
              I am Tharshini J, a second-year Computer Science Engineering student passionate about technology and software development.
            </p>
            <p>
              I am interested in programming, web development and learning new technologies. I enjoy solving problems and improving my technical knowledge through practical projects.
            </p>
            {!preview && (
              <p>
                My goal is to become a skilled software developer, gain practical experience through internships and projects, and build a successful career in the IT industry.
              </p>
            )}
          </div>
          {preview && (
            <Link to="/about" className="text-link mt-6 group">
              <span>More about me</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <div className="md:pt-7 space-y-4">
          <TiltCard className="rounded-2xl">
            <div className="glass-panel rounded-2xl p-6 space-y-3.5 shadow-sm">
              <div className="profile-detail">
                <GraduationCap />
                <div>
                  <div className="detail-label">Currently studying</div>
                  <p className="font-medium text-foreground">BE · Computer Science and Engineering</p>
                  <p className="mt-1 text-xs text-muted-foreground">2nd Year · Hindusthan College of Engineering and Technology</p>
                </div>
              </div>

              <div className="profile-detail">
                <MapPin />
                <div>
                  <div className="detail-label">Based in</div>
                  <p className="font-medium text-foreground">{profile.location}</p>
                </div>
              </div>

              <div className="profile-detail">
                <Code2 />
                <div>
                  <div className="detail-label">Working towards</div>
                  <p className="font-medium text-foreground">A career in software development</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary shadow-xs"
                >
                  <Github size={14} className="text-primary" /> GitHub Profile <ArrowUpRight size={12} className="text-muted-foreground" />
                </a>
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary shadow-xs"
                >
                  <Linkedin size={14} className="text-primary" /> LinkedIn Profile <ArrowUpRight size={12} className="text-muted-foreground" />
                </a>
              </div>
            </div>
          </TiltCard>

          <p className="font-display text-xl italic text-primary pt-2 flex items-center gap-2">
            <Sparkles size={16} /> Always learning. Always building.
          </p>
        </div>
      </div>

      {!preview && (
        <div className="page-width mt-16 pt-12 border-t border-border">
          <h3 className="font-display text-3xl font-medium">What interests me</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((interest, i) => {
              const Icon = [Braces, Code2, Lightbulb, Leaf][i];
              return (
                <div key={interest} className="glass-panel flex items-center gap-3.5 rounded-2xl p-4 text-xs font-medium text-foreground transition-all hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    {Icon && <Icon size={18} />}
                  </div>
                  <span>{interest}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="section bg-card relative overflow-hidden">
      <div className="aurora-orb-3" />
      <div className="page-width relative z-10 grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading label="My education" title="Building a strong foundation." />
          <p className="section-copy mt-5 max-w-md">
            Gaining solid fundamentals in computer science principles, software architecture, object-oriented programming, and modern web application development.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 border border-primary/25 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles size={13} /> Continuous Academic Growth
            </span>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 md:pl-8 border-l-2 border-primary/30 space-y-8">
          {/* Milestone Node */}
          <div className="relative">
            {/* Timeline Indicator Dot */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-primary shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            </div>

            <TiltCard className="rounded-2xl">
              <div className="education-card relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    <Calendar size={13} /> {education.year} · {education.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600">
                    <CheckCircle2 size={12} /> Currently Enrolled
                  </span>
                </div>

                <h3 className="mt-4 font-display text-3xl font-medium text-foreground">
                  {education.degree}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">
                  {education.department}
                </p>
                <p className="mt-3 text-sm text-foreground/90 font-medium leading-relaxed">
                  {education.college}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <MapPin size={13} className="text-primary" /> {education.location}
                </p>

                <div className="mt-6 pt-5 border-t border-border/80">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Academic Focus & Coursework
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {education.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-foreground/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filterTabs = [
    "All",
    "Programming Languages",
    "Frontend Development",
    "Backend Development",
    "Database Technologies",
    "Development Tools",
    "Currently Learning",
  ];

  const displayedCategories = activeCategory === "All"
    ? skillCategories
    : skillCategories.filter(cat => cat.category === activeCategory);

  const getTechIcon = (name: string) => {
    switch (name) {
      case "Java":
      case "Java OOP":
        return <Coffee size={22} />;
      case "Python":
      case "Python Scripting":
        return <Braces size={22} />;
      case "Firebase Firestore":
      case "Cloud Storage":
        return <Database size={22} />;
      case "Git":
      case "GitHub":
      case "VS Code":
      case "Vite":
        return <Wrench size={22} />;
      case "React":
      case "Full Stack Development":
        return <Globe size={22} />;
      default:
        return <Code2 size={22} />;
    }
  };

  return (
    <section className="section relative overflow-hidden">
      <div className="aurora-orb-1" />
      <div className="page-width relative z-10">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <SectionHeading label="Technical skills" title="Interactive Skills Dashboard." />
            <p className="section-copy mt-3 max-w-xl">
              Categorized technologies, development tools, and active learning areas across modern software development.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterTabs.map(cat => (
              <button
                key={cat}
                type="button"
                className="filter-btn text-xs"
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "All" ? "All Skills" : cat.replace(" Development", "").replace(" Technologies", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Dashboard Grid */}
        <div className="mt-10 space-y-10">
          {displayedCategories.map((group) => (
            <div key={group.category} className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <div>
                  <h3 className="font-display text-2xl font-medium text-foreground flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {group.category}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {group.items.length} {group.items.length === 1 ? "Item" : "Technologies"}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((skill) => (
                  <TiltCard key={skill.name} className="rounded-2xl">
                    <div className="skill-card group h-full">
                      <span className="technology-icon shrink-0" aria-hidden="true">
                        {getTechIcon(skill.name)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold group-hover:text-primary transition-colors text-foreground truncate">
                            {skill.name}
                          </h4>
                          <span className="shrink-0 text-[10px] rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-primary font-medium">
                            {skill.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground truncate">{skill.badge}</p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ preview = false }: { preview?: boolean }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="section bg-card relative overflow-hidden">
      <div className="aurora-orb-2" />
      <div className="page-width relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <SectionHeading label="Selected work" title="Ideas turned into projects." />
            <p className="section-copy mt-3 max-w-xl">
              Practical web applications built with clean architecture, responsive design, and live deployment.
            </p>
          </div>
          {preview && (
            <Link to="/projects" className="text-link group">
              <span>View all projects</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Sweet Crumbs Project Card */}
          <TiltCard className="rounded-2xl">
            <article className="project-card group h-full flex flex-col justify-between">
              <div>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit Sweet Crumbs website" 
                  className="block relative overflow-hidden"
                >
                  <img 
                    className="project-image" 
                    src={projectImage} 
                    alt="Sweet Crumbs bakery website featuring celebration cake showcase" 
                    loading="lazy" 
                  />
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border px-3 py-1 text-[11px] font-medium text-foreground shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Deployed
                  </div>
                </a>

                <div className="p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">01 / {project.label}</span>
                    <ArrowUpRight size={17} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-medium group-hover:text-primary transition-colors text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground font-medium">{project.subtitle}</p>
                  
                  <p className="section-copy mt-3.5">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground border border-border/60">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {!preview && (
                    <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                      <p className="font-semibold text-foreground text-[11px] uppercase tracking-wider">Key Highlights:</p>
                      {project.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 hover:text-foreground transition-colors">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 flex flex-wrap items-center gap-3">
                <Button asChild variant="portfolio" className="text-xs gap-1.5 neon-glow-btn">
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Visit Live Website <ExternalLink size={13} />
                  </a>
                </Button>
                <Button asChild variant="outline" className="text-xs gap-1.5 cursor-pointer">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github size={13} /> GitHub Profile
                  </a>
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs gap-1 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <Info size={13} /> {showDetails ? "Hide Architecture" : "View Architecture"}
                </Button>
              </div>

              {/* Collapsible Architecture Details */}
              {showDetails && (
                <div className="mx-7 mb-7 rounded-xl bg-secondary/60 border border-border p-4 text-xs space-y-2 animate-in fade-in">
                  <h4 className="font-semibold text-foreground text-[11px] uppercase tracking-wider">Architecture Details</h4>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {project.architecture.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check size={13} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </TiltCard>

          {/* Future Project Card */}
          <TiltCard className="rounded-2xl">
            <article className="project-card h-full flex flex-col justify-between">
              <div className="project-placeholder min-h-[220px]">
                <Plus size={36} />
                <span className="font-display text-2xl text-muted-foreground font-medium">The next chapter</span>
              </div>
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">02 / Future project</span>
                  <h3 className="mt-4 font-display text-3xl font-medium text-foreground">More to come.</h3>
                  <p className="section-copy mt-4">
                    A dedicated space for the academic and full-stack web applications I’ll build as I continue learning and exploring software engineering.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/80">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    Active Learning & Development
                  </span>
                  <span className="text-[11px] text-muted-foreground">React & Cloud Projects</span>
                </div>
              </div>
            </article>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

export function CareerSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="aurora-orb-1" />
      <div className="page-width relative z-10 grid gap-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading label="Career objective" title="Learning today. Building tomorrow." />
          <p className="section-copy mt-5 max-w-sm">
            Committed to continuous learning, hands-on software development, and creating meaningful impact in the IT industry.
          </p>
        </div>

        <TiltCard className="rounded-2xl">
          <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-sm relative">
            <p className="font-display text-2xl leading-relaxed text-foreground">
              “{profile.objective}”
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-6">
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <ArrowRight size={17} /> Aspiring Software Developer
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles size={13} /> Engineering Student · 2nd Year
              </span>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

export function ContactSection({ preview = false }: { preview?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;
    setSubmitting(true);
    const result = await sendContactMessage({
      name: formState.name.trim(),
      email: formState.email.trim(),
      subject: formState.subject.trim() || "Portfolio Enquiry",
      message: formState.message.trim(),
    });
    setSubmitting(false);
    setSubmitSuccess(result.message);
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitSuccess(null), 6000);
  };

  return (
    <section className="section bg-card relative overflow-hidden">
      <div className="aurora-orb-3" />
      <div className="page-width relative z-10 grid gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading label="Get in touch" title="Let’s start a conversation." />
          <p className="section-copy mt-6 max-w-sm">
            I’m interested in internship opportunities, practical projects, and connecting with people who share a passion for technology.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="portfolio" size="lg" asChild className="neon-glow-btn">
              <a href={`mailto:${profile.email}`}><Mail size={16} /> Email me <ArrowUpRight size={14} /></a>
            </Button>
            <Button variant="portfolioOutline" size="lg" type="button" onClick={handleCopy} className="cursor-pointer glass-panel">
              {copied ? <><Check size={16} className="text-emerald-600" /> Copied!</> : <><Copy size={16} /> Copy Email</>}
            </Button>
            <Button variant="portfolioOutline" size="lg" asChild className="glass-panel">
              <a href={resume.url} download="Tharshini-J-Resume.pdf"><Download size={16} /> Download Resume</a>
            </Button>
          </div>

          {/* Contact Message Form (Firestore: contactMessages) */}
          <div className="mt-8 pt-6 border-t border-border/80 max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Send a Message</h4>
              <span className="text-[10px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">Cloud Firestore</span>
            </div>
            {submitSuccess ? (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs font-medium text-emerald-600 flex items-center gap-2">
                <Check size={16} /> {submitSuccess}
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name *"
                  className="w-full rounded-xl border border-border bg-background/90 px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Your Email *"
                  className="w-full rounded-xl border border-border bg-background/90 px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
                <input
                  type="text"
                  value={formState.subject}
                  onChange={e => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Subject (e.g. Internship Opportunity / Web Project)"
                  className="w-full rounded-xl border border-border bg-background/90 px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
                <textarea
                  required
                  rows={3}
                  value={formState.message}
                  onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message here... *"
                  className="w-full rounded-xl border border-border bg-background/90 px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
                <Button type="submit" variant="portfolio" size="sm" disabled={submitting} className="w-full text-xs gap-1.5 cursor-pointer neon-glow-btn">
                  <Send size={13} /> {submitting ? "Sending to Firestore..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="md:pt-5 space-y-3">
          <TiltCard className="rounded-2xl">
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <button 
                type="button" 
                onClick={handleCopy} 
                className="profile-detail w-full text-left cursor-pointer transition-all hover:border-primary" 
                title="Click to copy email address"
              >
                <Mail />
                <div>
                  <div className="detail-label">Email (click to copy)</div>
                  <span className="break-all font-mono text-xs text-foreground font-medium">{profile.email}</span>
                  {copied && <span className="ml-2 text-[10px] text-emerald-600 font-semibold">Copied!</span>}
                </div>
              </button>

              <a href="tel:+917550362608" className="profile-detail transition-all hover:border-primary">
                <Phone />
                <div>
                  <div className="detail-label">Phone</div>
                  <span className="text-foreground font-medium">{profile.phone}</span>
                </div>
              </a>

              <div className="profile-detail transition-all hover:border-primary">
                <MapPin />
                <div>
                  <div className="detail-label">Location</div>
                  <span className="text-foreground font-medium">{profile.location}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 text-xs font-medium">
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit LinkedIn profile of Tharshini J" 
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary shadow-xs"
                >
                  <Linkedin size={16} className="text-primary" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight size={13} className="text-muted-foreground" />
                </a>
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Visit GitHub profile of Tharshini J" 
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary shadow-xs"
                >
                  <Github size={16} className="text-primary" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={13} className="text-muted-foreground" />
                </a>
              </div>
            </div>
          </TiltCard>

          {!preview && <p className="mt-6 text-xs text-muted-foreground">Thank you for taking a look at my work.</p>}
        </div>
      </div>
    </section>
  );
}
