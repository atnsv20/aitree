import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const posts = await api.blog();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.blogPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await api.blogPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    articleBody: post.content,
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="container-page py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <time dateTime={post.date} className="text-sm text-slate-500">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-lg text-slate-500">{post.description}</p>

        <div className="mt-8 space-y-5 leading-relaxed text-slate-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {(post.routeSlugs.length > 0 ||
          post.nodeSlugs.length > 0 ||
          post.eventSlugs.length > 0) && (
          <footer className="mt-12 border-t border-line pt-6">
            <h2 className="text-lg font-semibold">Related</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.routes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/routes/${r.slug}`}
                  className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-sm text-accent-700 hover:bg-accent-100"
                >
                  {r.shortTitle}
                </Link>
              ))}
              {post.nodes.map((n) => (
                <Link
                  key={n.slug}
                  href={`/nodes/${n.slug}`}
                  className="rounded-full border border-line bg-surface-subtle px-3 py-1 text-sm text-slate-600 hover:text-slate-900"
                >
                  {n.title}
                </Link>
              ))}
              {post.events.map((e) => (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  className="rounded-full border border-line bg-surface-subtle px-3 py-1 text-sm text-slate-600 hover:text-slate-900"
                >
                  {e.title}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}
