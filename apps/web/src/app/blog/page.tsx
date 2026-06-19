import type { Metadata } from "next";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/content/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Analysis and commentary on AI capability progress, scoring methodology, and where the frontier is heading.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogIndexPage() {
  const posts = await api.blog();

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">
        Analysis of AI progress, the Capability Index, and the evidence behind
        each route.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
