import { supabase } from "../lib/supabase";
import {
  Subscriber,
  FormResponse,
  AdvertRequest,
  Profile,
  ContactMessage,
} from "../types/forms";

/**
 * Handle Supabase insertion and error handling in a unified way.
 */
const performInsert = async <T>(
  table: string,
  data: any,
): Promise<FormResponse<T>> => {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select();

    if (error) {
      throw error;
    }

    return { success: true, data: result?.[0] as T };
  } catch (error: any) {
    console.error(
      `Error inserting into ${table}:`,
      error.message || "Unknown error",
    );
    return { success: false, error: error.message || "Submission failed" };
  }
};

/**
 * Subscribe a user to the newsletter.
 */
export const subscribeToNewsletter = async (
  email: string,
): Promise<FormResponse<Subscriber>> => {
  const response = await performInsert<Subscriber>("subscribers", { email });

  // Custom unique constraint error handling
  if (!response.success && response.error?.includes("duplicate key value")) {
    return { success: false, error: "You are already subscribed!" };
  }

  return response;
};

/**
 * Submit an advertising inquiry.
 */
export const submitAdvertRequest = async (
  data: AdvertRequest,
): Promise<FormResponse<AdvertRequest>> => {
  return await performInsert<AdvertRequest>("adverts", data);
};

/**
 * Submit a signup profile.
 */
export const submitSignUp = async (
  data: Profile,
): Promise<FormResponse<Profile>> => {
  return await performInsert<Profile>("profiles", data);
};

/**
 * Submit a contact message.
 */
export const submitContactMessage = async (
  data: ContactMessage,
): Promise<FormResponse<ContactMessage>> => {
  return await performInsert<ContactMessage>("contact", data);
};
