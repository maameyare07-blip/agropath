CREATE TABLE public.published_content (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 kind text NOT NULL DEFAULT 'article' CHECK (kind IN ('article','publication')),
 title text NOT NULL,
 summary text NOT NULL DEFAULT '',
 url text,
 in_book text NOT NULL DEFAULT '',
 publication_year integer,
 authors text[] NOT NULL DEFAULT '{}',
 status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.published_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.published_content TO authenticated;
GRANT ALL ON public.published_content TO service_role;
ALTER TABLE public.published_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published content" ON public.published_content FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins manage content" ON public.published_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER published_content_updated_at BEFORE UPDATE ON public.published_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();