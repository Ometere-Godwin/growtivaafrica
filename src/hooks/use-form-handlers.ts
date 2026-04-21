import { SyntheticEvent } from "react";
import { useForm } from "./use-form";
import {
  submitSubscriber,
  submitAdvertRequest,
  submitProfile,
  submitContact,
} from "../api/forms";
import {
  Subscriber,
  AdvertRequest,
  Profile,
  ContactMessage,
} from "../types/forms";

/**
 * Hook providing specialized form handlers for each Supabase table.
 */
export const useFormHandlers = (
  onSuccess?: (type: string, data?: any) => void,
) => {
  const newsletterForm = useForm<Subscriber>((data) =>
    onSuccess?.("newsletter", data),
  );
  const advertForm = useForm<AdvertRequest>((data) =>
    onSuccess?.("advert", data),
  );
  const signUpForm = useForm<Profile>((data) => onSuccess?.("signup", data));
  const contactForm = useForm<ContactMessage>((data) =>
    onSuccess?.("contact", data),
  );

  /** 1. Newsletter Subscribe Handler */
  const handleNewsletterSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    newsletterForm.handleSubmission(e, {
      apiCall: (data) => submitSubscriber(data),
      requiredFields: ["email"],
      successMessage: "Thank you for subscribing to our newsletter!",
    });
  };

  /** 2. Advertising Inquiry Handler */
  const handleAdvertSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    advertForm.handleSubmission(e, {
      apiCall: (data) => {
        // Handle checkbox mapping
        const mappedData = {
          ...data,
          want_hard_copy:
            (data as any).want_hard_copy === "yes" ||
            (data as any).want_hard_copy === "true",
        };
        return submitAdvertRequest(mappedData as AdvertRequest);
      },
      requiredFields: [
        "full_name",
        "email",
        "business_name",
        "ad_type",
        "budget",
      ],
      successMessage:
        "Advertising inquiry sent! Our team will get back to you shortly.",
    });
  };

  /** 3. Sign Up Handler */
  const handleSignUpSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    signUpForm.handleSubmission(e, {
      apiCall: submitProfile,
      requiredFields: ["full_name", "phone", "email"],
      successMessage: "Welcome to Growtiva Africa! You have been signed up.",
    });
  };

  /** 4. Contact Message Handler */
  const handleContactSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    contactForm.handleSubmission(e, {
      apiCall: submitContact,
      requiredFields: ["name", "email", "message"],
      successMessage: "Message sent! We have received your query.",
    });
  };

  return {
    handleNewsletterSubmit,
    handleAdvertSubmit,
    handleSignUpSubmit,
    handleContactSubmit,
    forms: {
      newsletter: newsletterForm,
      advert: advertForm,
      signup: signUpForm,
      contact: contactForm,
    },
  };
};
