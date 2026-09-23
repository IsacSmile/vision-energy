export interface PlaceholderInfo {
  imageUrl: string;
  imageAlt: string;
  isPlaceholder: boolean;
}

export function getCategoryPlaceholder(
  category?: string,
  subcategoryGroupOrTitle?: string,
  title?: string
): PlaceholderInfo {
  const catLower = (category || "").toLowerCase();
  const subLower = (subcategoryGroupOrTitle || "").toLowerCase();
  const titleLower = (title || "").toLowerCase();

  let placeholderPath = "/placeholders/fallback-generic.svg";

  if (
    catLower.includes("lightning") ||
    catLower.includes("earth") ||
    subLower.includes("lightning") ||
    subLower.includes("earth") ||
    titleLower.includes("lightning") ||
    titleLower.includes("earth")
  ) {
    placeholderPath = "/placeholders/lightning-protection-generic.svg";
  } else if (
    catLower.includes("solar") ||
    catLower.includes("renewable") ||
    subLower.includes("solar") ||
    titleLower.includes("solar")
  ) {
    placeholderPath = "/placeholders/solar-generic.svg";
  } else if (
    catLower.includes("mechanical") ||
    subLower.includes("hvac") ||
    subLower.includes("mechanical") ||
    subLower.includes("ventilation") ||
    subLower.includes("pump")
  ) {
    placeholderPath = "/placeholders/mechanical-generic.svg";
  } else if (
    subLower.includes("cable") ||
    subLower.includes("conduit") ||
    subLower.includes("trunking") ||
    titleLower.includes("cable")
  ) {
    placeholderPath = "/placeholders/cable-generic.svg";
  } else if (
    catLower.includes("electrical") ||
    subLower.includes("lighting") ||
    subLower.includes("switch") ||
    subLower.includes("panel")
  ) {
    placeholderPath = "/placeholders/electrical-generic.svg";
  }

  const sampleTitle = title || subcategoryGroupOrTitle || category || "Product";
  const imageAlt = `${sampleTitle} — sample image`;

  return {
    imageUrl: placeholderPath,
    imageAlt,
    isPlaceholder: true,
  };
}
