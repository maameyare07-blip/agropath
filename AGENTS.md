# AGENTS.md

- AI features run in Supabase Edge Functions calling Lovable AI Gateway (Responses API) with shared helpers in `supabase/functions/_shared/`; why: keeps the API key and prompts server-side.
- Crop Doctor sends client-compressed images as data URLs (max 3) and the function streams the model output server-side, returning JSON; why: one-shot feature without chat UI, signed-in farmers then upload photos client-side to the private crop-photos bucket (per-user folder) and save a diagnoses row; anonymous use stores nothing.
- Farmer dashboard data (diagnoses, symptom_logs, crop_notes) is written from the client with RLS scoped to auth.uid(); why: per-farmer privacy without extra functions.
- Theme preference is applied by the navbar toggle to the root `dark` class and persisted in local storage; why: one class-based theme source works across every route.
