import { useState } from "react";
import { Link } from "react-router";
import SafeImage from "./components/SafeImage";
import { buildGroups } from "./Details.utils";
import { FALLBACK_IMAGE } from "../../lib/images";
import Thumbnails from "./components/Thumbnails";
import MainImage from "./components/MainImage";
import type { ImageGroup, PropertyImageDetailsProps } from "./Details.types";
import styles from "./Details.module.css";

function PropertyImageDetails(props: PropertyImageDetailsProps) {
  const { property, searchQuery } = props;
  const groups = buildGroups(property);

  const [activeGroupId, setActiveGroupId] = useState<
    ImageGroup["id"] | undefined
  >(groups[0]?.id);
  const [index, setIndex] = useState(0);

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? groups[0];

  const changeGroup = (id: ImageGroup["id"]) => {
    setActiveGroupId(id);
    setIndex(0);
  };

  if (!activeGroup) {
    return (
      <SafeImage
        src={FALLBACK_IMAGE}
        alt={property.display_address}
        className={styles.fallback}
      />
    );
  }

  const { items, fit } = activeGroup;

  return (
    <section className={styles.section} aria-label="Property images">
      <div className={styles.tabs} role="tablist">
        <Link
          to={{
            pathname: "/",
            search: searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : "",
          }}
          className={styles.tab}
          state={{ searchQuery }}
        >
          &larr; Back
        </Link>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={group.id === activeGroup.id}
            onClick={() => changeGroup(group.id)}
            className={`${styles.tab} ${
              group.id === activeGroup.id ? styles.tabActive : ""
            }`}
          >
            {group.label} ({group.items.length})
          </button>
        ))}
      </div>
      <MainImage items={items} index={index} fit={fit} setIndex={setIndex} />
      <Thumbnails items={items} index={index} setIndex={setIndex} />
      <div className={styles.details}>
        <h1 className={styles.address}>{property.display_address}</h1>
        <p className={styles.price}>{property.price}</p>
        <ul className={styles.stats}>
          <li>{property.bedrooms} beds</li>
          <li>{property.bathrooms} baths</li>
          <li>{property.reception_rooms} receptions</li>
          <li>{property.tenure}</li>
        </ul>
      </div>
    </section>
  );
}

export default PropertyImageDetails;
