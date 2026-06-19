import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="text-sm font-medium uppercase tracking-widest text-accent-600">
        404
      </span>
      <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-500">
        That route, node, or event isn&apos;t on the map. Try exploring from the
        AI Progress Map.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
      >
        Back to the map →
      </Link>
    </div>
  );
}
