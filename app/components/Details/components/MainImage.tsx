import { Link } from "react-router";
import type { ImageItem } from "../Details.types";
import SafeImage from "./SafeImage";
import styles from "../Details.module.css";

type MainImageProps = {
  items: ImageItem[];
  index: number;
  fit: string;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const MainImage = ({ items, index, fit, setIndex }: MainImageProps) => {
  const currentData = items[index];

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <div className={styles.main} tabIndex={0} onKeyDown={handleKeyDown}>
      {currentData.isPdf ? (
        <div className={styles.pdfPanel}>
          <p className={styles.pdfLabel}>{currentData.alt}</p>
          <Link
            className={styles.pdfLink}
            to={currentData.src}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF in a new tab
          </Link>
        </div>
      ) : (
        <SafeImage
          key={currentData.src}
          src={currentData.src}
          alt={currentData.alt}
          className={`${styles.mainImage} ${fit}`}
        />
      )}

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className={`${styles.navButton} ${styles.prev}`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className={`${styles.navButton} ${styles.next}`}
          >
            ›
          </button>
          <p className={styles.counter}>
            {index + 1} / {items.length}
          </p>
        </>
      )}
    </div>
  );
};

export default MainImage;
