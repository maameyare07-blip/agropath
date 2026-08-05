-- Remove public direct read access to the base table (RLS cannot limit columns)
DROP POLICY IF EXISTS "Public can read approved testimonials" ON public.testimonials;
REVOKE SELECT ON public.testimonials FROM anon, authenticated;
GRANT INSERT ON public.testimonials TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.testimonials TO authenticated;

-- Recreate the public view as a definer (security-barrier) view exposing only safe columns
DROP VIEW IF EXISTS public.public_testimonials;
CREATE VIEW public.public_testimonials
WITH (security_invoker = off, security_barrier = true) AS
  SELECT id, full_name, position, organization, message, photo_url, created_at
  FROM public.testimonials
  WHERE status = 'approved';

ALTER VIEW public.public_testimonials OWNER TO postgres;
GRANT SELECT ON public.public_testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
GRANT ALL ON public.public_testimonials TO service_role;