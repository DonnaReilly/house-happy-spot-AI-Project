import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Plotly" },
      { name: "description", content: "Field notes, neighborhood deep-dives, and small stories about big homes." },
    ],
  }),
  component: JournalPage,
});

const posts = [
  {
    tag: "Field notes",
    title: "The case for buying a house with one weird room",
    excerpt: "Octagonal nooks, attic libraries, that closet under the stairs — why the strangest spaces age the best.",
    read: "6 min",
    color: "bg-gradient-sunset",
    span: "md:col-span-2",
  },
  {
    tag: "Neighborhood",
    title: "Foggy Hollow: the mushroom house economy",
    excerpt: "Inside a 14-block pocket where the houses look hand-thrown and the mail still comes by bike.",
    read: "4 min",
    color: "bg-cream",
    span: "",
  },
  {
    tag: "Buyer diary",
    title: "We bought a caboose. Here's the WiFi situation.",
    excerpt: "A 520-sqft love letter to choosing tiny on purpose.",
    read: "3 min",
    color: "bg-card",
    span: "",
  },
  {
    tag: "Design",
    title: "Color theory for people who hate beige",
    excerpt: "A short, opinionated guide to painting a front door that makes neighbors text you.",
    read: "5 min",
    color: "bg-gradient-dusk text-cream",
    span: "md:col-span-2",
  },
];

function JournalPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-[1500px] px-6 pt-10 pb-6">
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-tangerine animate-pulse" /> Field notes
        </p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mt-4 text-balance">
          The <span className="italic text-tangerine">Plotly</span> journal.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/70">
          Stories from inside the strangest houses on the map. Mostly true.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article
              key={p.title}
              className={`rounded-3xl border-2 border-ink p-7 shadow-pop hover:-translate-y-1 transition ${p.color} ${p.span}`}
            >
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">{p.tag}</p>
              <h2 className="font-display text-3xl md:text-4xl leading-tight mt-3 text-balance">{p.title}</h2>
              <p className="mt-3 opacity-90">{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-sm font-bold">
                <span>{p.read} read</span>
                <span>Read →</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
