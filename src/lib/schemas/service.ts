import { z } from 'zod';

export const systemItemSchema = z.object({
  title: z.string().min(1, 'System title is required'),
  body: z.string().min(1, 'System body description is required'),
  points: z.array(z.string()).default([]),
});

export const processStepSchema = z.object({
  title: z.string().min(1, 'Step title is required'),
  description: z.string().min(1, 'Step description is required'),
  confirmed: z.boolean().default(false),
});

export const faqItemSchema = z.object({
  q: z.string().min(1, 'Question is required'),
  a: z.string().min(1, 'Answer is required'),
});

export const serviceContentSchema = z.object({
  heroLead: z.string().min(1, 'Hero lead paragraph is required'),
  overview: z.string().optional().default(''),
  systems: z.array(systemItemSchema).optional().default([]),
  included: z.array(z.string()).optional().default([]),
  whereWeInstall: z.array(z.string()).optional().default([]),
  process: z.array(processStepSchema).optional().default([]),
  standards: z.array(z.string()).optional().default([]),
  complianceNote: z.string().optional().default(''),
  faq: z.array(faqItemSchema).optional().default([]),
  relatedCategoryCodes: z.array(z.string()).optional().default([]),
});

export type SystemItem = z.infer<typeof systemItemSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type FAQItem = z.infer<typeof faqItemSchema>;
export type ServiceContent = z.infer<typeof serviceContentSchema>;
