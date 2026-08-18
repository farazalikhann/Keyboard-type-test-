import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, breadcrumbLabel, children }: LegalLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />
      <h1 className="mt-3 font-display text-3xl font-bold text-fg">{title}</h1>
      {lastUpdated && (
        <p className="mt-2 font-data text-xs uppercase tracking-wide text-fg-muted">Last updated {lastUpdated}</p>
      )}
      <div className="prose-legal mt-8 space-y-4 font-body text-sm leading-relaxed text-fg-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-fg [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-fg [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
