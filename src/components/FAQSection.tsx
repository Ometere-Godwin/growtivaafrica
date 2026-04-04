import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Growtiva Africa?",
    answer:
      "Growtiva Africa is a premier digital and print magazine spotlighting entrepreneurship, innovation, and culture across the African continent. We tell the stories of founders, creatives, and changemakers shaping the future.",
  },
  {
    question: "When does the first issue launch?",
    answer:
      "Our premier edition (Issue #01) launches on May 1st, 2026. Sign up for our newsletter to be the first to know when it drops.",
  },
  {
    question: "Is the magazine free?",
    answer:
      "Yes! The digital edition is completely free. We also offer a premium print edition for collectors and businesses that prefer a physical copy.",
  },
  {
    question: "How can I advertise in Growtiva Africa?",
    answer:
      "We offer half-page ads starting at ₦50,000 and full-page ads at ₦100,000. Visit our Advertise page or contact us directly to discuss custom packages tailored to your brand.",
  },
  {
    question: "How do I subscribe or sign up?",
    answer:
      "Simply click the 'Sign Up' or newsletter section on our website and provide your name, email, and phone number — no password needed. You'll receive updates and early access to every issue.",
  },
  {
    question: "Can I contribute a story or feature?",
    answer:
      "Absolutely! We welcome pitches from writers, photographers, and creatives across Africa. Reach out through our Contact page with your idea and we'll get back to you.",
  },
  {
    question: "How often is the magazine published?",
    answer:
      "Growtiva Africa is published quarterly, with special editions for major events and seasonal features throughout the year.",
  },
];

const FAQSection = () => {
  const { ref: sectionRef } = useScrollAnimate();

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-secondary/30"
    >
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Got Questions?
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Everything you need to know about Growtiva Africa, subscriptions, and advertising.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-lg px-5 bg-card data-[state=open]:border-accent/50 transition-colors"
            >
              <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
