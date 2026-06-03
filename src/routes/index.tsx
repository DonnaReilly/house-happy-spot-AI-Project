import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { properties, vibeFilters, type Vibe } from "@/data/properties";
import { PlaygroundMap } from "@/components/PlaygroundMap";
import { PropertyDetail } from "@/components/PropertyDetail";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plotly — Real estate, but make it a playground" },
      { name: "description", content: "Explore homes on a whimsical, illustrated city map. Find your vibe, not just your square footage." },
      { property: "og:title", content: "Plotly — Real estate, but make it a playground" },
      { property: "og:description", content: "An illustrated city map of homes with personality. Pick a vibe and start exploring." },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<Vibe | "all">("all");
  const [selectedId, setSelectedId] = useState<string>(properties[2].id);
  const { user, signOut } = useAuth();

  const filteredIds = useMemo(
    () => new Set(properties.filter(p => filter === "all" || p.vibe === filter).map(p => p.id)),
    [filter]
  );

  const selected = properties.find(p => p.id === selectedId)!;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b-4 border-ink">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-sunset border-2 border-ink shadow-pop text-xl">🗺️</span>
            <span className="font-display text-2xl leading-none">plotly</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a className="hover:text-primary transition" href="#">Explore</a>
            <a className="hover:text-primary transition" href="#">Saved</a>
            <a className="hover:text-primary transition" href="#">Agents</a>
            <a className="hover:text-primary transition" href="#">Journal</a>
          </nav>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:grid place-items-center h-9 w-9 rounded-full bg-gradient-dusk text-cream font-display border-2 border-ink">
                {(user.email ?? "?").charAt(0).toUpperCase()}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-full bg-card text-foreground px-4 py-2 text-sm font-bold border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition inline-flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-ink text-cream px-4 py-2 text-sm font-bold border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>

      {/* Hero: asymmetric editorial */}
      <section className="mx-auto max-w-[1500px] px-6 pt-10 pb-6">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="h-2 w-2 rounded-full bg-magenta animate-pulse" /> Today's drop · 8 homes
            </p>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] mt-4 text-balance">
              Houses with <span className="italic text-magenta">personality</span>,<br/>
              on a map that <span className="italic text-violet">plays back</span>.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pl-8">
            <p className="text-lg text-foreground/70 text-balance">
              Forget endless scrolling and identical listings. Plotly is a hand-drawn city where every pin is a place
              with a story — pick a vibe, prod a pin, find your weird little home.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-full bg-gradient-sunset text-cream px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-ink shadow-pop hover:-translate-y-0.5 transition">
                Start exploring
              </button>
              <button className="rounded-full bg-cream px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition">
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vibe filter chips */}
      <section className="mx-auto max-w-[1500px] px-6 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="font-display text-xl mr-2 shrink-0">Vibe →</span>
          {vibeFilters.map(v => {
            const active = filter === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setFilter(v.id)}
                className={`shrink-0 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-ink text-cream -translate-y-0.5 shadow-pop"
                    : "bg-card hover:-translate-y-0.5 hover:shadow-pop"
                }`}
              >
                <span className="mr-1.5">{v.emoji}</span>{v.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Map + detail (asymmetric 60/40) */}
      <section className="mx-auto max-w-[1500px] px-6 pb-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 h-[560px] lg:h-[680px]">
            <PlaygroundMap
              selectedId={selectedId}
              onSelect={setSelectedId}
              filteredIds={filteredIds}
            />
          </div>
          <aside className="col-span-12 lg:col-span-4 h-[560px] lg:h-[680px]">
            <PropertyDetail p={selected} />
          </aside>
        </div>
      </section>

      {/* Strip: marquee-ish footer band */}
      <section className="border-y-4 border-ink bg-gradient-dusk text-cream overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap py-5 font-display text-3xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-10 shrink-0">
              <span>🏡 find your weird</span>
              <span>✺</span>
              <span>🗺️ map {">"} list, always</span>
              <span>✺</span>
              <span>🪩 homes with stories</span>
              <span>✺</span>
              <span>🌵 vibes over square feet</span>
              <span>✺</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-[1500px] px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Plotly. Drawn by hand, mostly.</p>
        <p>Made for people who hate spreadsheets.</p>
      </footer>
    </main>
  );
}
