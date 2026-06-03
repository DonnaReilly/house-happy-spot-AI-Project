import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { properties, vibeFilters, type Vibe } from "@/data/properties";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Plotly" },
      { name: "description", content: "Browse every home on the Plotly map in a playful gallery." },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [filter, setFilter] = useState<Vibe | "all">("all");
  const list = useMemo(
    () => properties.filter((p) => filter === "all" || p.vibe === filter),
    [filter]
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 pt-10 pb-6">
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-magenta animate-pulse" /> Gallery view
        </p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mt-4 text-balance">
          Every <span className="italic text-magenta">weird little home</span>, in one place.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          The map's the soul, but sometimes you just want to scroll. Pick a vibe and dig in.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="font-display text-xl mr-2 shrink-0">Vibe →</span>
          {vibeFilters.map((v) => {
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
                <span className="mr-1.5">{v.emoji}</span>
                {v.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <article
              key={p.id}
              className={`relative rounded-3xl border-2 border-ink bg-card p-6 shadow-pop hover:-translate-y-1 transition ${
                i % 5 === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-sunset border-2 border-ink text-3xl">
                  {p.emoji}
                </span>
                <span className="rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {p.vibeLabel}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-foreground/60">
                {p.neighborhood}
              </p>
              <h2 className="font-display text-3xl leading-tight mt-1">{p.title}</h2>
              <p className="mt-2 text-foreground/70">{p.blurb}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-2xl">${p.price.toLocaleString()}</span>
                <Link
                  to="/"
                  className="rounded-full bg-ink text-cream px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-ink hover:-translate-y-0.5 hover:shadow-pop transition"
                >
                  See on map →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
