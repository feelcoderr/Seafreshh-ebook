// src/app/refund/page.js
import Link from "next/link";
import styles from "../terms/policy.module.css";

export const metadata = {
  title: "Refund Policy - SeaFreshh",
  description: "Refund policy for SeaFreshh products and services",
};

export default function RefundPolicy() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyHeader}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            Sea<span className={styles.highlight}>freshh</span>
          </div>
        </Link>
        <h1 className={styles.policyTitle}>Refund Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: April 2, 2025</p>
      </div>

      <div className={styles.policyContent}>
        <p className={styles.policyIntro}>
          At <strong>KCRV SEAFRESHH SEAFOODS PRIVATE LIMITED</strong>, we are
          committed to providing high-quality digital products. This Refund
          Policy outlines our guidelines regarding refunds for purchases made on
          our website.
        </p>

        <section className={styles.policySection}>
          <h2>1. Digital Products (eBooks)</h2>
          <ul>
            <li>
              Our eBook products are digital goods delivered electronically.
            </li>
            <li>
              Due to the nature of digital products, which can be instantly
              downloaded and cannot be returned, all sales are final.
            </li>
            <li>
              Once an order is placed and payment is processed,{" "}
              <strong>no cancellations or refunds</strong> will be entertained.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>2. Exceptions</h2>
          <ul>
            <li>
              In the rare case that you are unable to download or access the
              eBook after purchase, please contact our customer support at
              seafreshh786@gmail.com within 48 hours of purchase.
            </li>
            <li>
              Technical issues preventing delivery will be addressed promptly to
              ensure you receive your purchase.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>3. Quality Commitment</h2>
          <ul>
            <li>
              We ensure that all product descriptions are accurate and
              comprehensive.
            </li>
            <li>
              All our digital products undergo quality checks before being made
              available for purchase.
            </li>
            <li>
              We provide preview content to help you make an informed decision
              before purchasing.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>4. Contact Information</h2>
          <p>
            If you have any questions about our Refund Policy, please contact
            us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> seafreshh786@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> 9913969101
            </li>
            <li>
              <strong>Address:</strong> 5 MILL, PARA SINGAL CHALI, 5999 AR QUT
              D-13-14, Porbandar, Gujarat 360575
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>5. Modification of Policy</h2>
          <ul>
            <li>
              We reserve the right to modify this Refund Policy at any time
              without prior notice.
            </li>
            <li>
              Changes will be effective immediately upon posting on our website.
            </li>
          </ul>
        </section>
      </div>

      <div className={styles.policyFooter}>
        <p>
          We appreciate your understanding and thank you for choosing SeaFreshh.
        </p>
        <Link href="/" className={styles.backLink}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
