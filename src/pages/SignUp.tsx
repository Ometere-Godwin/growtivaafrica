import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitted(true);
    toast.success("Welcome to Growtiva Africa!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex items-center h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-bold text-lg tracking-tight">
              GROWTIVA <span className="text-gold">AFRICA</span>
            </span>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        {submitted ? (
          <div className="text-center space-y-6 animate-fade-up max-w-md">
            <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-3xl font-bold font-display">You're In!</h2>
            <p className="text-muted-foreground">
              Welcome to the Growtiva Africa community. Get ready for stories that move Africa forward.
            </p>
            <Button variant="gold" onClick={() => navigate("/")} className="px-8">
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-8 animate-fade-up">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                Join Growtiva <span className="text-gold">Africa</span>
              </h1>
              <p className="text-muted-foreground">
                Get access to stories, insights, and opportunities shaping modern African life.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Amara Okafor"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="amara@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full text-base">
                Create Free Account
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
