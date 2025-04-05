import FishLogo from "./FishLogo";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.stickyHeader}>
      <div className={styles.logoContainer}>
        <FishLogo width={40} height={40} />
      </div>
    </header>
  );
}
