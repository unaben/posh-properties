import cn from "classnames";
import { useMatch } from "react-router";
import SearchBox from "../Searchbox/Searchbox";
import styles from "./Header.module.css";

function Header() {
  const isHome = useMatch("/") !== null;

  return (
    <header className={styles.header}>
      <h1 className={cn(styles.title, { [styles.centered]: !isHome })}>
        Posh Properties
      </h1>

      {isHome && <SearchBox />}
    </header>
  );
}

export default Header;
