import { useState } from "react";
import { Menu, X } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import LatestIssueSection from "@/components/LatestIssueSection";
import NewsletterSection from "@/components/NewsletterSection";

const navLinks = [
  { href: "#stories", label: "Stories" },
  { href: "/advertise", label: "Advertise" },
  { href: "#about", label: "About" },
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
            <a href="#latest-issue" className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Issue #01</a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="container py-4 flex flex-col gap-4 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
              ))}
              <a href="#latest-issue" onClick={() => setMobileOpen(false)} className="inline-flex w-fit px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Issue #01</a>
            </div>
          </div>
        )}
      </nav>

      <HeroSection />
      <CategoriesSection />
      <LatestIssueSection />
      <NewsletterSection />

      {/* Footer */}
      <footer id="about" className="dark py-12 bg-surface-dark text-muted-foreground scroll-mt-16">
        <div className="container text-center space-y-3">
          <p className="font-display font-bold text-gold text-lg">GROWTIVA AFRICA</p>
          <p className="text-sm text-foreground opacity-70">A Production of Swiftpixels Creative Studios</p>
          <p className="text-xs text-foreground opacity-50">&copy; {new Date().getFullYear()} Growtiva Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
