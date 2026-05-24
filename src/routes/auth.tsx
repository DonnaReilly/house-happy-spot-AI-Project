import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Plotly" },
      { name: "description", content: "Sign in to save your favorite homes on Plotly." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // If already signed in, bounce home
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        setInfo("Check your email to confirm your account, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        setError(result.error.message ?? "Google sign-in failed");
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background grid lg:grid-cols-2">
      {/* Left: poster */}
      <aside className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-sunset text-cream overflow-hidden border-r-4 border-ink">
        <div className="absolute -top-10 -right-10 text-[14rem] opacity-20 select-none">🗺️</div>
        <Link to="/" className="flex items-center gap-2 relative">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-cream border-2 border-ink text-xl">🗺️</span>
          <span className="font-display text-2xl text-cream">plotly</span>
        </Link>
        <div className="relative">
          <h1 className="font-display text-6xl leading-[0.95] text-balance">
            Save the<br/>homes that <em className="text-cream">spark joy</em>.
          </h1>
          <p className="mt-4 text-cream/90 max-w-md">
            Sign in to bookmark pins, get daily drops in your favorite neighborhoods, and chat with hosts who own a literal tiny castle.
          </p>
        </div>
        <div className="relative flex gap-3 text-3xl">
          <span className="animate-float">🌵</span>
          <span className="animate-float" style={{ animationDelay: "0.6s" }}>🪩</span>
          <span className="animate-float" style={{ animationDelay: "1.2s" }}>🍄</span>
          <span className="animate-float" style={{ animationDelay: "1.8s" }}>🏰</span>
        </div>
      </aside>

      {/* Right: form */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-sunset border-2 border-ink shadow-pop text-xl">🗺️</span>
            <span className="font-display text-2xl">plotly</span>
          </Link>

          <div className="inline-flex items-center gap-1 rounded-full border-2 border-ink p-1 bg-card mb-6">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(null); setInfo(null); }}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  mode === m ? "bg-ink text-cream" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <h2 className="font-display text-4xl leading-tight">
            {mode === "signin" ? "Welcome back." : "Make yourself at home."}
          </h2>
          <p className="text-muted-foreground mt-1">
            {mode === "signin" ? "Pick up where you left off." : "Takes about 12 seconds. Promise."}
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-card border-2 border-ink px-5 py-3 text-sm font-bold hover:-translate-y-0.5 hover:shadow-pop transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@goodvibes.house"
                className="w-full rounded-xl border-2 border-ink bg-card px-4 py-3 text-sm focus:outline-none focus:-translate-y-0.5 focus:shadow-pop transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 border-ink bg-card px-4 py-3 text-sm focus:outline-none focus:-translate-y-0.5 focus:shadow-pop transition"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border-2 border-destructive/30 rounded-xl px-3 py-2">{error}</p>
            )}
            {info && (
              <p className="text-sm text-foreground bg-muted border-2 border-ink/20 rounded-xl px-3 py-2">{info}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-ink text-cream px-5 py-3 text-sm font-bold uppercase tracking-wider border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition disabled:opacity-60"
            >
              {loading ? "One sec…" : mode === "signin" ? "Sign in →" : "Create account →"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing you agree to our totally-made-up terms and a vow to be kind.
          </p>
        </div>
      </section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.4 29.4 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.4 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.4 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.1 0 9.8-1.9 13.3-5.1l-6.1-5c-2 1.4-4.5 2.2-7.2 2.2-5.4 0-9.9-3.5-11.5-8.3l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.3l6.1 5c-.4.4 6.7-4.9 6.7-14.3 0-1.2-.1-2.4-.3-3.5z"/>
    </svg>
  );
}
