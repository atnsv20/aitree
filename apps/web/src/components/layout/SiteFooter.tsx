import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-surface-subtle">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-sm">
          <p className="font-semibold text-slate-900">AI Progress Map</p>
          <p className="mt-2 text-sm text-slate-500">
            An evidence-based tech tree tracking AI capability progress across
            development routes. Scores are a Capability Index, not a percentage
            to AGI.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-slate-500">
          <Link href="/routes" className="hover:text-accent-700">
            All Routes
          </Link>
          <Link href="/methodology" className="hover:text-accent-700">
            Methodology
          </Link>
          <Link href="/glossary" className="hover:text-accent-700">
            Glossary
          </Link>
          <Link href="/blog" className="hover:text-accent-700">
            Blog
          </Link>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-4 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} AI Progress Map. Data shown is
          illustrative sample content.
        </p>
      </div>
    </footer>
  );
}
