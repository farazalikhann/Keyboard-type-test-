interface FaqItem {
  question: string;
  answer: string;
}

export function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 id="faq-heading" className="font-display text-xl font-bold text-fg">
        Frequently asked questions
      </h2>
      <dl className="mt-4 divide-y divide-border border-t border-border">
        {items.map((item) => (
          <div key={item.question} className="py-4">
            <dt className="font-body text-sm font-semibold text-fg">{item.question}</dt>
            <dd className="mt-1.5 font-body text-sm leading-relaxed text-fg-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
