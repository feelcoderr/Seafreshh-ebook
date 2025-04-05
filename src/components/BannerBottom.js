"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Image from "next/image";
import styles from "./BannerBottom.module.css";

export default function BannerBottom() {
  const { openOrderModal } = useContext(AppContext);

  return (
    <div className={styles.bottomBanner}>
      <div className={styles.bannerContent}>
        <div className={styles.logoWrapper}>
          <Image
            src="/images/favicon.png"
            width={50}
            height={50}
            alt="Seafood eBook Logo"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.bannerText}>
          <strong>Seafood Recipe eBook</strong>
          <br className={styles.desktopBreak} />
          <span className={styles.recipeCount}>30+ Authentic Recipes</span>
        </div>
      </div>
      <div className={styles.bannerPrice}>
        <div className={styles.priceContainer}>
          <span className={styles.originalPrice}>Rs 499</span>
          <span className={styles.discountPrice}>₹ 99/-</span>
        </div>
        <button className={styles.downloadButton} onClick={openOrderModal}>
          Download Now
        </button>
      </div>
    </div>
  );
}
