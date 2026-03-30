export interface FormResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  created_at?: string;
}

export interface AdvertRequest {
  id?: string;
  full_name: string;
  email: string;
  business_name: string;
  ad_type: string;
  budget: string;
  want_hard_copy: boolean;
  additional_details?: string;
  created_at?: string;
}

export interface Profile {
  id?: string;
  full_name: string;
  email: string;
  password?: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}
