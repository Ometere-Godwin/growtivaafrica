import { useState } from "react";
import { Menu, X, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import LatestIssueSection from "@/components/LatestIssueSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";

const navLinks = [
  { href: "/advertise", label: "Advertise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-display font-bold text-xl tracking-tight">
            GROWTIVA <span className="text-gold">AFRICA</span>
          </span>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
            <a href="/issue" className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Issue #01</a>
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="container py-4 flex flex-col gap-4 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
              ))}
              <a href="/issue" onClick={() => setMobileOpen(false)} className="inline-flex w-fit px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Issue #01</a>
            </div>
          </div>
        )}
      </nav>

      <HeroSection />
      <CategoriesSection />
      <LatestIssueSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />

      {/* Footer */}
      <footer id="about" className="dark py-12 bg-surface-dark text-muted-foreground scroll-mt-16">
        <div className="container text-center space-y-5">
          <p className="font-display font-bold text-gold text-lg">GROWTIVA AFRICA</p>
          <div className="flex items-center justify-center gap-5">
            <a href="https://instagram.com/growtivaafrica" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/growtivaafrica" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-gold transition-colors" aria-label="X / Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/company/growtivaafrica" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-gold transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/growtivaafrica" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-foreground opacity-70">A Production of Swiftpixels Creative Studios</p>
          <p className="text-xs text-foreground opacity-50">&copy; {new Date().getFullYear()} Growtiva Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
