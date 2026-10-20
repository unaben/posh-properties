import type { Property } from "../../types/property";

export interface ImageItem {
  src: string;
  alt: string;
  isPdf: boolean;
}

export interface ImageGroup {
  id: "photos" | "floorplan" | "epc";
  label: string;
  items: ImageItem[];
  fit: string;
}

export interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}


export interface PropertyImageDetailsProps {
  property: Property;
  searchQuery: string;
}