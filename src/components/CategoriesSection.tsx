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

const categories = [
  {
    icon: DollarSign,
    title: "Money & Side Hustles",
    description: "Discover practical ways Africans are building income and financial independence.",
  },
  {
    icon: Plane,
    title: "Travel Abroad (Japa)",
    description: "Navigate the realities of relocation, visas, and building a life beyond borders.",
  },
  {
    icon: Megaphone,
    title: "Business",
    description: "Copies that convince customers — marketing, branding, and business growth tactics.",
  },
  {
    icon: Fingerprint,
    title: "Identity",
    description: "Exploring what it means to be African in a fast-changing, connected world.",
  },
  {
    icon: Heart,
    title: "Relationships",
    description: "Real conversations about love, friendships, and navigating modern connections.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Personal development, career moves, and the mindset behind progress.",
  },
  {
    icon: Crown,
    title: "Status",
    description: "The pursuit of influence, lifestyle upgrades, and what success looks like today.",
  },
  {
    icon: Shield,
    title: "Survival",
    description: "Navigating everyday challenges with resilience, resourcefulness, and grit.",
  },
  {
    icon: Sparkles,
    title: "Inspiration",
    description: "Stories of people doing remarkable things across the continent and beyond.",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-24 bg-surface-light">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Stories That Move Africa <span className="text-gold">Forward</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Drive Africa explores the realities, ambitions, and opportunities shaping modern African life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group bg-background rounded-lg p-6 border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                <category.icon className="w-6 h-6 text-gold group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
