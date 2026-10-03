import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/onboarding", label: "Profile" },
  { href: "/suggest", label: "Top 30" },
  { href: "/favorites", label: "Favorites" },
  { href: "/booking", label: "Reserve run" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-bold tracking-tight text-amber-400">
          re:Invent booking
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
