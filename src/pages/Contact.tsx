import { ArrowLeft, Send, Mail, MessageSquare } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormHandlers } from "@/hooks/use-form-handlers";

const Contact = () => {
  const { handleContactSubmit, forms } = useFormHandlers();
  const submitting = forms.contact.loading;

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
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm tracking-tight">
              GROWTIVA <span className="text-gold">AFRICA</span>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Get In <span className="text-gold dark:text-white">Touch</span>
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
            <form onSubmit={handleContactSubmit} className="md:col-span-3 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  required
                />
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
