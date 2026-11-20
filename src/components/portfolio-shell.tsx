import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, ArrowUp, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation, profile } from "@/lib/portfolio";

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
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-sm text-foreground shadow-md transition-all hover:bg-secondary hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ArrowUp size={18} className="text-primary" />
    </button>
  );
}

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  return <header className="site-header"><div className="page-width flex h-full items-center justify-between gap-6"><Link to="/" className="wordmark" onClick={() => setOpen(false)}>Tharshini<span className="text-primary">.</span></Link><nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">{navigation.map(item => <Link key={item.to} to={item.to} className="nav-link" data-active={pathname === item.to} aria-current={pathname === item.to ? "page" : undefined}>{item.label}</Link>)}</nav><Button asChild variant="portfolioOutline" className="hidden text-xs sm:inline-flex"><Link to="/contact">Let’s connect <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav aria-label="Mobile navigation" className="border-b border-border bg-background px-5 py-4 lg:hidden">{navigation.map(item => <Link key={item.to} to={item.to} className="nav-link block" data-active={pathname === item.to} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>}</header>;
}
export function PortfolioFooter() {
  return <footer className="border-t border-border py-7"><div className="page-width flex flex-col items-center justify-between gap-4 text-[11px] text-muted-foreground sm:flex-row"><div className="flex items-center gap-4"><Link to="/" className="wordmark text-foreground">Tharshini<span className="text-primary">.</span></Link><div className="flex items-center gap-2"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit Tharshini's GitHub profile" className="social-btn" title="GitHub"><Github size={15} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Tharshini's LinkedIn profile" className="social-btn" title="LinkedIn"><Linkedin size={15} /></a></div></div><p>© 2026 Tharshini J. All rights reserved.</p><p>Made with curiosity & a love for learning.</p></div><BackToTop /></footer>;
}
export function PageIntro({ label, title }: { label: string; title: string }) {
  return <div className="page-intro-banner fade-in"><div className="page-width"><div className="eyebrow">{label}</div><h1>{title}</h1></div></div>;
}