import { IMAGE_BASE_URL } from "../../lib/images";
import type { Property } from "../../types/property";
import type { ImageGroup, ImageItem } from "./Details.types";
import styles from "./Details.module.css";

const toItem = (path: string, alt: string): ImageItem => ({
  src: `${IMAGE_BASE_URL}${path}`,
  alt,
  isPdf: /\.pdf$/i.test(path),
});

export function buildGroups(property: Property): ImageGroup[] {
  const photos: ImageItem[] = (property.photos ?? []).map((path, i) => {
    return toItem(path, `${property.display_address} - photo ${i + 1}`);
  });

  const floorplans: ImageItem[] = (property.floorplans ?? []).map((plan) => {
    return toItem(plan.image, plan.description || "Floorplan");
  });

  const epc: ImageItem[] = (property.assets ?? [])
    .filter((a) => /epc/i.test(a.description ?? ""))
    .map((a) => toItem(a.image, a.description ?? "EPC"));

  const groups: ImageGroup[] = [
    { id: "photos", label: "Photos", items: photos, fit: styles.cover },
    {
      id: "floorplan",
      label: "Floorplan",
      items: floorplans,
      fit: styles.contain,
    },
    { id: "epc", label: "EPC", items: epc, fit: styles.contain },
  ];

  return groups.filter((g) => g.items.length > 0);
}
