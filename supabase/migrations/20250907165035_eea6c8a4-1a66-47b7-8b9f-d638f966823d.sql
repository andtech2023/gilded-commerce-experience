-- Enable Row Level Security on both public tables
ALTER TABLE public.contactos_formulario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.Clientes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contactos_formulario table
-- Allow anyone to insert new contact form submissions (public forms)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contactos_formulario 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view contact form submissions (for admin access later)
CREATE POLICY "Only authenticated users can view contact forms" 
ON public.contactos_formulario 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can update contact form submissions
CREATE POLICY "Only authenticated users can update contact forms" 
ON public.contactos_formulario 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete contact form submissions  
CREATE POLICY "Only authenticated users can delete contact forms" 
ON public.contactos_formulario 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create RLS policies for Clientes table
-- Allow anyone to insert new client emails (for newsletter/updates)
CREATE POLICY "Anyone can subscribe as client" 
ON public.Clientes 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view client data
CREATE POLICY "Only authenticated users can view clients" 
ON public.Clientes 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can update client data
CREATE POLICY "Only authenticated users can update clients" 
ON public.Clientes 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete client data
CREATE POLICY "Only authenticated users can delete clients" 
ON public.Clientes 
FOR DELETE 
USING (auth.uid() IS NOT NULL);