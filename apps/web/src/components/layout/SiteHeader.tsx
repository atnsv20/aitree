import Link from "next/link";

const navLinks = [
  { href: "/routes", label: "Routes" },
  { href: "/blog", label: "Blog" },
  { href: "/glossary", label: "Glossary" },
  { href: "/methodology", label: "Methodology" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white">
            <span className="h-2 w-2 rounded-full bg-accent-600" />
          </span>
          <span className="font-semibold text-slate-900">AI Progress Map</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
