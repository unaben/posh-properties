import { Link } from "react-router";
import type { NoResultsProps } from "./NoResults.types";
import styles from "./NoResults.module.css";

function NoResults({ query }: NoResultsProps) {
  return (
    <section className={styles.wrapper} role="status">
      <h2 className={styles.title}>No properties found</h2>
      <p className={styles.message}>
        {query
          ? `Nothing matched "${query}". Try a different search term.`
          : "There are no properties to show right now."}
      </p>
      {query && (
        <Link to="/" className={styles.clear}>
          Clear search
        </Link>
      )}
    </section>
  );
}

export default NoResults;
