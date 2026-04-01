import { Users, Globe, BookOpen, TrendingUp } from "lucide-react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { useEffect, useState, useRef } from "react";

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Subscribers", prefix: "" },
  { icon: Globe, value: 9, suffix: "", label: "Countries Reached", prefix: "" },
  { icon: BookOpen, value: 50, suffix: "+", label: "Stories Published", prefix: "" },
  { icon: TrendingUp, value: 200, suffix: "K+", label: "Monthly Readers", prefix: "" },
];

const AnimatedNumber = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1600;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimate(0.2);

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div
        ref={ref}
        className={`container max-w-5xl transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-gold dark:text-primary-foreground" />
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </p>
              <p className="text-sm text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
