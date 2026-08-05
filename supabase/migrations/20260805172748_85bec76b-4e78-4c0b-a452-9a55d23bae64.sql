DROP VIEW IF EXISTS public.public_testimonials;

-- Column-level grants: email intentionally excluded for public roles
REVOKE SELECT ON public.testimonials FROM anon, authenticated;
GRANT SELECT (id, full_name, position, organization, message, photo_url, created_at, status)
  ON public.testimonials TO anon;
GRANT SELECT ON public.testimonials TO authenticated;

CREATE POLICY "Public can read approved testimonials"
  ON public.testimonials FOR SELECT TO anon
  USING (status = 'approved');

CREATE VIEW public.public_testimonials
WITH (security_invoker = on) AS
  SELECT id, full_name, position, organization, message, photo_url, created_at
  FROM public.testimonials
  WHERE status = 'approved';

GRANT SELECT ON public.public_testimonials TO anon, authenticated;
GRANT ALL ON public.public_testimonials TO service_role;