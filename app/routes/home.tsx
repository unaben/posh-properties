import PropertyCard from "../components/PropertyCard/PropertyCard";
import { searchProperties } from "../lib/properties.server";
import type { Route } from "./+types/home";
import styles from "./home.module.css";

export function meta() {
  return [{ title: "Posh Properties" }];
}

// The search term lives in the URL (?q=...), so results are linkable,
// survive refresh, and work with the back button.
export async function loader({ request }: Route.LoaderArgs) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const properties = await searchProperties(request, query);
  return { query, properties };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { query, properties } = loaderData;

  return (
    <div className={styles.grid}>
      {properties.map((property) => (
        <PropertyCard
          key={property.property_id}
          property={property}
          searchQuery={query}
        />
      ))}
    </div>
  );
}
