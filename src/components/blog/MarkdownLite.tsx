interface MarkdownLiteProps {
  body: string;
}

/** Renders the minimal markdown subset used in src/content/blog/*.ts: ## / ### headings, "- " bullet runs, and blank-line-separated paragraphs. */
export function MarkdownLite({ body }: MarkdownLiteProps) {
  const blocks = body.trim().split(/\n\s*\n/);
  let listBuffer: string[] = [];
  const elements: React.ReactNode[] = [];

  function flushList(key: string) {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="my-4 list-disc space-y-1.5 pl-5 font-body text-sm leading-relaxed text-fg-muted">
        {listBuffer.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  }

  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      flushList(`list-${i}`);
      elements.push(
        <h3 key={i} className="mt-6 font-display text-lg font-bold text-fg">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList(`list-${i}`);
      elements.push(
        <h2 key={i} className="mt-8 font-display text-2xl font-bold text-fg">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((line) => line.replace(/^- /, ""));
      listBuffer.push(...items);
    } else if (trimmed.length > 0) {
      flushList(`list-${i}`);
      elements.push(
        <p key={i} className="mt-4 font-body text-sm leading-relaxed text-fg-muted">
          {trimmed}
        </p>
      );
    }
  });
  flushList("list-final");

  return <div>{elements}</div>;
}
