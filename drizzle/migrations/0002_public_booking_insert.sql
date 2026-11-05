-- Public booking submissions use the publishable/anon key and are constrained by RLS.
-- Public callers can insert only the form fields; IDs, timestamps, and status are database-owned.
REVOKE ALL ON public.booking_requests FROM PUBLIC, anon;
GRANT INSERT (name, contact, format, preferred_slot, note)
  ON public.booking_requests TO anon;

CREATE POLICY "Public can submit booking requests"
  ON public.booking_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'pending'
    AND char_length(btrim(name)) BETWEEN 1 AND 60
    AND char_length(btrim(contact)) BETWEEN 3 AND 120
    AND format IN ('online', 'in-person', 'either')
    AND (preferred_slot IS NULL OR char_length(preferred_slot) <= 200)
    AND (note IS NULL OR char_length(note) <= 500)
  );
