"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Image from "next/image";
import styles from "./BundleSection.module.css";

export default function BundleSection() {
  const { openOrderModal } = useContext(AppContext);
  const features = [
    "30થી પણ વધુ વિવિધ પ્રકારની સીફૂડ રેસીપી જેમાં કાઠીયાવાડી, ઇન્ડિયન, BBQ, ફ્રાય, ફિશ બિરયાની અને સૂપ વગેરે.",
    "સીફૂડ બનાવતા પહેલા ધ્યાનમાં રાખવામાં આવતા અમુક પરિબળો ની વિગતવાર માહિતી.",
    " ⁠સીફ્રેશ ની ખાસ પદ્ધતિઓ અને ટીપ્સ જે સ્વાદ બમણો કરી દેશે.",
    " ⁠ફક્ત 99 રૂપિયામાં સીફૂડ કૂકિંગ ની વિગતવાર માહિતી તમે સરળ ભાષામાં મેળવી શકશો",
    "જો તમે પહેલી વખત સીફૂડ ટ્રાય કરતા હોય તો આ બુક તમારા માટે ખૂબ જ ફાયદાકારક રહેશે",
  ];

  return (
    <div className={styles.bundleSection}>
      <h2 className={styles.sectionTitle}>Seafood Recipe eBook</h2>
      <p className={styles.bundleSubtitle}>
        Welcome to Your{" "}
        <span className={styles.blueText}>One-Stop Solution</span> for Authentic
        <br className={styles.desktopOnly} />
        Seafood Recipes and Cooking Techniques!
      </p>
      <div className={styles.bundleContainer}>
        <div className={styles.bundleImageWrapper}>
          <Image
            src="/images/ebook-cover.png"
            alt="Seafood Recipe eBook Cover"
            width={500}
            height={800}
            className={styles.bundleImage}
          />
        </div>
        <div className={styles.bundleFeatures}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.featureIcon}>✓</div>
              <div className={styles.featureText}>{feature}</div>
            </div>
          ))}
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.originalPrice}>₹ 199</span>
              <span className={styles.discountedPrice}>₹ 99/-</span>
            </div>
            <button className={styles.btn} onClick={openOrderModal}>
              DOWNLOAD NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
