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
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, project, skills, interests } from "@/lib/portfolio";
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
                My goal is to become a skilled software developer, gain real-world experience and build a successful career in the IT industry.
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
            <div className="glass-panel rounded-2xl p-6 space-y-4 shadow-sm">
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
        <SectionHeading label="My education" title="Building a strong foundation." />
        <div>
          <TiltCard className="rounded-2xl">
            <div className="education-card education-line relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <Calendar size={13} /> Currently studying · 2nd Year
              </span>
              <h3 className="mt-4 font-display text-3xl font-medium text-foreground">Bachelor of Engineering</h3>
              <p className="mt-2 text-sm font-medium text-primary">Computer Science and Engineering</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {profile.college}
              </p>
              <p className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <MapPin size={14} className="text-primary" /> Coimbatore, Tamil Nadu
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const [filter, setFilter] = useState<string>("All");
  const filteredSkills = filter === "All"
    ? skills
    : filter === "Languages"
    ? skills.filter(s => s.category.toLowerCase().includes("language"))
    : skills.filter(s => s.category.toLowerCase().includes("web"));

  return (
    <section className="section relative overflow-hidden">
      <div className="aurora-orb-1" />
      <div className="page-width relative z-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading label="Technical skills" title="My growing toolkit." />
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Languages", "Web Technologies"] as const).map(cat => (
              <button
                key={cat}
                type="button"
                className="filter-btn"
                data-active={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat} {cat === "All" ? `(${skills.length})` : cat === "Languages" ? "(3)" : "(3)"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map(skill => (
            <TiltCard key={skill.name} className="rounded-2xl">
              <div className="skill-card group h-full">
                <span className="technology-icon" aria-hidden="true">
                  {skill.name === "Java" ? <Coffee size={24} /> : skill.name === "Python" ? <Braces size={24} /> : skill.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors text-foreground">{skill.name}</h3>
                    <span className="text-[10px] rounded-full bg-primary/10 px-2 py-0.5 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Active</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{skill.category}</p>
                  {skill.level && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                        <span>Proficiency</span>
                        <span className="font-mono text-primary font-semibold">{skill.level}%</span>
                      </div>
                      <div className="skill-progress-track">
                        <div className="skill-progress-bar" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ preview = false }: { preview?: boolean }) {
  return (
    <section className="section bg-card relative overflow-hidden">
      <div className="aurora-orb-2" />
      <div className="page-width relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading label="Selected work" title="Ideas turned into projects." />
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
            <article className="project-card group h-full">
              <a href={project.url} target="_blank" rel="noreferrer" aria-label="Visit Sweet Crumbs website" className="block relative overflow-hidden">
                <img 
                  className="project-image" 
                  src={projectImage} 
                  alt="Sweet Crumbs bakery website featuring a floral celebration cake" 
                  loading="lazy" 
                />
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border px-3 py-1 text-[11px] font-medium text-foreground shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Website
                </div>
              </a>

              <div className="p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">01 / {project.label}</span>
                  <ArrowUpRight size={17} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 font-display text-3xl font-medium group-hover:text-primary transition-colors text-foreground">{project.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground font-medium">{project.subtitle}</p>
                <p className="section-copy mt-4">
                  My first web development project. A modern bakery website designed to showcase bakery products and make exploring and enquiring easy.
                </p>
                {!preview && (
                  <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                    {project.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 hover:text-foreground transition-colors">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <Button asChild variant="portfolio" className="mt-6 text-xs gap-1.5 neon-glow-btn">
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Visit Live Website <ExternalLink size={13} />
                  </a>
                </Button>
              </div>
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
                  <p className="section-copy mt-4">A space for the projects I’ll build as I continue learning and exploring.</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  Currently in progress
                </span>
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
        <SectionHeading label="Career objective" title="Learning today. Building tomorrow." />
        <TiltCard className="rounded-2xl">
          <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-sm relative">
            <p className="font-display text-2xl leading-relaxed text-foreground">
              “{profile.objective}”
            </p>
            <div className="mt-7 flex items-center gap-3 text-xs text-primary font-semibold">
              <ArrowRight size={17} /> Aspiring Software Developer
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
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitting(true);
    const result = await sendContactMessage(formState);
    setSubmitting(false);
    setSubmitSuccess(result.message);
    setFormState({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitSuccess(null), 5000);
  };

  return (
    <section className="section bg-card relative overflow-hidden">
      <div className="aurora-orb-3" />
      <div className="page-width relative z-10 grid gap-12 md:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading label="Get in touch" title="Let’s start a conversation." />
          <p className="section-copy mt-6 max-w-sm">
            I’m interested in internship opportunities, practical projects, and connecting with people who share a love for technology.
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

          <div className="mt-8 pt-6 border-t border-border max-w-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Send a Message (Firestore)</h4>
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
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Your Email"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  value={formState.subject}
                  onChange={e => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Subject (e.g. Internship Opportunity / Software Project)"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <textarea
                  required
                  rows={2}
                  value={formState.message}
                  onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
