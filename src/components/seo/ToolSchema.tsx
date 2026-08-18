import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

interface ToolSchemaProps {
  name: string;
  description: string;
  path: string;
  featureList: string[];
}

export function ToolSchema({ name, description, path, featureList }: ToolSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description,
        url: `${SITE_URL}${path}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList,
      }}
    />
  );
}
