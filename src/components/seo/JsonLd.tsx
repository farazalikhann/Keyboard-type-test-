/**
 * Renders a single JSON-LD script tag. JSON.stringify already escapes quotes and control
 * characters; the one thing it does not escape is a literal "</script>" inside a string value,
 * which would terminate the tag early, so that sequence is neutralized before injection.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
