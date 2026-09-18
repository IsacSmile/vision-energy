import { z } from 'zod';

// UAE Phone regex accepts formats like:
// +971 50 123 4567, +971501234567, 0501234567, 072042763, +971 7 204 2763
const uaePhoneRegex = /^(\+?971|0)?\s*([2345679])\s*\d{3}\s*\d{4}$/;

export const serviceEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Full name is required (at least 2 characters)' }),
  company: z.string().optional(),
  phone: z.string().regex(uaePhoneRegex, { message: 'Please enter a valid UAE phone number (+971 5x xxx xxxx or 05x xxx xxxx)' }),
  email: z.string().email({ message: 'Valid email address is required' }),
  emirate: z.string().min(1, { message: 'Please select an emirate or location' }),
  projectType: z.string().min(1, { message: 'Please select a project type' }),
  preferredDate: z.string().optional(),
  message: z.string().min(5, { message: 'Please provide details about your enquiry (min 5 characters)' }),
  consent: z.boolean().refine((val) => val === true, { message: 'You must accept the privacy policy consent' }),
  
  // Hidden context fields
  serviceSlug: z.string().min(1),
  serviceTitle: z.string().min(1),
  sourceUrl: z.string().min(1),
  
  // Anti-spam honeypot field
  website: z.string().max(0, { message: 'Spam detected' }).optional()
});

export type ServiceEnquiryInput = z.infer<typeof serviceEnquirySchema>;

export const productEnquirySchema = z.object({
  name: z.string().min(2, { message: 'Full name is required (at least 2 characters)' }),
  company: z.string().optional(),
  phone: z.string().regex(uaePhoneRegex, { message: 'Please enter a valid UAE phone number (+971 5x xxx xxxx or 05x xxx xxxx)' }),
  email: z.string().email({ message: 'Valid email address is required' }),
  categoryCode: z.string().min(1, { message: 'Category code is required' }),
  categoryTitle: z.string().min(1, { message: 'Category title is required' }),
  quantity: z.string().optional(),
  deliveryLocation: z.string().optional(),
  message: z.string().min(5, { message: 'Please provide requirement details (min 5 characters)' }),
  consent: z.boolean().refine((val) => val === true, { message: 'You must accept the privacy policy consent' }),
  
  // Hidden context field
  sourceUrl: z.string().min(1),
  
  // Anti-spam honeypot field
  website: z.string().max(0, { message: 'Spam detected' }).optional()
});

export type ProductEnquiryInput = z.infer<typeof productEnquirySchema>;

export const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Valid email address is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
