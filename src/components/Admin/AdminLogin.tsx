import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { isAuthenticated, login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string>("");

  if (isAuthenticated) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await login({ email: form.email, password: form.password });
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setStatus("idle");
    }
  };

  const handleGoogleSignIn = async () => {
    setStatus("submitting");
    setError("");
    try {
      await googleSignIn();
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in with Google.");
      setStatus("idle");
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white">
      <h1 className="font-display text-3xl">Admin portal</h1>
      <p className="mt-4 text-sm text-slate-300/70">Sign in with an admin account to access the dashboard.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-400"
          placeholder="Admin email"
        />
        <input
          type="password"
          required
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className="w-full rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-400"
          placeholder="Password"
        />
        {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Signing in..." : "Sign in"}
        </button>
        <button
          type="button"
          className="w-full mt-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleGoogleSignIn}
          disabled={status === "submitting"}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
