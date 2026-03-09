import { useState } from "react";
import { generateAiText } from "../../lib/ai";

export default function AdminMaintenance() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("general");
  const [aiResult, setAiResult] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const runTriage = async () => {
    setAiLoading(true);
    setAiError("");
    setAiResult("");
    const prompt =
      `Classify and triage a maintenance issue for a serviced apartment. ` +
      `Return severity (critical/major/minor), priority (P0-P3), immediate steps, owner (maintenance/electrical/plumbing/housekeeping/it), and ETA guidance. ` +
      `Keep under 120 words. Avoid promising technician arrival times.\n` +
      `Category: ${category}. Location: ${location || "unspecified"}.\n` +
      `Issue: ${description || "(no description provided)"}.`;

    try {
      const text = await generateAiText(prompt, {
        system: "You are a pragmatic facilities dispatcher for JN Apartments. Be concise and safety-first.",
        maxOutputTokens: 256,
        temperature: 0.35
      });
      setAiResult(text);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Unable to triage issue.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-white">
      <h2 className="font-display text-2xl">Maintenance triage</h2>
      <p className="mt-3 text-sm text-slate-300/70">Paste guest or staff reports to get quick severity, ownership, and first-step guidance.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
          Location / unit
          <input
            className="rounded-md bg-slate-900/80 px-3 py-2 text-sm text-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Example: Tower A, unit 12B"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
          Category
          <select
            className="rounded-md bg-slate-900/80 px-3 py-2 text-sm text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="appliance">Appliance</option>
            <option value="housekeeping">Housekeeping</option>
            <option value="it">IT/Connectivity</option>
            <option value="safety">Safety/Fire</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block text-xs uppercase tracking-[0.25em] text-slate-400">
        Issue description
        <textarea
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: Water leaking under kitchen sink; guest reports steady drip since morning."
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          className="rounded-full bg-brand-500 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-400 disabled:opacity-60"
          onClick={runTriage}
          disabled={aiLoading}
        >
          {aiLoading ? "Assessing..." : "AI triage"}
        </button>
        <span className="text-xs text-slate-400">Uses Google AI free tier; keep sensitive data minimal.</span>
      </div>

      {aiError ? <p className="mt-3 text-sm text-red-300">{aiError}</p> : null}
      {aiResult ? (
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100">{aiResult}</pre>
      ) : null}
    </div>
  );
}
