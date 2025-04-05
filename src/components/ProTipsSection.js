import React from "react";
import styles from "./ProTipsSection.module.css";

export default function ProTipsSection() {
  const tips = [
    {
      title: "Pre-Cooking Essentials",
      description:
        "Learn what to check before you start! Our detailed guide ensures you have everything prepared for perfect results every time.",
    },
    {
      title: "Marination Hacks",
      description:
        "Discover professional techniques to enhance flavor & texture. Learn the precise timing and ingredients for each seafood type.",
    },
    {
      title: "Seafood Quality Guide",
      description:
        "Master the art of choosing the freshest fish every time. Learn what to look for and what to avoid when purchasing seafood.",
    },
    {
      title: "Secret Techniques",
      description:
        "Get exclusive access to SeaFreshh's proprietary tips for perfect seafood every time! Techniques passed down through generations.",
    },
  ];

  return (
    <div className={styles.proTipsSection}>
      <h2 className={styles.sectionTitle}>Pro Chef Tips Included 👨‍🍳</h2>

      <div className={styles.tipsContainer}>
        {tips.map((tip, index) => (
          <div key={index} className={styles.tipCard}>
            <div className={styles.tipTitle}>{tip.title}</div>
            <p className={styles.tipDescription}>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
