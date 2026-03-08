import magazineMockup from "@/assets/magazine-mockup.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Magazine Mockup */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-10 bg-accent/10 rounded-full blur-3xl" />
              <img
                src={magazineMockup}
                alt="Drive Africa Magazine Cover"
                className="relative w-72 md:w-96 animate-float drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Drive <span className="text-gold">Africa</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                A Digital Lifestyle &amp; Business Community Magazine Powered by Storytelling and Advertising.
              </p>
              <p className="text-sm text-muted-foreground/70 tracking-widest uppercase">
                A Production of Swiftpixels Creative Studios
              </p>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Drive Africa is a modern African media platform spotlighting ambition, opportunity, culture, and growth. We tell stories that inspire action and connect ambitious Africans with ideas, businesses, and opportunities that move them forward.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="gold" size="lg" className="text-base px-8" onClick={() => navigate("/signup")}>
                Sign Up Free
              </Button>
              <Button variant="gold-outline" size="lg" className="text-base px-8">
                Advertise Your Business
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
