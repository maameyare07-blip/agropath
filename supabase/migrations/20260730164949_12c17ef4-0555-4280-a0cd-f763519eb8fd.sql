-- 1. Remove public read on base table (exposes email)
DROP POLICY IF EXISTS "Public can read approved testimonials via safe view" ON public.testimonials;
REVOKE SELECT ON public.testimonials FROM anon;
REVOKE SELECT ON public.testimonials FROM authenticated;
GRANT SELECT ON public.testimonials TO authenticated; -- admin RLS policy still gates rows
REVOKE ALL ON public.testimonials FROM anon;
GRANT INSERT ON public.testimonials TO anon;

-- Safe view stays the only public read path (security definer view semantics)
ALTER VIEW public.public_testimonials SET (security_invoker = off);
GRANT SELECT ON public.public_testimonials TO anon, authenticated;

-- 2. Remove blanket public read on testimonial photos bucket
DROP POLICY IF EXISTS "Public read testimonial photos" ON storage.objects;