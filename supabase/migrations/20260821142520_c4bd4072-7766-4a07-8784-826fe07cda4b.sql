CREATE SCHEMA IF NOT EXISTS app_private;
GRANT USAGE ON SCHEMA app_private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION app_private.has_role(_user_id uuid, _role public.app_role)
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

REVOKE ALL ON FUNCTION app_private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION app_private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Clientes
DROP POLICY IF EXISTS "Admins can view clients" ON public."Clientes";
DROP POLICY IF EXISTS "Admins can update clients" ON public."Clientes";
DROP POLICY IF EXISTS "Admins can delete clients" ON public."Clientes";

CREATE POLICY "Admins can view clients"
ON public."Clientes" FOR SELECT TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update clients"
ON public."Clientes" FOR UPDATE TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete clients"
ON public."Clientes" FOR DELETE TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'));

-- contactos_formulario
DROP POLICY IF EXISTS "Admins can view contact forms" ON public.contactos_formulario;
DROP POLICY IF EXISTS "Admins can update contact forms" ON public.contactos_formulario;
DROP POLICY IF EXISTS "Admins can delete contact forms" ON public.contactos_formulario;

CREATE POLICY "Admins can view contact forms"
ON public.contactos_formulario FOR SELECT TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact forms"
ON public.contactos_formulario FOR UPDATE TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact forms"
ON public.contactos_formulario FOR DELETE TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);