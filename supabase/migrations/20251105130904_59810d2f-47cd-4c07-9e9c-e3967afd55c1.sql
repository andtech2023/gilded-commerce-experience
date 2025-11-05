-- Add missing columns to contactos_formulario table
ALTER TABLE public.contactos_formulario 
ADD COLUMN IF NOT EXISTS tipo TEXT,
ADD COLUMN IF NOT EXISTS empresa TEXT;