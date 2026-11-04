import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { submitBookingRequest, bookingSchema } from "@/lib/booking.functions";
import heroImg from "@/assets/hero-room.jpg";
import portraitImg from "@/assets/portrait-placeholder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skye — Individual Counselling" },
      {
        name: "description",
        content:
          "A quiet space for individual counselling. Learn about the approach, session formats and example availability, and send a booking enquiry.",
      },
      { property: "og:title", content: "Skye — Individual Counselling" },
      {
        property: "og:description",
        content: "Learn about the counselling approach, session formats and send a booking enquiry.",
      },
    ],
  }),
  component: Index,
});

/** Replaceable placeholder marker */
function T({ children }: { children: ReactNode }) {
  return <span className="tbd">{children}</span>;
}

const NAV = [
  ["About", "#about"],
  ["Sessions", "#sessions"],
  ["Topics", "#topics"],
  ["Availability", "#availability"],
  ["Contact", "#booking"],
] as const;

/* Edit these example slots by hand. They are NOT live availability. */
const TIMEZONE = "Macau time (GMT+8)";
const EXAMPLE_WEEK: { day: string; date: string; slots: string[] }[] = [
  { day: "Mon", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
  { day: "Tue", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
  { day: "Wed", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
  { day: "Thu", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
  { day: "Fri", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
  { day: "Sat", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
  { day: "Sun", date: "[Date]", slots: ["10:00–10:50", "11:00–11:50"] },
];

function Section({ id, num, label, title, children }: { id: string; num: string; label: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-20 md:py-28 fade-in">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">{num} — {label}</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-4xl">{title}</h2>
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Index() {
  const [menu, setMenu] = useState(false);
  const [slot, setSlot] = useState<string>("");

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-serif text-lg">Skye</a>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {NAV.slice(0, 4).map(([l, h]) => (
              <a key={h} href={h} className="text-muted-foreground transition-colors hover:text-foreground">{l}</a>
            ))}
            <a href="#booking" className="rounded-sm border border-foreground px-4 py-2 transition-colors hover:bg-primary hover:text-primary-foreground">
              Send an enquiry
            </a>
          </nav>
          <button className="text-sm md:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu}>
            {menu ? "Close" : "Menu"}
          </button>
        </div>
        {menu && (
          <nav className="border-t border-border px-6 py-4 md:hidden">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block py-3 text-base">{l}</a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:py-24">
        <div className="fade-in md:col-span-5 md:pt-10">
          <p className="eyebrow">Individual counselling · <T>City / Online</T></p>
          <h1 className="mt-6 text-4xl leading-[1.15] md:text-5xl">
            Give yourself a little time to hear what is happening inside.
          </h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            This is a calm, unhurried space where we talk at your pace. Together we look at what feels
            heavy or unclear right now, without judgement and without rushing towards answers.
          </p>
          <div className="mt-8 border-l border-sage pl-4 text-sm leading-relaxed">
            <p className="font-medium">Skye</p>
            <p className="text-muted-foreground">A person in progress · Opening to listen to you</p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#sessions" className="rounded-sm bg-primary px-6 py-3 text-center text-sm text-primary-foreground transition-opacity hover:opacity-85">
              How sessions work
            </a>
            <a href="#availability" className="rounded-sm border border-foreground px-6 py-3 text-center text-sm transition-colors hover:bg-secondary">
              See example times
            </a>
          </div>
        </div>
        <div className="fade-in md:col-span-7">
          <img src={heroImg} alt="A quiet room with natural light, a stone vase and tea cups" width={1600} height={1104} className="aspect-[4/3] w-full rounded-sm object-cover" />
        </div>
      </section>

      {/* About */}
      <Section id="about" num="01" label="About" title="About me">
        <div className="grid gap-10 md:grid-cols-8">
          <div className="md:col-span-3">
            <img src={portraitImg} alt="Placeholder — replace with the counsellor's portrait" loading="lazy" width={912} height={1152} className="aspect-[4/5] w-full rounded-sm object-cover" />
            <p className="mt-2 text-xs text-muted-foreground">Placeholder image — replace with your portrait.</p>
          </div>
          <div className="space-y-8 md:col-span-5">
            {[
              ["Training & background", <>Degree: UCD Bachelor of Science.</>],
              ["Approach", <>Person-Centred Therapy.</>],
              ["How I work", <>I value honest conversations, mutual respect, and the freedom to see things from different perspectives. I believe that growth does not always happen in a straight line, and that everyone deserves the time and space to find their own way.</>],
              ["Who I work with", <>Adults 18+.</>],
            ].map(([h, b]) => (
              <div key={h as string} className="border-b border-border pb-6">
                <h3 className="text-xl">{h}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Sessions */}
      <Section id="sessions" num="02" label="Sessions" title="How sessions work">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {[
            ["i", "Format", <>Online via Zoom or WeChat.</>],
            ["ii", "Length", <>Each session lasts 50 minutes.</>],
            ["iii", "Frequency & first contact", <>Usually weekly. We start with a short 15-minute call to see whether working together feels right.</>],
            ["iv", "Fees & changes", <>Fee: $1 per session. Please give 48 hours notice to reschedule or cancel.</>],
          ].map(([n, h, b]) => (
            <div key={n as string} className="bg-card p-8 transition-colors hover:bg-secondary">
              <p className="font-serif text-sage italic">{n}</p>
              <h3 className="mt-3 text-xl">{h}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Topics */}
      <Section id="topics" num="03" label="Topics" title="What we might talk about">
        <p className="leading-relaxed text-muted-foreground">
          You don't need a clear reason or the right words to begin. Some things people bring include:
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {["Stress and low mood", "Relationships with others", "Getting to know yourself", "Intimate relationships", "Life changes and transitions", "Work and study pressure"].map((t) => (
            <li key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm">{t}</li>
          ))}
          </ul>
        <div className="mt-12 rounded-sm bg-secondary p-6 text-sm leading-relaxed">
          <h3 className="text-lg">When another service may fit better</h3>
          <p className="mt-2 text-muted-foreground">
            This practice may not be the right place if you need urgent crisis support, round-the-clock
            care, or medical or psychiatric assessment. In those situations I'm glad to help you find
            a more suitable service.
          </p>
        </div>
      </Section>

      {/* Availability */}
      <Section id="availability" num="04" label="Availability" title="Example times">
        <p role="note" className="rounded-sm border border-dashed border-placeholder-foreground bg-placeholder p-4 text-sm text-placeholder-foreground">
          These times are examples only, not live availability. Choosing a time sends a request — every
          time is confirmed personally before anything is booked.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">Time zone: {TIMEZONE}</p>
        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-7">
          {EXAMPLE_WEEK.map((d) => (
            <div key={d.day} className="bg-card p-4">
              <p className="text-sm font-medium">{d.day}</p>
              <p className="text-xs text-muted-foreground">{d.date}</p>
              <div className="mt-3 flex flex-wrap gap-2 sm:flex-col">
                {d.slots.length === 0 && <p className="text-xs text-muted-foreground">—</p>}
                {d.slots.map((s) => {
                  const v = `${d.day} ${d.date} ${s} (${TIMEZONE})`;
                  const on = slot === v;
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSlot(on ? "" : v)}
                      className={`rounded-sm border px-2 py-2 text-xs transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-sage hover:bg-accent"}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {slot && <p className="mt-4 text-sm">Preferred time selected: <span className="font-medium">{slot}</span> — continue to the form below.</p>}
      </Section>

      {/* Form */}
      <Section id="booking" num="05" label="Enquiry" title="Send a booking enquiry">
        <BookingForm slot={slot} setSlot={setSlot} />
      </Section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-sm border border-border bg-background p-6 text-sm leading-relaxed">
            <p className="font-medium">If you need help right now</p>
            <p className="mt-1 text-muted-foreground">
              This website and practice cannot provide emergency or crisis support. If you or someone
              else is in immediate danger, please contact your local emergency services, or call 988
              for the crisis line.
            </p>
          </div>
          <div className="mt-10 grid gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="eyebrow">Contact</p>
              <p className="mt-3">Email: <a href="mailto:jiyue.yu@gmail.com" className="underline underline-offset-4">jiyue.yu@gmail.com</a></p>
              <p className="mt-1">Phone: 15810778295</p>
            </div>
            <div>
              <p className="eyebrow">Elsewhere</p>
              <p className="mt-3">Instagram: Skyegtt_</p>
            </div>
            <div>
              <p className="eyebrow">Privacy</p>
              <p className="mt-3 text-muted-foreground">Enquiry details are used only to arrange sessions. <T>Full privacy notice</T></p>
            </div>
          </div>
          <p className="mt-12 text-xs text-muted-foreground">© {new Date().getFullYear()} Skye. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function BookingForm({ slot, setSlot }: { slot: string; setSlot: (s: string) => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; contact?: string; format?: string }>({});
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      contact: String(fd.get("contact") ?? ""),
      format: String(fd.get("format") ?? ""),
      preferredSlot: String(fd.get("preferredSlot") ?? ""),
      note: String(fd.get("note") ?? ""),
    };
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] = i.path[0] === "format" ? "Please choose a format" : i.message;
      setErrors(errs as typeof errors);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submitBookingRequest({ data: parsed.data });
      setStatus("sent");
      setSlot("");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-sm border border-sage bg-accent p-8 text-accent-foreground">
        <h3 className="text-2xl">Thank you — your enquiry has been received.</h3>
        <p className="mt-3 leading-relaxed">
          This is not yet a confirmed appointment. I'll reply within <T>2 working days</T> to confirm
          a time or suggest alternatives.
        </p>
        <button className="mt-6 text-sm underline underline-offset-4" onClick={() => setStatus("idle")}>Send another enquiry</button>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-sm border border-input bg-popover px-4 py-3 text-base outline-none transition-colors focus:border-sage focus:ring-1 focus:ring-ring";

  return (
    <div className="grid gap-10 md:grid-cols-8">
      <form onSubmit={onSubmit} noValidate className="space-y-6 md:col-span-5">
        <div>
          <label htmlFor="name" className="text-sm">What should I call you? *</label>
          <input id="name" name="name" maxLength={60} className={field} autoComplete="nickname" />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact" className="text-sm">Email, phone or WeChat *</label>
          <input id="contact" name="contact" maxLength={120} className={field} />
          {errors.contact && <p className="mt-1 text-sm text-destructive">{errors.contact}</p>}
        </div>
        <fieldset>
          <legend className="text-sm">Preferred format *</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[["online", "Online"], ["in-person", "In person"], ["either", "Either"]].map(([v, l]) => (
              <label key={v} className="flex cursor-pointer items-center justify-center rounded-sm border border-input px-3 py-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                <input type="radio" name="format" value={v} className="sr-only" />
                {l}
              </label>
            ))}
          </div>
          {errors.format && <p className="mt-1 text-sm text-destructive">{errors.format}</p>}
        </fieldset>
        <div>
          <label htmlFor="preferredSlot" className="text-sm">Preferred time (optional)</label>
          <input id="preferredSlot" name="preferredSlot" maxLength={200} value={slot} onChange={(e) => setSlot(e.target.value)} placeholder="Pick above, or describe e.g. weekday evenings" className={field} />
        </div>
        <div>
          <label htmlFor="note" className="text-sm">Scheduling notes (optional)</label>
          <textarea id="note" name="note" rows={3} maxLength={500} placeholder="e.g. best way or time to reach you. Please don't share health details here." className={field} />
        </div>
        {status === "error" && <p className="text-sm text-destructive">{msg}</p>}
        <button type="submit" disabled={status === "sending"} className="w-full rounded-sm bg-primary px-6 py-4 text-sm text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </form>
      <aside className="space-y-8 text-sm leading-relaxed md:col-span-3">
        <div>
          <p className="eyebrow">What happens next</p>
          <ol className="mt-3 space-y-2 text-muted-foreground">
            <li>1. Your enquiry is received — nothing is booked yet.</li>
            <li>2. I reply within <T>2 working days</T>.</li>
            <li>3. We arrange a short first conversation.</li>
            <li>4. If it feels right, we agree a time.</li>
          </ol>
        </div>
        <div className="border-t border-border pt-6">
          <p className="eyebrow">Privacy</p>
          <p className="mt-3 text-muted-foreground">
            Your details are used only to arrange sessions. Please don't include sensitive personal or
            health details here — we can talk about those in person.
          </p>
        </div>
      </aside>
    </div>
  );
}
