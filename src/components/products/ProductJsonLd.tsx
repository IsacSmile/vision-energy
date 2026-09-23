import type { ProductItem } from "@/lib/data/product-items";
import { getCategoryPlaceholder } from "@/lib/utils/placeholders";

interface ProductJsonLdProps {
  product: ProductItem;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const fallback = getCategoryPlaceholder(product.category, product.subcategoryGroup, product.title);
  const imageUrl = product.imageUrl || fallback.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.code,
    category: product.category,
    image: imageUrl ? [imageUrl] : undefined,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "SubcategoryGroup",
        value: product.subcategoryGroup,
      },
      ...product.includes.map((inc) => ({
        "@type": "PropertyValue",
        name: "Included Feature",
        value: inc,
      })),
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      priceValidation: "Inquire for quote",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
