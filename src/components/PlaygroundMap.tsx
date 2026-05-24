import { properties, type Property } from "@/data/properties";

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  filteredIds: Set<string>;
}

const colorMap = {
  sunset: "var(--sunset)",
  tangerine: "var(--tangerine)",
  magenta: "var(--magenta)",
  violet: "var(--violet)",
} as const;

export function PlaygroundMap({ selectedId, onSelect, filteredIds }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-ink shadow-pop bg-gradient-to-br from-[oklch(0.95_0.05_80)] via-[oklch(0.92_0.08_50)] to-[oklch(0.88_0.12_350)]">
      {/* Decorative map blobs (parks, water) */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="oklch(0.18 0.03 280 / 0.06)" strokeWidth="0.2"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* park */}
        <path d="M5,55 Q15,40 30,48 T55,52 Q60,70 40,78 T10,72 Z" fill="oklch(0.82 0.14 145 / 0.55)" />
        {/* water */}
        <path d="M62,5 Q78,15 92,8 L100,0 L100,30 Q85,35 70,28 Q60,22 62,5 Z" fill="oklch(0.78 0.12 230 / 0.6)" />
        {/* roads */}
        <path d="M0,40 Q50,30 100,55" stroke="oklch(1 0 0 / 0.7)" strokeWidth="1.2" fill="none" strokeDasharray="2 1.5"/>
        <path d="M30,0 Q35,50 50,100" stroke="oklch(1 0 0 / 0.7)" strokeWidth="1.2" fill="none" strokeDasharray="2 1.5"/>
        <path d="M75,0 Q70,55 90,100" stroke="oklch(1 0 0 / 0.5)" strokeWidth="0.8" fill="none" strokeDasharray="1.5 1"/>
      </svg>

      {/* Floating clouds */}
      <div className="pointer-events-none absolute left-[12%] top-[8%] text-4xl animate-float" style={{ ["--r" as never]: "-4deg" }}>☁️</div>
      <div className="pointer-events-none absolute right-[20%] top-[60%] text-3xl animate-float" style={{ ["--r" as never]: "6deg", animationDelay: "1.5s" }}>🦩</div>
      <div className="pointer-events-none absolute left-[55%] top-[12%] text-2xl animate-float" style={{ animationDelay: "0.8s" }}>🎈</div>
      <div className="pointer-events-none absolute left-[8%] bottom-[8%] text-3xl animate-float" style={{ ["--r" as never]: "-8deg", animationDelay: "2.2s" }}>🌳</div>

      {/* Neighborhood labels */}
      <Label x={28} y={62} text="THE HOLLOW" rotate={-4} />
      <Label x={75} y={15} text="THE QUAY" rotate={6} />
      <Label x={20} y={28} text="SUNBAKED" rotate={2} />
      <Label x={82} y={88} text="SKYLINE" rotate={-3} />

      {/* Pins */}
      {properties.map((p, i) => (
        <Pin
          key={p.id}
          p={p}
          selected={selectedId === p.id}
          dimmed={!filteredIds.has(p.id)}
          onClick={() => onSelect(p.id)}
          delay={i * 80}
        />
      ))}

      {/* Compass */}
      <div className="absolute right-4 bottom-4 grid place-items-center h-14 w-14 rounded-full bg-cream border-2 border-ink shadow-pop font-display text-ink">
        <span className="text-xs leading-none">N</span>
      </div>
    </div>
  );
}

function Label({ x, y, text, rotate }: { x: number; y: number; text: string; rotate: number }) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-display text-[10px] sm:text-xs tracking-[0.25em] text-ink/60"
      style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) rotate(${rotate}deg)` }}
    >
      {text}
    </div>
  );
}

function Pin({
  p, selected, dimmed, onClick, delay,
}: { p: Property; selected: boolean; dimmed: boolean; onClick: () => void; delay: number }) {
  const color = colorMap[p.color];
  return (
    <button
      onClick={onClick}
      className={`absolute -translate-x-1/2 -translate-y-full transition-all duration-300 ${dimmed ? "opacity-25 scale-90" : "opacity-100"} ${selected ? "z-30 scale-110" : "z-10 hover:scale-105 hover:-translate-y-[110%]"}`}
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
    >
      <div className="relative animate-pin-pop" style={{ animationDelay: `${delay}ms` }}>
        {selected && (
          <span
            className="absolute left-1/2 bottom-0 -translate-x-1/2 h-6 w-6 rounded-full animate-pulse-ring"
            style={{ backgroundColor: color }}
          />
        )}
        <div
          className="grid place-items-center h-12 w-12 rounded-full border-[3px] border-ink shadow-pop text-2xl"
          style={{ backgroundColor: color }}
        >
          {p.emoji}
        </div>
        <div
          className="mx-auto h-3 w-3 -mt-1 rotate-45 border-r-[3px] border-b-[3px] border-ink"
          style={{ backgroundColor: color }}
        />
        {selected && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-cream uppercase tracking-wider">
            {p.title}
          </div>
        )}
      </div>
    </button>
  );
}
