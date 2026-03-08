import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const Advertise = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    adType: "",
    budget: "",
    hardCopy: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.business || !form.adType || !form.budget || !form.hardCopy) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Inquiry submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <h2 className="text-3xl font-bold font-display">Inquiry Received!</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in advertising with Growtiva Africa. Our team will get back to you shortly.
            </p>
            <Button variant="gold" onClick={() => navigate("/")} className="px-8">
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-lg space-y-8 animate-fade-up">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                Advertise with Growtiva <span className="text-gold">Africa</span>
              </h1>
              <p className="text-muted-foreground">
                Put your brand in front of ambitious Africans. Fill in your details and we'll be in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Amara Okafor" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="amara@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business / Brand Name *</Label>
                <Input id="business" placeholder="Your business name" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>What do you want to advertise? *</Label>
                <Select value={form.adType} onValueChange={(val) => setForm({ ...form, adType: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ad type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="brand">Brand / Company</SelectItem>
                    <SelectItem value="job">Job Opening</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Budget *</Label>
                  <Select value={form.budget} onValueChange={(val) => setForm({ ...form, budget: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="half-page">Half Page — ₦50,000</SelectItem>
                      <SelectItem value="full-page">Full Page — ₦100,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Want a hard copy? *</Label>
                  <Select value={form.hardCopy} onValueChange={(val) => setForm({ ...form, hardCopy: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Details (optional)</Label>
                <Textarea id="message" placeholder="Tell us more about what you'd like to advertise..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full text-base">
                Submit Inquiry
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Advertise;
