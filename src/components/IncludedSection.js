import React from "react";
import styles from "./IncludedSection.module.css";

export default function IncludedSection() {
  const recipeTypes = [
    "Kathiyawadi & Indian Style",
    "BBQ & Tandoor Fish",
    "Fish Biryani Recipes",
    "Fried Fish Recipes",
    "Dry Fish Curry",
    "Boiling Techniques",
    "Squid & Lobster Specials",
    "Crab Recipes",
    "Crab Soup & More!",
    "10+ Cooking Styles",
  ];

  return (
    <div className={styles.includedSection}>
      <h2 className={styles.sectionTitle}>What's Inside? 🏆</h2>
      <p className={styles.sectionDescription}>
        With our meticulously crafted{" "}
        <span className={styles.accentText}>30+ authentic recipes</span>, you're
        not just getting a cookbook; you're getting a comprehensive guide to{" "}
        <span className={styles.accentText}>mastering seafood cuisine</span>.
      </p>

      <div className={styles.recipeTypesContainer}>
        {recipeTypes.map((type, index) => (
          <div key={index} className={styles.recipeTypeItem}>
            <div className={styles.checkIcon}>✓</div>
            <span className={styles.recipeTypeName}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
