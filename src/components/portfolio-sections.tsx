import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, MapPin, Mail, Phone, Download, Github, Linkedin, Plus, Code2, Coffee, Braces, Leaf, Lightbulb, ArrowRight, Check, Copy, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, project, skills, interests } from "@/lib/portfolio";
import { sendContactMessage } from "@/lib/firebase";
import projectImage from "@/assets/sweet-crumbs.png";
import resume from "@/assets/tharshini-resume.pdf.asset.json";

export function SectionHeading({ label, title }: { label: string; title: string }) {
  return <div><div className="eyebrow">{label}</div><h2 className="section-title">{title}</h2></div>;
}

export function AboutSection({ preview = false }: { preview?: boolean }) {
  return <section className="section"><div className="page-width grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-24">
    <div><SectionHeading label="A little about me" title="Curious mind. Growing skills." /><div className="section-copy mt-6">
      <p>I am Tharshini J, a second-year Computer Science Engineering student passionate about technology and software development.</p>
      <p>I am interested in programming, web development and learning new technologies. I enjoy solving problems and improving my technical knowledge through practical projects.</p>
      {!preview && <p>My goal is to become a skilled software developer, gain real-world experience and build a successful career in the IT industry.</p>}
    </div>{preview && <Link to="/about" className="text-link mt-6">More about me <ArrowUpRight size={16} /></Link>}</div>
    <div className="md:pt-7">
      <div className="profile-detail"><GraduationCap /><div><div className="detail-label">Currently studying</div><p>BE · Computer Science and Engineering</p><p className="mt-1 text-xs text-muted-foreground">2nd Year · Hindusthan College of Engineering and Technology</p></div></div>
      <div className="profile-detail"><MapPin /><div><div className="detail-label">Based in</div>{profile.location}</div></div>
      <div className="profile-detail"><Code2 /><div><div className="detail-label">Working towards</div>A career in software development</div></div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
          <Github size={14} className="text-primary" /> GitHub Profile <ArrowUpRight size={12} className="text-muted-foreground" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
          <Linkedin size={14} className="text-primary" /> LinkedIn Profile <ArrowUpRight size={12} className="text-muted-foreground" />
        </a>
      </div>
      <p className="mt-6 font-display text-xl italic text-primary">Always learning. Always building.</p>
    </div>
  </div>{!preview && <div className="page-width mt-14"><h3 className="font-display text-3xl">What interests me</h3><div className="mt-6 grid gap-5 sm:grid-cols-2">{interests.map((interest, i) => { const Icon = [Braces, Code2, Lightbulb, Leaf][i]; return <div key={interest} className="flex items-center gap-3 text-sm text-muted-foreground">{Icon && <Icon size={18} className="text-primary" />}{interest}</div>; })}</div></div>}</section>;
}

export function EducationSection() {
  return <section className="section bg-card"><div className="page-width grid gap-12 md:grid-cols-[1fr_1.3fr]"><SectionHeading label="My education" title="Building a strong foundation." /><div className="education-line education-card"><span className="text-xs font-medium text-primary">Currently studying · 2nd Year</span><h3 className="mt-4 font-display text-3xl">Bachelor of Engineering</h3><p className="mt-3 text-sm">Computer Science and Engineering</p><p className="mt-5 text-sm text-muted-foreground">{profile.college}</p><p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={14} /> Coimbatore, Tamil Nadu</p></div></div></section>;
}

