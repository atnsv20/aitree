import Link from "next/link";
import type { BlogPost } from "@aitree/types";
import { formatDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="panel panel-hover flex flex-col gap-2 p-5"
    >
      <time dateTime={post.date} className="text-xs text-slate-400">
        {formatDate(post.date)}
      </time>
      <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
      <p className="line-clamp-3 text-sm text-slate-500">{post.description}</p>
      <span className="mt-auto pt-2 text-sm font-medium text-accent-600">
        Read article →
      </span>
    </Link>
  );
}
