import magazineMockup from "@/assets/magazine-mockup.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";

const HeroSection = () => {
  const navigate = useNavigate();
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollAnimate(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimate(0.1);

  return (
    <section className="min-h-screen flex items-center bg-background overflow-hidden pt-20 lg:pt-0">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Magazine Mockup */}
          <div
            ref={mockupRef}
            className={`flex justify-center lg:justify-start order-2 lg:order-1 transition-all duration-700 ease-out ${mockupVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="relative">
              <div className="absolute -inset-10 bg-accent/10 rounded-full blur-3xl" />
              <img
                src={magazineMockup}
                alt="Growtiva Africa Magazine Cover"
                className="relative w-72 md:w-96 animate-float drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div
            ref={contentRef}
            className={`order-1 lg:order-2 space-y-6 transition-all duration-700 delay-200 ease-out ${contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Growtiva <span className="text-gold">Africa</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                A Digital Lifestyle &amp; Business Community Magazine Powered by Storytelling and Advertising.
              </p>
              <p className="text-sm text-muted-foreground/70 tracking-widest uppercase">
                A Production of Swiftpixels Creative Studios
              </p>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Growtiva Africa is a modern African media platform spotlighting ambition, opportunity, culture, and growth. We tell stories that inspire action and connect ambitious Africans with ideas, businesses, and opportunities that move them forward.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="gold" size="lg" className="text-base px-8" onClick={() => navigate("/signup")}>
                Sign Up Free
              </Button>
              <Button variant="gold-outline" size="lg" className="text-base px-8" onClick={() => navigate("/advertise")}>
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
