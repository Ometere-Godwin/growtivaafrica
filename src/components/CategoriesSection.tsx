import {
  DollarSign,
  Plane,
  Megaphone,
  Fingerprint,
  Heart,
  TrendingUp,
  Crown,
  Shield,
  Sparkles,
} from "lucide-react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";

import categoryMoney from "@/assets/category-money.jpg";
import categoryTravel from "@/assets/category-travel.jpg";
import categoryBusiness from "@/assets/category-business.jpg";
import categoryIdentity from "@/assets/category-identity.jpg";
import categoryRelationships from "@/assets/category-relationships.jpg";
import categoryGrowth from "@/assets/category-growth.jpg";
import categoryStatus from "@/assets/category-status.jpg";
import categorySurvival from "@/assets/category-survival.jpg";
import categoryInspiration from "@/assets/category-inspiration.jpg";

const categories = [
  { icon: DollarSign, title: "Money & Side Hustles", description: "Discover practical ways Africans are building income and financial independence.", image: categoryMoney },
  { icon: Plane, title: "Travel Abroad (Japa)", description: "Navigate the realities of relocation, visas, and building a life beyond borders.", image: categoryTravel },
  { icon: Megaphone, title: "Business", description: "Copies that convince customers — marketing, branding, and business growth tactics.", image: categoryBusiness },
  { icon: Fingerprint, title: "Identity", description: "Exploring what it means to be African in a fast-changing, connected world.", image: categoryIdentity },
  { icon: Heart, title: "Relationships", description: "Real conversations about love, friendships, and navigating modern connections.", image: categoryRelationships },
  { icon: TrendingUp, title: "Growth", description: "Personal development, career moves, and the mindset behind progress.", image: categoryGrowth },
  { icon: Crown, title: "Status", description: "The pursuit of influence, lifestyle upgrades, and what success looks like today.", image: categoryStatus },
  { icon: Shield, title: "Survival", description: "Navigating everyday challenges with resilience, resourcefulness, and grit.", image: categorySurvival },
  { icon: Sparkles, title: "Inspiration", description: "Stories of people doing remarkable things across the continent and beyond.", image: categoryInspiration },
];

const CategoryCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimate(0.1);
  return (
    <div
      ref={ref}
      key={category.title}
      className={`group bg-background rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-500 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-accent/90 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>
    </div>
  );
};

const CategoriesSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimate(0.2);

  return (
    <section className="py-24 bg-surface-light">
      <div className="container">
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-16 space-y-4 transition-all duration-700 ease-out ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Stories That Move Africa <span className="text-gold">Forward</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Growtiva Africa explores the realities, ambitions, and opportunities shaping modern African life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
