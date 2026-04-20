-- Restrict TRELLO storage bucket to service-role only.
-- These policies deny all client (anon + authenticated) access. Service role bypasses RLS.

CREATE POLICY "TRELLO bucket: deny client SELECT"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'TRELLO');

CREATE POLICY "TRELLO bucket: deny client INSERT"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'TRELLO');

CREATE POLICY "TRELLO bucket: deny client UPDATE"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'TRELLO')
WITH CHECK (bucket_id <> 'TRELLO');

CREATE POLICY "TRELLO bucket: deny client DELETE"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'TRELLO');
