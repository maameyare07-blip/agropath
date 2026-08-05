CREATE TABLE public.client_errors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message text NOT NULL,
  stack text,
  source text NOT NULL DEFAULT 'window',
  route text,
  user_agent text,
  viewport text,
  app_version text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.client_errors TO anon, authenticated;
GRANT SELECT, DELETE ON public.client_errors TO authenticated;
GRANT ALL ON public.client_errors TO service_role;

ALTER TABLE public.client_errors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can report a client error"
  ON public.client_errors FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view client errors"
  ON public.client_errors FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete client errors"
  ON public.client_errors FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX client_errors_created_at_idx ON public.client_errors (created_at DESC);