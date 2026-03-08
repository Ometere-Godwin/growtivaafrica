import { useState } from "react";
import { ArrowLeft, Send, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be under 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

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
            Get In <span className="text-gold">Touch</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Have a story idea, partnership inquiry, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Info */}
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you're a brand looking to advertise, a writer pitching a story, or a reader with feedback — we're all ears.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm">Email Us</p>
                    <p className="text-xs text-muted-foreground">hello@growtivaafrica.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm">Social Media</p>
                    <p className="text-xs text-muted-foreground">@growtivaafrica on all platforms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className={errors.subject ? "border-destructive" : ""}
                />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" disabled={submitting} className="h-12 px-8 font-semibold gap-2">
                {submitting ? "Sending..." : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
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

export default Contact;
