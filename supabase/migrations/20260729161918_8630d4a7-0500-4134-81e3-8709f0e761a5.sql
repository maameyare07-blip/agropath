
-- Remove public SELECT access to the base testimonials table (email column was exposed)
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON public.testimonials;
REVOKE SELECT ON public.testimonials FROM anon;

-- Safe public-facing view: approved rows, no email column
CREATE OR REPLACE VIEW public.public_testimonials
WITH (security_invoker = true) AS
SELECT id, full_name, position, organization, message, photo_url, created_at
FROM public.testimonials
WHERE status = 'approved';

-- Allow the view to bypass RLS for the safe columns by adding a scoped SELECT policy
-- restricted to approved rows only. Column-level access is limited by the view definition.
CREATE POLICY "Public can read approved testimonials via safe view"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Re-grant column-scoped SELECT so email stays protected from anon
GRANT SELECT (id, full_name, position, organization, message, photo_url, status, created_at)
  ON public.testimonials TO anon;

GRANT SELECT ON public.public_testimonials TO anon, authenticated;
