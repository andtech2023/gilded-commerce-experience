DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Clientes
DROP POLICY IF EXISTS "Only authenticated users can view clients" ON public."Clientes";
DROP POLICY IF EXISTS "Only authenticated users can update clients" ON public."Clientes";
DROP POLICY IF EXISTS "Only authenticated users can delete clients" ON public."Clientes";

CREATE POLICY "Admins can view clients"
ON public."Clientes" FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update clients"
ON public."Clientes" FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete clients"
ON public."Clientes" FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- contactos_formulario
DROP POLICY IF EXISTS "Only authenticated users can view contact forms" ON public.contactos_formulario;
DROP POLICY IF EXISTS "Only authenticated users can update contact forms" ON public.contactos_formulario;
DROP POLICY IF EXISTS "Only authenticated users can delete contact forms" ON public.contactos_formulario;

CREATE POLICY "Admins can view contact forms"
ON public.contactos_formulario FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact forms"
ON public.contactos_formulario FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact forms"
ON public.contactos_formulario FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));