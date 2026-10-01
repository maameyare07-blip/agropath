# AGENTS.md

- AI features run in Supabase Edge Functions calling Lovable AI Gateway (Responses API) with shared helpers in `supabase/functions/_shared/`; why: keeps the API key and prompts server-side.
- Crop Doctor sends client-compressed images as data URLs (max 3) and the function streams the model output server-side, returning JSON; why: one-shot feature without chat UI, avoids storing farmer photos.
