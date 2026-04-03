import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useFormHandlers } from "@/hooks/use-form-handlers";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSignUpSubmit, forms } = useFormHandlers();
  const submitted = forms.signup.success;
  const isSubmitting = forms.signup.loading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-bold text-lg tracking-tight">
              GROWTIVA <span className="text-gold">AFRICA</span>
            </span>
          </button>
          <ThemeToggle />
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

            <form onSubmit={handleSignUpSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Amara Okafor"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="amara@example.com"
                  required
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full text-base" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
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
