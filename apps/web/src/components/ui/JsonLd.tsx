export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, server-rendered structured data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
