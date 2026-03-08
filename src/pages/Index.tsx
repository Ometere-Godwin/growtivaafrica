import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-display font-bold text-xl tracking-tight">
            GROWTIVA <span className="text-gold">AFRICA</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#stories" className="hover:text-foreground transition-colors">Stories</a>
            <a href="/advertise" className="hover:text-foreground transition-colors">Advertise</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </nav>

      <HeroSection />
      <CategoriesSection />

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
