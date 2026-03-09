import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import { useAuth } from "../context/AuthContext";
import clsx from "clsx";

type Tab = "login" | "signup";

export default function LoginSignUpPage() {
  const navigate = useNavigate();
  const { login, register, googleSignIn } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string>("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await login({ email: loginForm.email, password: loginForm.password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setStatus("idle");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await register({
        fullName: signupForm.fullName,
        email: signupForm.email,
        password: signupForm.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
      setStatus("idle");
    }
  };

  const handleGoogleSignIn = async () => {
    setStatus("submitting");
    setError("");
    try {
      await googleSignIn();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in with Google.");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-[28rem] mx-auto">
          {/* Tabs */}
          <div className="flex rounded-t-xl overflow-hidden border border-b-0 border-white/10 bg-slate-900/30 p-1">
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
              }}
              className={clsx(
                "flex-1 py-3 font-body text-sm font-semibold rounded-lg transition-colors",
                tab === "login"
                  ? "bg-brand-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("signup");
                setError("");
              }}
              className={clsx(
                "flex-1 py-3 font-body text-sm font-semibold rounded-lg transition-colors",
                tab === "signup"
                  ? "bg-brand-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Card */}
          <div className="rounded-b-xl border border-t-0 border-white/10 bg-slate-900/50 backdrop-blur-sm px-6 sm:px-8 py-8 shadow-xl">
            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5" noValidate>
                <h2 className="font-display text-2xl text-white">Welcome back</h2>
                <p className="text-slate-400 text-sm">
                  Sign in to manage your bookings and preferences.
                </p>
                <div>
                  <label htmlFor="login-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="login-password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
                    placeholder="Password"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-300" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Signing in…" : "Sign in"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-5" noValidate>
                <h2 className="font-display text-2xl text-white">Create account</h2>
                <p className="text-slate-400 text-sm">
                  Sign up to book stays and get the best offers.
                </p>
                <div>
                  <label htmlFor="signup-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={signupForm.fullName}
                    onChange={(e) =>
                      setSignupForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="signup-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signupForm.email}
                    onChange={(e) =>
                      setSignupForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    minLength={6}
                    value={signupForm.password}
                    onChange={(e) =>
                      setSignupForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
                    placeholder="Password (min 6 characters)"
                  />
                </div>
                <div>
                  <label htmlFor="signup-confirm" className="sr-only">
                    Confirm password
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    required
                    value={signupForm.confirmPassword}
                    onChange={(e) =>
                      setSignupForm((f) => ({
                        ...f,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/50"
                    placeholder="Confirm password"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-300" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Creating account…" : "Sign up"}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                or
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={status === "submitting"}
              className="w-full rounded-xl border border-white/10 bg-slate-800/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center">
            <Link
              to="/admin/login"
              className="text-slate-500 hover:text-slate-400 text-sm"
            >
              Admin? Sign in here
            </Link>
          </p>

          <p className="mt-4 text-center">
            <Link
              to="/"
              className="text-brand-400 hover:text-brand-300 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
