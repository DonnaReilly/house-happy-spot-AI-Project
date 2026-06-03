import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/hooks/use-auth";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved — Plotly" },
      { name: "description", content: "Your favorite homes, kept in one cozy little drawer." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { user, loading } = useAuth();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 pt-10 pb-20">
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
          <Heart className="h-3 w-3 fill-magenta text-magenta" /> Your stash
        </p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mt-4 text-balance">
          Homes you <span className="italic text-magenta">double-tapped</span>.
        </h1>

        <div className="mt-10 rounded-3xl border-2 border-ink bg-card p-10 shadow-pop max-w-2xl">
          {loading ? (
            <p className="text-foreground/60">Checking your stash…</p>
          ) : user ? (
            <>
              <div className="grid place-items-center h-20 w-20 rounded-2xl bg-gradient-sunset border-2 border-ink text-4xl mb-5">
                💌
              </div>
              <h2 className="font-display text-3xl">No saves yet</h2>
              <p className="mt-2 text-foreground/70">
                Tap the heart on any home and it'll land here. We'll keep it warm.
              </p>
              <Link
                to="/explore"
                className="inline-block mt-6 rounded-full bg-ink text-cream px-5 py-3 text-sm font-bold uppercase tracking-wider border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition"
              >
                Browse the gallery →
              </Link>
            </>
          ) : (
            <>
              <div className="grid place-items-center h-20 w-20 rounded-2xl bg-gradient-dusk border-2 border-ink text-4xl mb-5">
                🔑
              </div>
              <h2 className="font-display text-3xl">Sign in to start saving</h2>
              <p className="mt-2 text-foreground/70">
                Your favorites follow you across devices once you're signed in.
              </p>
              <Link
                to="/auth"
                className="inline-block mt-6 rounded-full bg-ink text-cream px-5 py-3 text-sm font-bold uppercase tracking-wider border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition"
              >
                Sign in →
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
