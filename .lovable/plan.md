# Dark mode and email updates

## Scope
- Add a sun/moon theme control to both desktop and mobile navigation.
- Default new visitors to their system color preference, persist later choices safely, and apply the `dark` class to the page root.
- Keep the existing green/gold identity while using the project’s already-defined dark theme tokens.
- Add a compact “Get Updates” form above the footer copyright area, with validated email input and accessible loading/success/error states.
- Create a secure `subscribers` table with unique emails, anonymous/public insert-only access, and admin-only read/delete access.
- Show the requested success message and a friendly duplicate-email message.

## Technical details
- Use a small reusable theme hook/control and the existing icon-button, tooltip, input, and toast patterns.
- Validate and normalize email addresses client-side before database insertion; enforce length/format constraints in the database policy as defense in depth.
- Grant only `INSERT` to `anon` and `authenticated`, plus admin-managed `SELECT`/`DELETE` policies using the existing `has_role` function. No public read, update, or delete access.
- Refresh generated database typings after the migration if needed.
- Verify the latest build diagnostics and test theme persistence plus subscription responses in the preview.
