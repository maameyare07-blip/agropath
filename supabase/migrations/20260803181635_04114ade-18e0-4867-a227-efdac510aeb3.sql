-- Use an invoker-rights view (no SECURITY DEFINER) as the public read path
DROP VIEW IF EXISTS public.public_testimonials;
CREATE VIEW public.public_testimonials
WITH (security_invoker = on) AS
  SELECT id, full_name, position, organization, message, photo_url, created_at
  FROM public.testimonials
  WHERE status = 'approved';

GRANT SELECT ON public.public_testimonials TO anon, authenticated;
GRANT SELECT ON public.public_testimonials TO service_role;

-- Public roles may only read non-sensitive columns; 'email' is deliberately excluded
REVOKE SELECT ON public.testimonials FROM anon, authenticated;
GRANT SELECT (id, full_name, position, organization, message, photo_url, status, created_at)
  ON public.testimonials TO anon;
GRANT SELECT (id, full_name, position, organization, message, photo_url, status, created_at)
  ON public.testimonials TO authenticated;

-- Row-level restriction: only approved rows are publicly visible
DROP POLICY IF EXISTS "Public can read approved testimonials" ON public.testimonials;
CREATE POLICY "Public can read approved testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

GRANT INSERT ON public.testimonials TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;