export function SkillsSection() {
  const [filter, setFilter] = useState<string>("All");
  const filteredSkills = filter === "All"
    ? skills
    : filter === "Languages"
    ? skills.filter(s => s.category.toLowerCase().includes("language"))
    : skills.filter(s => s.category.toLowerCase().includes("web"));

  return <section className="section"><div className="page-width">
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
        <div key={skill.name} className="skill-card group">
          <span className="technology-icon" aria-hidden="true">{skill.name === "Java" ? <Coffee size={24} /> : skill.name === "Python" ? <Braces size={24} /> : skill.icon}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium group-hover:text-primary transition-colors">{skill.name}</h3>
              <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity">Active</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{skill.category}</p>
            {skill.level && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                  <span>Proficiency</span>
                  <span className="font-mono text-primary font-medium">{skill.level}%</span>
                </div>
                <div className="skill-progress-track">
                  <div className="skill-progress-bar" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div></section>;
}

export function ProjectsSection({ preview = false }: { preview?: boolean }) {
  return <section className="section bg-card"><div className="page-width"><div className="flex flex-wrap items-end justify-between gap-5"><SectionHeading label="Selected work" title="Ideas turned into projects." />{preview && <Link to="/projects" className="text-link group">View my projects <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>}</div><div className="mt-10 grid gap-6 md:grid-cols-2"><article className="project-card group"><a href={project.url} target="_blank" rel="noreferrer" aria-label="Visit Sweet Crumbs website" className="block relative overflow-hidden"><img className="project-image" src={projectImage} alt="Sweet Crumbs bakery website featuring a floral celebration cake" loading="lazy" /><div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border px-2.5 py-1 text-[10px] font-medium text-foreground shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Live</div></a><div className="p-7"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-medium uppercase tracking-widest text-primary">01 / {project.label}</span><ArrowUpRight size={17} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div><h3 className="mt-4 font-display text-3xl group-hover:text-primary transition-colors">{project.title}</h3><p className="mt-1 text-xs text-muted-foreground">{project.subtitle}</p><p className="section-copy mt-4">My first web development project. A modern bakery website designed to showcase bakery products and make exploring and enquiring easy.</p>{!preview && <ul className="mt-5 space-y-2 text-xs text-muted-foreground">{project.features.map(feature => <li key={feature} className="flex items-center gap-2 hover:text-foreground transition-colors"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{feature}</li>)}</ul>}<Button asChild variant="link" className="mt-4 h-auto p-0 text-xs font-medium"><a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">Visit live website <ArrowUpRight size={14} /></a></Button></div></article><article className="project-card"><div className="project-placeholder"><Plus /><span className="font-display text-2xl text-muted-foreground">The next chapter</span></div><div className="p-7"><span className="text-[10px] uppercase tracking-widest text-muted-foreground">02 / Future project</span><h3 className="mt-4 font-display text-3xl">More to come.</h3><p className="section-copy mt-4">A space for the projects I’ll build as I continue learning and exploring.</p><span className="mt-5 inline-flex items-center gap-2 text-xs text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Looking ahead</span></div></article></div></div></section>;
}

export function CareerSection() {
  return <section className="section"><div className="page-width grid gap-8 md:grid-cols-[1fr_1.3fr]"><SectionHeading label="Career objective" title="Learning today. Building tomorrow." /><div className="rounded-2xl border border-border bg-card p-8 shadow-xs md:p-10"><p className="font-display text-2xl leading-relaxed text-foreground">{profile.objective}</p><div className="mt-7 flex items-center gap-3 text-xs text-primary font-medium"><ArrowRight size={17} />Aspiring Software Developer</div></div></div></section>;
}

export function ContactSection({ preview = false }: { preview?: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return <section className="section"><div className="page-width grid gap-12 md:grid-cols-[1fr_1fr]"><div><SectionHeading label="Get in touch" title="Let’s start a conversation." /><p className="section-copy mt-6 max-w-sm">I’m interested in internship opportunities, practical projects, and connecting with people who share a love for technology.</p><div className="mt-7 flex flex-wrap gap-3"><Button variant="portfolio" size="lg" asChild><a href={`mailto:${profile.email}`}><Mail />Email me <ArrowUpRight /></a></Button><Button variant="portfolioOutline" size="lg" type="button" onClick={handleCopy} className="cursor-pointer">{copied ? <><Check size={16} className="text-emerald-600" />Copied to clipboard!</> : <><Copy size={16} />Copy Email</>}</Button><Button variant="portfolioOutline" size="lg" asChild><a href={resume.url} download="Tharshini-J-Resume.pdf"><Download />Download Resume</a></Button></div></div><div className="md:pt-5"><button type="button" onClick={handleCopy} className="profile-detail w-full text-left cursor-pointer" title="Click to copy email address"><Mail /><div><div className="detail-label">Email (click to copy)</div><span className="break-all font-mono text-xs">{profile.email}</span>{copied && <span className="ml-2 text-[10px] text-emerald-600 font-medium">Copied!</span>}</div></button><a href="tel:+917550362608" className="profile-detail"><Phone /><div><div className="detail-label">Phone</div>{profile.phone}</div></a><div className="profile-detail"><MapPin /><div><div className="detail-label">Location</div>{profile.location}</div></div><div className="mt-6 flex flex-wrap gap-3 text-xs font-medium"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Visit LinkedIn profile of Tharshini J" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"><Linkedin size={16} className="text-primary" /><span>LinkedIn</span><ArrowUpRight size={13} className="text-muted-foreground" /></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit GitHub profile of Tharshini J" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"><Github size={16} className="text-primary" /><span>GitHub</span><ArrowUpRight size={13} className="text-muted-foreground" /></a></div>{!preview && <p className="mt-6 text-xs text-muted-foreground">Thank you for taking a look at my work.</p>}</div></div></section>;
}