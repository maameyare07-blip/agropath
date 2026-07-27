
-- Roles infra
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  position text NOT NULL,
  organization text NOT NULL,
  email text NOT NULL,
  photo_url text,
  message text NOT NULL,
  permission_granted boolean NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT permission_required CHECK (permission_granted = true)
);

GRANT SELECT, INSERT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone may submit
CREATE POLICY "Anyone can submit testimonials"
  ON public.testimonials FOR INSERT
  TO anon, authenticated
  WITH CHECK (permission_granted = true AND status = 'pending');

-- Anyone may read approved
CREATE POLICY "Anyone can view approved testimonials"
  ON public.testimonials FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Admins full read
CREATE POLICY "Admins can view all testimonials"
  ON public.testimonials FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for testimonial-photos bucket (bucket created via tool)
CREATE POLICY "Public read testimonial photos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'testimonial-photos');

CREATE POLICY "Anyone can upload testimonial photos"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'testimonial-photos'
    AND (lower(right(name, 4)) IN ('.jpg','.png','.gif','.web') OR lower(right(name, 5)) IN ('.jpeg','.webp'))
  );

CREATE POLICY "Admins manage testimonial photos"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'testimonial-photos' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'testimonial-photos' AND public.has_role(auth.uid(), 'admin'));
