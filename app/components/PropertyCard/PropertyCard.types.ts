import type { PropertySummary } from "../../types/property";

export interface PropertyCardProps {
  property: PropertySummary;
  searchQuery: string; // active search term, handed to the details page for "Back"
}
