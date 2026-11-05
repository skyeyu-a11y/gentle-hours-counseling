import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please tell us what to call you").max(60),
  contact: z.string().trim().min(3, "Please leave a way to reach you").max(120),
  format: z.enum(["online", "in-person", "either"]),
  preferredSlot: z.string().trim().max(200).optional().default(""),
  note: z.string().trim().max(500).optional().default(""),
});

export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabasePublic } = await import("@/integrations/supabase/client.server");
    const { error } = await supabasePublic.from("booking_requests").insert({
      name: data.name,
      contact: data.contact,
      format: data.format,
      preferred_slot: data.preferredSlot || null,
      note: data.note || null,
    });
    if (error) {
      console.error("booking insert failed", error.message);
      throw new Error("Could not save your request. Please try again.");
    }
    return { ok: true };
  });
