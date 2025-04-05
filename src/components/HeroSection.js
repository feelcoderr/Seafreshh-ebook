import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <h1 className={styles.heroTitle}>
        Master the Art of <span className={styles.accentText}>Seafood</span>
        <br className={styles.desktopBreak} />
        Cooking – Exclusive <span className={styles.accentText}>eBook</span>
      </h1>
      <p className={styles.heroSubtitle}>
        30+ Authentic Seafood Recipes | Just{" "}
        <strong className={styles.priceHighlight}>₹99</strong>
      </p>
      <div className={styles.profileImages}>
        <div className={styles.profileImage}>
          <Image
            src="/images/profile-1.jpg"
            width={58}
            height={58}
            alt="Profile 1"
          />
        </div>
        <div className={styles.profileImage}>
          <Image
            src="/images/profile-2.jpg"
            width={58}
            height={58}
            alt="Profile 2"
          />
        </div>
        <div className={styles.profileImage}>
          <Image
            src="/images/profile-3.jpg"
            width={58}
            height={58}
            alt="Profile 3"
          />
        </div>
      </div>
      <div className={styles.rating}>★ ★ ★ ★ ★</div>
      <p className={styles.trustText}>
        Trusted by <strong>1000+</strong> Seafood Enthusiasts
      </p>
    </div>
  );
}
