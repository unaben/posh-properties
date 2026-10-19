import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
}
