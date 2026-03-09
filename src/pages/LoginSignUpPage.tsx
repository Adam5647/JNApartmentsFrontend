import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSignInWithEmailLink } from "firebase/auth";
import Nav from "../components/Home/Nav";
import Footer from "../components/Home/Footer";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import clsx from "clsx";

type Tab = "login" | "signup";

export default function LoginSignUpPage() {
  const navigate = useNavigate();
  const { login, register, googleSignIn, sendEmailLink, completeEmailLinkSignIn } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string>("");
  const [completingLink, setCompletingLink] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailLinkEmail, setEmailLinkEmail] = useState("");
  const [emailLinkSent, setEmailLinkSent] = useState(false);

  // Complete sign-in when user returns from email link
  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) return;
    setCompletingLink(true);
    const email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      setError("Please enter your email below to complete sign-in.");
      setCompletingLink(false);
      setTab("login");
      window.history.replaceState({}, document.title, "/login");
      return;
    }
    completeEmailLinkSignIn(email, window.location.href)
      .then(() => {
        window.localStorage.removeItem("emailForSignIn");
        window.history.replaceState({}, document.title, "/login");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Could not complete sign-in.");
        setTab("login");
        window.history.replaceState({}, document.title, "/login");
      })
      .finally(() => setCompletingLink(false));
  }, [completeEmailLinkSignIn, navigate]);

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

  const handleSendEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailLinkEmail.trim()) {
      setError("Please enter your email.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await sendEmailLink(emailLinkEmail.trim());
      setEmailLinkSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send sign-in link.");
    }
    setStatus("idle");
  };

  if (completingLink) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Nav />
        <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 border border-brand-400/30 mb-6">
              <svg className="h-6 w-6 animate-spin text-brand-400" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p className="font-body text-slate-300">Completing sign-in…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav />
      <main className="pt-24 pb-20 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-[26rem] mx-auto">
          {/* Decorative header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl text-white tracking-tight">
              Welcome to JN Apartments
            </h1>
            <p className="mt-2 font-body text-slate-400 text-sm">
              Sign in or create an account to manage your stays
            </p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 p-1.5 shadow-lg shadow-black/20">
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
              }}
              className={clsx(
                "flex-1 py-3.5 font-body text-sm font-semibold rounded-xl transition-all duration-200",
                tab === "login"
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("signup");
                setError("");
              }}
              className={clsx(
                "flex-1 py-3.5 font-body text-sm font-semibold rounded-xl transition-all duration-200",
                tab === "signup"
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              Create account
            </button>
          </div>

          {/* Card */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md px-6 sm:px-8 py-8 shadow-xl shadow-black/30">
            {tab === "login" ? (
              <div className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-5" noValidate>
                  <h2 className="font-display text-xl text-white">Email & password</h2>
                  <div>
                    <label htmlFor="login-email" className="sr-only">Email</label>
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="login-password" className="sr-only">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                      placeholder="Password"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-300" role="alert">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
                  >
                    {status === "submitting" ? "Signing in…" : "Sign in"}
                  </button>
                </form>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                {/* Sign in with Email Link */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg text-white">Sign in with Email Link</h3>
                  {emailLinkSent ? (
                    <div className="rounded-xl bg-brand-500/10 border border-brand-400/20 px-4 py-4 text-center">
                      <p className="text-sm text-brand-200 font-medium">Check your inbox</p>
                      <p className="mt-1 text-xs text-slate-400">
                        We sent a sign-in link to <span className="text-slate-300">{emailLinkEmail}</span>. Click the link in that email to sign in.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setEmailLinkSent(false); setError(""); }}
                        className="mt-3 text-xs text-brand-300 hover:text-brand-200 font-medium"
                      >
                        Use a different email
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendEmailLink} className="space-y-3" noValidate>
                      <label htmlFor="email-link-email" className="sr-only">Email for sign-in link</label>
                      <input
                        id="email-link-email"
                        type="email"
                        required
                        value={emailLinkEmail}
                        onChange={(e) => setEmailLinkEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                        placeholder="Enter your email"
                      />
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full rounded-xl border border-white/10 bg-slate-800/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {status === "submitting" ? "Sending…" : "Send sign-in link"}
                      </button>
                    </form>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={status === "submitting"}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-5" noValidate>
                <h2 className="font-display text-xl text-white">Create account</h2>
                <p className="text-slate-400 text-sm">Sign up to book stays and get the best offers.</p>
                <div>
                  <label htmlFor="signup-name" className="sr-only">Full name</label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="signup-email" className="sr-only">Email</label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signupForm.email}
                    onChange={(e) => setSignupForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className="sr-only">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    minLength={6}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm((f) => ({ ...f, password: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    placeholder="Password (min 6 characters)"
                  />
                </div>
                <div>
                  <label htmlFor="signup-confirm" className="sr-only">Confirm password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    required
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3.5 text-slate-100 placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                    placeholder="Confirm password"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-300" role="alert">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20"
                >
                  {status === "submitting" ? "Creating account…" : "Create account"}
                </button>

                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={status === "submitting"}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}
          </div>

          <p className="mt-6 text-center">
            <Link to="/" className="text-brand-400 hover:text-brand-300 text-sm font-medium">
              ← Back to Home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
