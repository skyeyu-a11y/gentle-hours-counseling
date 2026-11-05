import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Enquiries dashboard — Skye" },
      { name: "description", content: "Private list of booking enquiries." },
      { property: "og:title", content: "Enquiries dashboard — Skye" },
      { property: "og:description", content: "Private list of booking enquiries." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const STATUSES = ["pending", "confirmed", "cancelled"] as const;

function Admin() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
      return !!data;
    },
  });
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["requests"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("booking_requests").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function setStatus(id: string, status: string) {
    await supabase.from("booking_requests").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["requests"] });
  }
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Skye · Admin</p>
          <h1 className="mt-2 text-3xl">Enquiries & appointment requests</h1>
        </div>
        <button onClick={signOut} className="rounded-sm border border-foreground px-4 py-2 text-sm">Sign out</button>
      </div>
      {roleLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
      ) : !isAdmin ? (
        <p className="mt-10 text-sm text-muted-foreground">This account doesn't have admin access.</p>
      ) : isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No enquiries yet.</p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-sm border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary">
              <tr>{["Received", "Name", "Contact", "Format", "Preferred time", "Note", "Status"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-4 py-3">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.contact}</td>
                  <td className="px-4 py-3">{r.format}</td>
                  <td className="px-4 py-3">{r.preferred_slot ?? "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-muted-foreground">{r.note ?? "—"}</td>
                  <td className="px-4 py-3">
                    <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="rounded-sm border border-input bg-popover px-2 py-1 capitalize">
                      {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
