export function SourceList({ urls }: { urls: string[] }) {
  if (urls.length === 0) {
    return <p className="text-sm text-slate-400">No sources listed.</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {urls.map((url) => {
        let host = url;
        try {
          host = new URL(url).hostname.replace(/^www\./, "");
        } catch {
          /* keep raw url */
        }
        return (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
              {host}
              <span aria-hidden className="text-slate-300">↗</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
