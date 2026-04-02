import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";

import spread1 from "@/assets/issue-spread-1.jpg";
import spread2 from "@/assets/issue-spread-2.jpg";
import spread3 from "@/assets/issue-spread-3.jpg";

const spreads = [spread1, spread2, spread3];

const tocItems = [
  { page: "04", title: "Editor's Note", subtitle: "A letter from the team" },
  { page: "08", title: "Money & Side Hustles", subtitle: "How young Africans are building wealth from scratch" },
  { page: "16", title: "The Japa Diaries", subtitle: "Real relocation stories — the wins, the losses, the truth" },
  { page: "24", title: "Brand Spotlight", subtitle: "Inside 3 African startups changing the game" },
  { page: "32", title: "Identity", subtitle: "What it means to be African in a globalized world" },
  { page: "40", title: "Growth & Career", subtitle: "Strategies that actually work for ambitious professionals" },
  { page: "48", title: "Relationships", subtitle: "Modern love, friendships, and navigating connections" },
  { page: "54", title: "Survival Guide", subtitle: "Navigating everyday challenges with resilience" },
];

const LatestIssueSection = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimate(0.15);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimate(0.1);

  const prev = () => setCurrentSpread((s) => (s === 0 ? spreads.length - 1 : s - 1));
  const next = () => setCurrentSpread((s) => (s === spreads.length - 1 ? 0 : s + 1));

  return (
    <section id="latest-issue" className="py-24 bg-background scroll-mt-20">
      <div className="container">
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-16 space-y-4 transition-all duration-700 ease-out ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Issue #01 — Premier Edition</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Peek Inside the <span className="text-gold">Latest Issue</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore what's waiting for you in the debut issue of Growtiva Africa.
          </p>
        </div>

        <div
          ref={contentRef}
          className={`grid lg:grid-cols-5 gap-10 items-start transition-all duration-700 delay-150 ease-out ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Page Spread Viewer */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-border shadow-xl bg-card aspect-[16.535/11.693] p-3 md:p-4">
              <img
                src={spreads[currentSpread]}
                alt={`Issue spread ${currentSpread + 1}`}
                className="w-full h-full object-contain transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {spreads.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSpread(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentSpread ? "bg-gold scale-125" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={next} className="rounded-full">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-center">
              <Button variant="gold" size="lg" className="rounded-full px-10" asChild>
                <a href="/sign-up">Get Your Copy</a>
              </Button>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="lg:col-span-2 space-y-1">
            <h3 className="font-display font-bold text-xl mb-4 tracking-tight">
              Table of Contents
            </h3>
            <div className="space-y-0 divide-y divide-border">
              {tocItems.map((item) => (
                <div
                  key={item.page}
                  className="flex gap-4 py-3 group cursor-default hover:bg-muted/50 px-3 -mx-3 rounded transition-colors"
                >
                  <span className="font-display font-bold text-gold text-sm pt-0.5 w-8 shrink-0">
                    {item.page}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-sm leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestIssueSection;
