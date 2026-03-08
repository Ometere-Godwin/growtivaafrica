import { ArrowLeft, Target, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To inspire, inform, and empower young Africans with stories that matter — from building wealth and navigating careers to exploring identity and chasing bold ambitions across the globe.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where every young African has access to the insights, networks, and motivation to thrive — wherever they are.",
  },
  {
    icon: Sparkles,
    title: "Why We Exist",
    description:
      "Mainstream media rarely tells our stories the way we live them. Growtiva Africa fills that gap with raw, real, and relevant content created by Africans, for Africans.",
  },
];

const team = [
  { name: "Adeola Martins", role: "Editor-in-Chief", initials: "AM" },
  { name: "Kwame Asante", role: "Creative Director", initials: "KA" },
  { name: "Fatima Bello", role: "Head of Content", initials: "FB" },
  { name: "Tendai Moyo", role: "Community Lead", initials: "TM" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="font-display font-bold text-sm tracking-tight">
            GROWTIVA <span className="text-gold">AFRICA</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Story Behind <span className="text-gold">Growtiva Africa</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            We're more than a magazine. We're a movement — built to amplify the voices, ambitions, and lived experiences of business and growth focused Africans everywhere.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How It Started</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Growtiva Africa was born from a simple frustration: the stories shaping young Africans' lives weren't being told — at least not by us. The hustle of building a career in Lagos, the emotional weight of relocating abroad, the quiet ambition of a founder bootstrapping from Accra, the identity questions that come with being African in a globalized world.
            </p>
            <p>
              We started as a conversation between friends and creatives who wanted something different — a publication that didn't water down the African experience for a Western audience, but celebrated it in all its complexity.
            </p>
            <p>
              Today, Growtiva Africa is a digital and print magazine covering money, growth, identity, relationships, travel, and survival — all through a distinctly African lens. Every issue is crafted to leave you more inspired, more informed, and more connected to the continent's pulse.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Why */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container max-w-4xl text-center space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Meet the Team</h2>
            <p className="text-muted-foreground">The people behind every page, pixel, and story.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-xl">
                  {member.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Ready to Join the Movement?
          </h2>
          <p className="text-primary-foreground/70">
            Subscribe to get every issue delivered to your inbox — stories that inspire, inform, and connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 font-semibold">
              <Link to="/signup">Subscribe Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8">
              <Link to="/issue">Read Issue #01</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface-dark text-muted-foreground">
        <div className="container text-center space-y-3">
          <p className="font-display font-bold text-gold text-lg">GROWTIVA AFRICA</p>
          <p className="text-sm text-foreground opacity-70">A Production of Swiftpixels Creative Studios</p>
          <p className="text-xs text-foreground opacity-50">
            &copy; {new Date().getFullYear()} Growtiva Africa. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
