import type { ImageItem } from "../Details.types";
import SafeImage from "./SafeImage";
import styles from "../Details.module.css";

type ThumbnailsProps = {
  items: ImageItem[];
  index: number;
  setIndex: (i: number) => void;
};

function Thumbnails(props: ThumbnailsProps) {
  const { items, index, setIndex } = props;
  return (
    <>
      {items.length > 1 && (
        <ul className={styles.thumbs}>
          {items.map((item, i) => (
            <li key={item.src} className={styles.thumbItem}>
              <button
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`${styles.thumbButton} ${
                  i === index ? styles.thumbButtonActive : ""
                }`}
              >
                {item.isPdf ? (
                  <span className={styles.pdfThumb}>PDF</span>
                ) : (
                  <SafeImage
                    key={item.src}
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className={styles.thumbImage}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Thumbnails;
