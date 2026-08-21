ALTER TABLE public.contactos_formulario ADD COLUMN IF NOT EXISTS archivo_path text;

DROP POLICY IF EXISTS "Anyone can upload lead invoices" ON storage.objects;
CREATE POLICY "Anyone can upload lead invoices"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'facturas-leads');

DROP POLICY IF EXISTS "Admins can read lead invoices" ON storage.objects;
CREATE POLICY "Admins can read lead invoices"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'facturas-leads' AND app_private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete lead invoices" ON storage.objects;
CREATE POLICY "Admins can delete lead invoices"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'facturas-leads' AND app_private.has_role(auth.uid(), 'admin'));