import { useEffect, useRef, useState } from "react";
import { useSearchParams, useSubmit } from "react-router";
import { FaSearch } from "react-icons/fa";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Searchbox.module.css";

function SearchBox() {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const searchQuery = searchParams.get("q") ?? "";

  const [value, setValue] = useState(searchQuery);
  const debounced = useDebounce(value, 500);

  useEffect(() => setValue(searchQuery), [searchQuery]);

  const searchQueryRef = useRef(searchQuery);

  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    if (debounced !== searchQueryRef.current) {
      submit(debounced ? { q: debounced } : {}, { method: "get", action: "/", replace: true });
    }
  }, [debounced, submit]);

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        name="q"
        placeholder="Enter a search term"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <FaSearch className={styles.icon} size={20} />
    </div>
  );
}

export default SearchBox;
