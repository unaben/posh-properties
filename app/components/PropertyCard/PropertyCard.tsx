import { useState } from "react";
import { Link } from "react-router";
import cn from "classnames";
import { FaBookmark } from "react-icons/fa";
import { FALLBACK_IMAGE, IMAGE_BASE_URL } from "../../lib/images";
import type { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.css";

function PropertyCard({ property, searchQuery }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  // Remember which URL failed (not just "failed") so changing the photo retries
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const photoSrc = property.photo ? `${IMAGE_BASE_URL}${property.photo}` : null;
  const imageSrc =
    photoSrc && photoSrc !== failedSrc ? photoSrc : FALLBACK_IMAGE;

  return (
    <article className={styles.card}>
      <Link
        to={`/properties/${property.property_id}`}
        state={{ searchQuery }}
        className={styles.link}
      >
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={imageSrc}
            onError={() => setFailedSrc(photoSrc)}
            alt={property.display_address}
            loading="lazy"
          />
          <p className={styles.price}>{property.price}</p>
        </div>

        <div className={styles.body}>
          <p className={styles.address}>{property.display_address}</p>
        </div>
      </Link>

      {/* Sibling of the link (a button can't live inside an anchor) */}
      <button
        type="button"
        className={styles.bookmark}
        title={isSaved ? "Remove bookmark" : "Bookmark this property"}
        aria-label={isSaved ? "Remove bookmark" : "Bookmark this property"}
        aria-pressed={isSaved}
        onClick={() => setIsSaved((prev) => !prev)}
      >
        <FaBookmark
          className={cn({
            [styles.saved]: isSaved,
            [styles.unsaved]: !isSaved,
          })}
          size="40"
        />
      </button>
    </article>
  );
}

export default PropertyCard;
