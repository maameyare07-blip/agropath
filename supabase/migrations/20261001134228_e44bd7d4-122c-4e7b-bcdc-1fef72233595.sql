DROP POLICY IF EXISTS "Anyone can report a client error" ON public.client_errors;
CREATE POLICY "Anyone can report a valid client error"
  ON public.client_errors FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(message) BETWEEN 1 AND 2000
    AND (stack IS NULL OR char_length(stack) <= 8000)
    AND source IN ('window','unhandledrejection','react','manual')
    AND (route IS NULL OR char_length(route) <= 2000)
    AND (user_agent IS NULL OR char_length(user_agent) <= 500)
    AND (viewport IS NULL OR char_length(viewport) <= 100)
    AND (app_version IS NULL OR char_length(app_version) <= 100)
    AND created_at >= now() - interval '5 minutes'
    AND created_at <= now() + interval '5 minutes'
  );