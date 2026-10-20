import { useLocation } from "react-router";
import PropertyImageDetails from "../components/Details/Details";
import { getProperty } from "../lib/properties.server";
import type { Route } from "./+types/property";

export async function loader({ params, request }: Route.LoaderArgs) {
  const property = await getProperty(request, Number(params.propertyId));
  if (!property) {
    throw new Response("Property not found", { status: 404 });
  }
  return { property };
}

export function meta({ data }: Route.MetaArgs) {
  return [
    {
      title: data
        ? `${data.property.display_address} | Posh Properties`
        : "Not found | Posh Properties",
    },
  ];
}

export default function PropertyRoute({ loaderData }: Route.ComponentProps) {
  const { property } = loaderData;
  // The card passes the active search along so "Back" restores it
  const { state } = useLocation();
  const q: string = state?.q ?? "";

  return (
    <PropertyImageDetails
      key={property.property_id} // reset gallery state per property
      property={property}
      q={q}
    />
  );
}
