-- 1. Remove public read path on the base table (RLS cannot restrict columns)
DROP POLICY IF EXISTS "Public can read approved testimonials" ON public.testimonials;

-- 2. Remove any column-level / table-level SELECT grants for public roles
REVOKE SELECT ON public.testimonials FROM anon;
REVOKE SELECT ON public.testimonials FROM authenticated;
REVOKE SELECT (id, full_name, position, organization, email, photo_url, message, permission_granted, status, created_at, updated_at)
  ON public.testimonials FROM anon;
REVOKE SELECT (id, full_name, position, organization, email, photo_url, message, permission_granted, status, created_at, updated_at)
  ON public.testimonials FROM authenticated;

-- Keep insert (public submissions) and admin access working
GRANT INSERT ON public.testimonials TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

-- 3. Recreate the safe public view as the only public read path.
--    security_invoker = off so it reads with the view owner's rights (email excluded by definition).
DROP VIEW IF EXISTS public.public_testimonials;
CREATE VIEW public.public_testimonials
WITH (security_invoker = off) AS
  SELECT id, full_name, position, organization, message, photo_url, created_at
  FROM public.testimonials
  WHERE status = 'approved';

GRANT SELECT ON public.public_testimonials TO anon, authenticated;
GRANT SELECT ON public.public_testimonials TO service_role;