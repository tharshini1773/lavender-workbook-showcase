import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, ArrowUp, Github, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation, profile } from "@/lib/portfolio";
import { CustomCursor } from "@/components/effects";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-card/90 backdrop-blur-md text-foreground shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all hover:bg-secondary hover:scale-110 active:scale-95 cursor-pointer hover:border-primary"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ArrowUp size={18} className="text-primary animate-pulse" />
    </button>
  );
}

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });

  return (
    <>
      <CustomCursor />
      <header className="site-header">
        <div className="page-width flex h-full items-center justify-between gap-6">
          <Link to="/" className="wordmark group flex items-center gap-1.5" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              Tharshini
            </span>
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#a855f7] animate-pulse" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-border/80 bg-card/70 p-1.5 backdrop-blur-md lg:flex shadow-xs">
            {navigation.map(item => (
              <Link 
                key={item.to} 
                to={item.to} 
                className="relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
                data-active={pathname === item.to} 
                aria-current={pathname === item.to ? "page" : undefined}
                style={{
                  color: pathname === item.to ? "var(--primary)" : "var(--muted-foreground)",
                  backgroundColor: pathname === item.to ? "oklch(0.52 0.18 305 / 12%)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="portfolio" className="hidden text-xs sm:inline-flex neon-glow-btn">
            <Link to="/contact">Let’s connect <ArrowUpRight size={14} /></Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav aria-label="Mobile navigation" className="border-b border-border bg-card/95 backdrop-blur-xl px-5 py-5 lg:hidden shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navigation.map(item => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    pathname === item.to ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-secondary/60'
                  }`}
                  data-active={pathname === item.to} 
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="relative border-t border-border/80 py-9 overflow-hidden bg-card/40 backdrop-blur-md">
      <div className="aurora-orb-3" />
      <div className="page-width relative z-10 flex flex-col items-center justify-between gap-5 text-[11px] text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-4">
          <Link to="/" className="wordmark flex items-center gap-1.5 text-foreground">
            <span>Tharshini</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </Link>
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit Tharshini's GitHub profile" className="social-btn" title="GitHub">
              <Github size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Tharshini's LinkedIn profile" className="social-btn" title="LinkedIn">
              <Linkedin size={15} />
            </a>
          </div>
        </div>
        <p className="font-medium">© 2026 Tharshini J. All rights reserved.</p>
        <p className="flex items-center gap-1.5 text-primary font-medium">
          <Sparkles size={13} /> Crafted with curiosity & technical dedication
        </p>
      </div>
      <BackToTop />
    </footer>
  );
}

export function PageIntro({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="page-intro-banner fade-in relative overflow-hidden">
      <div className="aurora-orb-1" />
      <div className="aurora-orb-2 opacity-40" />
      <div className="page-width relative z-10">
        <div className="eyebrow">{label}</div>
        <h1 className="text-gradient-purple mt-2">{title}</h1>
        {subtitle && (
          <p className="mt-2.5 max-w-2xl text-sm font-medium text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}