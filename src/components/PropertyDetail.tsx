import type { Property } from "@/data/properties";
import { Bed, Bath, Maximize2, Heart, Sparkles } from "lucide-react";

const colorMap = {
  sunset: "var(--sunset)",
  tangerine: "var(--tangerine)",
  magenta: "var(--magenta)",
  violet: "var(--violet)",
} as const;

export function PropertyDetail({ p }: { p: Property }) {
  const color = colorMap[p.color];
  return (
    <article className="relative flex h-full flex-col gap-5 rounded-3xl border-4 border-ink bg-card p-6 shadow-pop">
      <div
        className="relative grid h-44 place-items-center overflow-hidden rounded-2xl border-2 border-ink"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, black 0%, transparent 50%)" }} />
        <span className="relative text-7xl drop-shadow-lg">{p.emoji}</span>
        <span className="absolute top-3 left-3 rounded-full bg-cream border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wider">
          {p.vibeLabel}
        </span>
        <button className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-cream border-2 border-ink hover:scale-110 transition">
          <Heart className="h-4 w-4 text-ink" />
        </button>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.neighborhood}</p>
        <h2 className="font-display text-4xl leading-tight mt-1">{p.title}</h2>
        <p className="mt-3 text-sm text-foreground/80 text-balance">{p.blurb}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat icon={<Bed className="h-4 w-4" />} label="beds" value={p.beds} />
        <Stat icon={<Bath className="h-4 w-4" />} label="baths" value={p.baths} />
        <Stat icon={<Maximize2 className="h-4 w-4" />} label="sqft" value={p.sqft.toLocaleString()} />
      </div>

      <div className="flex items-start gap-2 rounded-2xl border-2 border-dashed border-ink/30 bg-muted/50 p-3">
        <Sparkles className="h-4 w-4 mt-0.5 shrink-0" style={{ color }} />
        <p className="text-xs text-foreground/70 italic">{p.funFact}</p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">asking</p>
          <p className="font-display text-3xl">${(p.price / 1000).toFixed(0)}<span className="text-lg">k</span></p>
        </div>
        <button
          className="rounded-full border-2 border-ink bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-cream transition hover:-translate-y-0.5 hover:shadow-pop"
        >
          Book a peek →
        </button>
      </div>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-xl border-2 border-ink/15 bg-muted/40 p-3">
      <div className="flex items-center gap-1 text-muted-foreground">{icon}<span className="text-[10px] uppercase tracking-wider">{label}</span></div>
      <p className="font-display text-xl mt-1">{value}</p>
    </div>
  );
}
