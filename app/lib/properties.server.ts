import type {
  PropertiesResponse,
  Property,
  PropertySummary,
} from "../types/property";

const DEFAULT_PATH = "/property-data.json";
const SEARCH_FIELDS = [
  "short_description",
  "display_address",
  "town",
  "postcode",
] as const;

function buildSearchText(property: Property): string {
  return SEARCH_FIELDS.map((field) => property[field] ?? "")
    .join(" ")
    .toLowerCase();
}

async function fetchProperties(request: Request): Promise<Property[]> {
  const url = new URL(
    process.env.PROPERTIES_API_URL ?? DEFAULT_PATH,
    request.url,
  );

  const response = await fetch(url, { signal: request.signal });
  if (!response.ok) {
    throw new Response(`Failed to load properties (${response.status})`, {
      status: 502,
    });
  }

  const json: PropertiesResponse = await response.json();
  return json.result.properties.elements;
}

const toSummary = (property: Property): PropertySummary => ({
  property_id: property.property_id,
  display_address: property.display_address,
  price: property.price,
  photo: property.photos?.[0] ?? null,
});

export async function searchProperties(
  request: Request,
  searchValue: string,
): Promise<PropertySummary[]> {
  const terms = searchValue.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const properties = await fetchProperties(request);
  if (terms.length === 0) return properties.map(toSummary);
  return properties
    .filter((property) => {
      const text = buildSearchText(property);
      return terms.every((term) => text.includes(term));
    })
    .map(toSummary);
}

export async function getProperty(
  request: Request,
  id: number,
): Promise<Property | undefined> {
  const properties = await fetchProperties(request);
  return properties.find((property) => property.property_id === id);
}
