import { useEffect, useMemo, useState } from "react";
import { generateAiText } from "../../lib/ai";
import { deleteInquiry, getAllInquiries, updateInquiryStatus } from "../../lib/adminInquiries";
import type { InquiryResponse } from "../../types/api";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<InquiryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllInquiries()
      .then(setInquiries)
      .catch(() => setError("Failed to load inquiries."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.fullName.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        (inq.subject || "").toLowerCase().includes(search.toLowerCase()) ||
        inq.message.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || inq.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, search, statusFilter]);

  const handleStatus = async (ticketId: string, status: string) => {
    setUpdatingId(ticketId);
    try {
      await updateInquiryStatus(ticketId, status);
      setInquiries((prev) => prev.map((inq) => (inq.ticketId === ticketId ? { ...inq, status } : inq)));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (ticketId: string) => {
    setDeletingId(ticketId);
    try {
      await deleteInquiry(ticketId);
      setInquiries((prev) => prev.filter((inq) => inq.ticketId !== ticketId));
    } finally {
      setDeletingId(null);
    }
  };

  const draftReply = async (inquiry: InquiryResponse) => {
    setAiLoadingId(inquiry.ticketId);
    setAiError("");
    try {
      const prompt =
        `Write a concise, warm reply for a serviced-apartment inquiry. Keep under 140 words. ` +
        `Ask for missing details, propose next steps, and avoid hard guarantees.\n` +
        `Inquiry status: ${inquiry.status}.\n` +
        `From: ${inquiry.fullName} <${inquiry.email}>.\n` +
        `Subject: ${inquiry.subject || "(none)"}.\n` +
        `Message: ${inquiry.message}`;

      const text = await generateAiText(prompt, {
        system: "You are JN Apartments concierge. Be specific, polite, and action-oriented.",
        maxOutputTokens: 256,
        temperature: 0.4
      });

      setDrafts((prev) => ({ ...prev, [inquiry.ticketId]: text }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Unable to draft reply.");
    } finally {
      setAiLoadingId(null);
    }
  };

  const copyDraft = async (ticketId: string) => {
    const text = drafts[ticketId];
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // ignore clipboard errors
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-white">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl">Guest inquiries</h2>
          <p className="mt-1 text-sm text-slate-300/70">Search, triage, and draft replies with Google AI free tier.</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            className="w-full rounded-md bg-slate-900/80 px-3 py-2 text-sm text-white md:w-64"
            placeholder="Search name, email, subject"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full rounded-md bg-slate-900/80 px-3 py-2 text-sm text-white md:w-44"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? <p className="mt-6 text-sm text-slate-200">Loading inquiries...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {aiError ? <p className="mt-2 text-xs text-red-300">{aiError}</p> : null}

      <div className="mt-6 space-y-4">
        {filtered.map((inq) => (
          <div key={inq.ticketId} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <p className="text-sm text-slate-200">
                  <span className="font-semibold text-white">{inq.fullName}</span> · {inq.email}
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{inq.subject || "No subject"}</p>
                <p className="text-xs text-slate-400">Received {new Date(inq.receivedAtUtc).toLocaleString()}</p>
                <p className="mt-2 text-sm text-slate-100">{inq.message}</p>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <select
                  className="w-full rounded-md bg-slate-800 px-3 py-2 text-xs text-white md:w-40"
                  value={inq.status}
                  onChange={(e) => handleStatus(inq.ticketId, e.target.value)}
                  disabled={updatingId === inq.ticketId}
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
                <button
                  className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20 disabled:opacity-60"
                  onClick={() => handleDelete(inq.ticketId)}
                  disabled={deletingId === inq.ticketId}
                >
                  {deletingId === inq.ticketId ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                className="rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-400 disabled:opacity-60"
                onClick={() => draftReply(inq)}
                disabled={aiLoadingId === inq.ticketId}
              >
                {aiLoadingId === inq.ticketId ? "Drafting..." : "Draft reply"}
              </button>
              <button
                className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20 disabled:opacity-60"
                onClick={() => copyDraft(inq.ticketId)}
                disabled={!drafts[inq.ticketId]}
              >
                Copy draft
              </button>
              <span className="text-xs text-slate-400">AI drafts stay local; edit before sending.</span>
            </div>

            {drafts[inq.ticketId] ? (
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-950/70 p-3 text-xs text-slate-100">{drafts[inq.ticketId]}</pre>
            ) : null}
          </div>
        ))}

        {!loading && filtered.length === 0 ? (
          <p className="text-sm text-slate-300/80">No inquiries match your filters.</p>
        ) : null}
      </div>
    </div>
  );
}
