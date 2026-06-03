import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agents — Plotly" },
      { name: "description", content: "Meet the matchmakers who'll walk you through your weird little home." },
    ],
  }),
  component: AgentsPage,
});

const agents = [
  {
    name: "Mika Okafor",
    emoji: "🌶️",
    title: "Hot listings, hotter takes",
    bio: "Specializes in quirky bungalows and turning haunted houses into 'characterful' ones.",
    sold: 142,
    color: "bg-gradient-sunset",
  },
  {
    name: "Theo Larsen",
    emoji: "🪴",
    title: "Plant-parent whisperer",
    bio: "Knows which neighborhoods get afternoon light and which ones get gossip.",
    sold: 87,
    color: "bg-gradient-dusk text-cream",
  },
  {
    name: "Juno Reyes",
    emoji: "🪩",
    title: "Loft & loftier",
    bio: "If it has exposed brick or a mirror ball, Juno has the keys.",
    sold: 213,
    color: "bg-cream",
  },
  {
    name: "Pip Whitlock",
    emoji: "🚂",
    title: "Tiny home, big heart",
    bio: "Cabooses, A-frames, treehouses — anything under 800 sqft, Pip's got it.",
    sold: 64,
    color: "bg-gradient-sunset",
  },
];

function AgentsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 pt-10 pb-6">
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-violet animate-pulse" /> The humans
        </p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mt-4 text-balance">
          Matchmakers, not <span className="italic text-violet">middlemen</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Real people who actually like houses. Pick one and they'll show you around — virtually or in person.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((a, i) => (
            <article
              key={a.name}
              className={`rounded-3xl border-2 border-ink p-6 shadow-pop hover:-translate-y-1 transition ${a.color} ${i % 3 === 0 ? "md:translate-y-4" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="grid place-items-center h-16 w-16 rounded-2xl bg-card border-2 border-ink text-3xl">
                  {a.emoji}
                </span>
                <div>
                  <h2 className="font-display text-2xl leading-tight">{a.name}</h2>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">{a.title}</p>
                </div>
              </div>
              <p className="mt-4 text-base opacity-90">{a.bio}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-bold">{a.sold} homes matched</span>
                <button className="rounded-full bg-ink text-cream px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-ink hover:-translate-y-0.5 transition">
                  Say hi →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
