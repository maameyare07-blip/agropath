# AGENTS.md

- AI features run in Supabase Edge Functions calling Lovable AI Gateway (Responses API) with shared helpers in `supabase/functions/_shared/`; why: keeps the API key and prompts server-side.
- Crop Doctor sends client-compressed images as data URLs (max 3) and the function streams the model output server-side, returning JSON; why: one-shot feature without chat UI, signed-in farmers then upload photos client-side to the private crop-photos bucket (per-user folder) and save a diagnoses row; anonymous use stores nothing.
- Farmer dashboard data (diagnoses, symptom_logs, crop_notes) is written from the client with RLS scoped to auth.uid(); why: per-farmer privacy without extra functions.
- Theme preference is applied by the navbar toggle to the root `dark` class and persisted in local storage; why: one class-based theme source works across every route.
- All pages share the language provider and translate visible copy through the central catalog; preserve user-entered content, URLs, and structured data, and use logical spacing for Arabic layouts; why: language changes stay consistent without altering farmer records or public metadata.
- Admin routes share a server-validated admin-role layout and all private reads and mutations remain RLS-protected; why: farmer sessions must not unlock administrator data.
- Publications and on-site article listings read published_content with published-only public access and admin-only writes; external blog destinations stay separate; why: content edits and draft visibility work without exposing private submissions.
- Admin overview uses a role-checked SECURITY DEFINER statistics function; diagnosis review has SELECT-only admin policies and signed photo URLs, while farmer queries explicitly filter user_id; why: aggregate auth counts and cross-farmer review remain protected and separate from personal dashboards.
- Phone layouts share translated bottom farmer navigation and the existing routes/language provider rather than a separate mobile site; why: all content stays consistent across devices and languages.
