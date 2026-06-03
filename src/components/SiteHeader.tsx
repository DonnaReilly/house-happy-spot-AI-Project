import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";

const navLinks = [
  { to: "/explore", label: "Explore" },
  { to: "/saved", label: "Saved" },
  { to: "/agents", label: "Agents" },
  { to: "/journal", label: "Journal" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b-4 border-ink">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-sunset border-2 border-ink shadow-pop text-xl">🗺️</span>
          <span className="font-display text-2xl leading-none">plotly</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary transition"
              activeProps={{ className: "text-primary underline underline-offset-4 decoration-2" }}
            >
              {l.label}
            </Link>
          ))}
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
  );
}
