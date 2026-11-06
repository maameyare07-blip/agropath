CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Admin access required' USING ERRCODE = '42501';
  END IF;
  RETURN jsonb_build_object(
    'testimonials_approved', (SELECT count(*) FROM public.testimonials WHERE status = 'approved'),
    'testimonials_pending', (SELECT count(*) FROM public.testimonials WHERE status = 'pending'),
    'testimonials_rejected', (SELECT count(*) FROM public.testimonials WHERE status = 'rejected'),
    'subscribers', (SELECT count(*) FROM public.subscribers),
    'content_published', (SELECT count(*) FROM public.published_content WHERE status = 'published'),
    'content_draft', (SELECT count(*) FROM public.published_content WHERE status = 'draft'),
    'diagnoses_total', (SELECT count(*) FROM public.diagnoses),
    'diagnoses_week', (SELECT count(*) FROM public.diagnoses WHERE created_at >= now() - interval '7 days'),
    'farmers', (SELECT count(*) FROM auth.users u WHERE NOT public.has_role(u.id, 'admin'::public.app_role)),
    'errors_week', (SELECT count(*) FROM public.client_errors WHERE created_at >= now() - interval '7 days')
  );
END;
$$;
REVOKE ALL ON FUNCTION public.admin_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_stats() TO authenticated;
CREATE POLICY "Admins can review diagnoses" ON public.diagnoses FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can review crop photos" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'crop-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));