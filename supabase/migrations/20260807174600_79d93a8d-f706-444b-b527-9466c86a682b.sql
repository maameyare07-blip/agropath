-- 1. Remove public/anon read access to the base table entirely
DROP POLICY IF EXISTS "Public can read approved testimonials" ON public.testimonials;
REVOKE ALL ON public.testimonials FROM anon;

-- keep insert ability for submissions (policy already restricts to pending + permission granted)
GRANT INSERT ON public.testimonials TO anon;

-- 2. Safe read path: security definer function exposing only non-sensitive columns
CREATE OR REPLACE FUNCTION public.get_approved_testimonials()
RETURNS TABLE (
  id uuid,
  full_name text,
  "position" text,
  organization text,
  message text,
  photo_url text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT t.id, t.full_name, t."position", t.organization, t.message, t.photo_url, t.created_at
  FROM public.testimonials t
  WHERE t.status = 'approved'
  ORDER BY t.created_at DESC
$$;

REVOKE ALL ON FUNCTION public.get_approved_testimonials() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_approved_testimonials() TO anon, authenticated, service_role;
