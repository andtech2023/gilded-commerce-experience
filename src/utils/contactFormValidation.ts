import { z } from 'zod';

// Schema for contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre no puede exceder 100 caracteres" })
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'-]+$/, { message: "El nombre contiene caracteres no válidos" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email no válido" })
    .max(255, { message: "El email no puede exceder 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "El teléfono no puede exceder 20 caracteres" })
    .regex(/^[\d\s+()-]*$/, { message: "Formato de teléfono no válido" })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(1, { message: "El mensaje es requerido" })
    .max(2000, { message: "El mensaje no puede exceder 2000 caracteres" }),
  budget: z
    .string()
    .max(50, { message: "Presupuesto no válido" })
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Discriminated union types for validation result
type ValidationSuccess = { success: true; data: ContactFormData; errors?: never };
type ValidationError = { success: false; errors: string[]; data?: never };
export type ValidationResult = ValidationSuccess | ValidationError;

// Sanitize text to prevent XSS (basic sanitization for storage)
export function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Validate and sanitize form data
export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  budget?: string;
}): ValidationResult {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return { success: false, errors };
  }
  
  // Sanitize the validated data
  const sanitized: ContactFormData = {
    name: sanitizeText(result.data.name),
    email: result.data.email,
    message: sanitizeText(result.data.message),
    phone: result.data.phone ? sanitizeText(result.data.phone) : undefined,
    budget: result.data.budget ? sanitizeText(result.data.budget) : undefined,
  };
  
  return { success: true, data: sanitized };
}
