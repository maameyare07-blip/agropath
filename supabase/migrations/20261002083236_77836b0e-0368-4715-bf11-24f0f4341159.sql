CREATE TABLE public.diagnoses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  crop text,
  symptoms text,
  answer text NOT NULL,
  photo_paths text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.symptom_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  crop text NOT NULL,
  plot text,
  severity smallint NOT NULL CHECK (severity BETWEEN 1 AND 5),
  notes text,
  observed_on date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.crop_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  crop text,
  body text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnoses, public.symptom_logs, public.crop_notes TO authenticated;
GRANT ALL ON public.diagnoses, public.symptom_logs, public.crop_notes TO service_role;
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own diagnoses" ON public.diagnoses FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own symptom logs" ON public.symptom_logs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own crop notes" ON public.crop_notes FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER update_crop_notes_updated_at BEFORE UPDATE ON public.crop_notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX ON public.diagnoses (user_id, created_at DESC);
CREATE INDEX ON public.symptom_logs (user_id, observed_on);
CREATE INDEX ON public.crop_notes (user_id, updated_at DESC);

CREATE POLICY "Farmers read own crop photos" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'crop-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Farmers upload own crop photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'crop-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Farmers delete own crop photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'crop-photos' AND (storage.foldername(name))[1] = auth.uid()::text);