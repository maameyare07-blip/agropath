ALTER VIEW public.public_testimonials SET (security_invoker = on);

CREATE POLICY "Public can read approved testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

GRANT SELECT (id, full_name, "position", organization, message, photo_url, created_at)
ON public.testimonials TO anon, authenticated;