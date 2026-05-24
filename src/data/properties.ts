export type Vibe = "cozy" | "wild" | "luxe" | "quirky" | "green";

export interface Property {
  id: string;
  emoji: string;
  title: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  vibe: Vibe;
  vibeLabel: string;
  blurb: string;
  funFact: string;
  /** percentage coords on the playful map (0-100) */
  x: number;
  y: number;
  color: "sunset" | "tangerine" | "magenta" | "violet";
}

export const properties: Property[] = [
  {
    id: "p1",
    emoji: "🌵",
    title: "The Cactus Bungalow",
    neighborhood: "Sunbaked Heights",
    price: 489000,
    beds: 2, baths: 1, sqft: 980,
    vibe: "quirky", vibeLabel: "Quirky charm",
    blurb: "A pink stucco hideaway with a wraparound porch and a resident roadrunner.",
    funFact: "Neighbor brings tamales on Sundays.",
    x: 22, y: 34, color: "magenta",
  },
  {
    id: "p2",
    emoji: "🌊",
    title: "Driftwood Loft",
    neighborhood: "Tide Pool Quay",
    price: 1240000,
    beds: 3, baths: 2, sqft: 1740,
    vibe: "luxe", vibeLabel: "Salt-air luxe",
    blurb: "Floor-to-ceiling glass over the harbor. Pelicans included.",
    funFact: "Sunsets here are illegal in 3 states.",
    x: 70, y: 22, color: "violet",
  },
  {
    id: "p3",
    emoji: "🍄",
    title: "Mushroom House",
    neighborhood: "Foggy Hollow",
    price: 612000,
    beds: 2, baths: 2, sqft: 1320,
    vibe: "wild", vibeLabel: "Wild & woodsy",
    blurb: "Round windows, mossy roof, a kitchen that smells like cardamom.",
    funFact: "Came with a tiny door no one can open.",
    x: 45, y: 58, color: "tangerine",
  },
  {
    id: "p4",
    emoji: "🛼",
    title: "The Rollerdrome",
    neighborhood: "Neon District",
    price: 875000,
    beds: 1, baths: 1, sqft: 2100,
    vibe: "quirky", vibeLabel: "Disco fever",
    blurb: "Converted skating rink. Sprung floors. Mirror ball stays.",
    funFact: "Hosted three weddings and one séance.",
    x: 18, y: 70, color: "sunset",
  },
  {
    id: "p5",
    emoji: "🌿",
    title: "Greenhouse #7",
    neighborhood: "Botanic Mile",
    price: 729000,
    beds: 3, baths: 2, sqft: 1620,
    vibe: "green", vibeLabel: "Plant parent paradise",
    blurb: "A glass house that hugs a hundred-year-old fig tree.",
    funFact: "Photosynthesizes for you.",
    x: 60, y: 75, color: "violet",
  },
  {
    id: "p6",
    emoji: "🏰",
    title: "Tiny Castle",
    neighborhood: "Cobblestone Row",
    price: 1490000,
    beds: 4, baths: 3, sqft: 2480,
    vibe: "luxe", vibeLabel: "Storybook grand",
    blurb: "Turret office, drawbridge optional, no actual moat (yet).",
    funFact: "The fireplace roars on command.",
    x: 82, y: 50, color: "magenta",
  },
  {
    id: "p7",
    emoji: "🚂",
    title: "The Caboose",
    neighborhood: "Old Rail Yard",
    price: 325000,
    beds: 1, baths: 1, sqft: 520,
    vibe: "cozy", vibeLabel: "Pocket-sized cozy",
    blurb: "Restored 1948 caboose on a permanent platform. Yes, it has wifi.",
    funFact: "Whistles when the kettle boils.",
    x: 38, y: 18, color: "tangerine",
  },
  {
    id: "p8",
    emoji: "🪩",
    title: "Penthouse Mirage",
    neighborhood: "Skyline North",
    price: 2200000,
    beds: 3, baths: 3, sqft: 2950,
    vibe: "luxe", vibeLabel: "Skyline opulence",
    blurb: "Top-floor everything. Rooftop pool shaped like an eye.",
    funFact: "Comes with a butler named Greg.",
    x: 88, y: 80, color: "sunset",
  },
];

export const vibeFilters: { id: Vibe | "all"; label: string; emoji: string }[] = [
  { id: "all", label: "All vibes", emoji: "✨" },
  { id: "cozy", label: "Cozy", emoji: "🫖" },
  { id: "wild", label: "Wild", emoji: "🌲" },
  { id: "luxe", label: "Luxe", emoji: "🥂" },
  { id: "quirky", label: "Quirky", emoji: "🎨" },
  { id: "green", label: "Green", emoji: "🌱" },
];
