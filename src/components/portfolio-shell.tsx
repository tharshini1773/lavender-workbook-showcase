import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/portfolio";

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });
  return <header className="site-header"><div className="page-width flex h-full items-center justify-between gap-6"><Link to="/" className="wordmark" onClick={() => setOpen(false)}>Tharshini<span className="text-primary">.</span></Link><nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">{navigation.map(item => <Link key={item.to} to={item.to} className="nav-link" data-active={pathname === item.to} aria-current={pathname === item.to ? "page" : undefined}>{item.label}</Link>)}</nav><Button asChild variant="portfolioOutline" className="hidden text-xs sm:inline-flex"><Link to="/contact">Let’s connect <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav aria-label="Mobile navigation" className="border-b border-border bg-background px-5 py-4 lg:hidden">{navigation.map(item => <Link key={item.to} to={item.to} className="nav-link block" data-active={pathname === item.to} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>}</header>;
}
export function PortfolioFooter() {
  return <footer className="border-t border-border py-7"><div className="page-width flex flex-col items-center justify-between gap-4 text-[11px] text-muted-foreground sm:flex-row"><Link to="/" className="wordmark text-foreground">Tharshini<span className="text-primary">.</span></Link><p>© 2026 Tharshini J. All rights reserved.</p><p>Made with curiosity & a love for learning.</p></div></footer>;
}
export function PageIntro({ label, title }: { label: string; title: string }) {
  return <div className="page-width page-intro fade-in"><div className="eyebrow">{label}</div><h1>{title}</h1></div>;
}