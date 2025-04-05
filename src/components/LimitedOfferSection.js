"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import styles from "./LimitedOfferSection.module.css";

export default function LimitedOfferSection() {
  const { openOrderModal } = useContext(AppContext);

  return (
    <div className={styles.accessSection}>
      <div className={styles.accessContainer}>
        <h2 className={styles.sectionTitle}>Limited-Time Offer!</h2>

        <div className={styles.offerCard}>
          <h3 className={styles.offerHeading}>
            Get Your Bundle Today for Just <del>₹499</del> ₹99!
          </h3>
          <p className={styles.offerDetail}>
            📥 Instant Digital Download | 100% Satisfaction Guarantee
          </p>
          <p className={styles.offerInfo}>
            After purchase, the bundle will be delivered to your email address
            within minutes.
          </p>
          <button className={styles.buyButton} onClick={openOrderModal}>
            BUY NOW
          </button>
        </div>

        <div className={styles.trustInfo}>
          <p className={styles.securityInfo}>
            <strong>Secure Payment</strong> | <strong>Instant Access</strong> |{" "}
            <strong>100% Satisfaction Guarantee</strong>
          </p>
          <p className={styles.contactInfo}>
            Have questions? Contact us or DM us on social media.
          </p>
        </div>
      </div>
    </div>
  );
}
