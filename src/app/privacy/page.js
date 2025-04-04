// src/app/privacy/page.js
import Link from "next/link";
import styles from "../terms/policy.module.css";

export const metadata = {
  title: "Privacy Policy - SeaFreshh",
  description: "Privacy policy for SeaFreshh services and products",
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyHeader}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            Sea<span className={styles.highlight}>freshh</span>
          </div>
        </Link>
        <h1 className={styles.policyTitle}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: April 2, 2025</p>
      </div>

      <div className={styles.policyContent}>
        <p className={styles.policyIntro}>
          This Privacy Policy outlines how{" "}
          <strong>KCRV SEAFRESHH SEAFOODS PRIVATE LIMITED</strong> collects,
          uses, and protects any personal information provided by users on our
          website.
        </p>

        <section className={styles.policySection}>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and billing/shipping address.
            </li>
            <li>
              <strong>Payment Information:</strong> Processed securely through
              third-party payment gateways. We do not store your payment
              details.
            </li>
            <li>
              <strong>Usage Data:</strong> IP addresses, browser type, pages
              visited, and time spent on the website.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To process orders and provide customer support.</li>
            <li>To improve our website and services based on user feedback.</li>
            <li>
              To send promotional emails about new products, special offers, or
              other relevant updates.
            </li>
            <li>
              To prevent fraudulent activities and ensure website security.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>3. Data Security</h2>
          <ul>
            <li>
              We implement appropriate security measures to protect your
              personal information.
            </li>
            <li>
              However, no data transmission over the internet is 100% secure.
              You acknowledge that you share your information at your own risk.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>4. Sharing of Information</h2>
          <ul>
            <li>
              We <strong>do not sell or rent</strong> your personal data to
              third parties.
            </li>
            <li>
              Information may be shared with:
              <ul>
                <li>Payment processors for transaction verification.</li>
                <li>Courier companies for order fulfillment.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>5. Cookies and Tracking</h2>
          <ul>
            <li>
              Our website may use cookies to enhance user experience and track
              website performance.
            </li>
            <li>
              Users can disable cookies through their browser settings, but some
              features may be affected.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>6. Third-Party Links</h2>
          <ul>
            <li>
              Our website may contain links to external websites. We are not
              responsible for their privacy policies or content.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>7. Your Rights</h2>
          <ul>
            <li>
              You have the right to access, update, or request deletion of your
              personal data by contacting us at{" "}
              <strong>seafreshh786@gmail.com</strong>.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>8. Contact Us</h2>
          <p>For any privacy-related concerns, contact us at:</p>
          <ul>
            <li>
              <strong>Phone:</strong> 9913969101
            </li>
            <li>
              <strong>Email:</strong> seafreshh786@gmail.com
            </li>
            <li>
              <strong>Address:</strong> 5 MILL, PARA SINGAL CHALI, 5999 AR QUT
              D-13-14, Porbandar, Gujarat 360575
            </li>
          </ul>
        </section>

        <p className={styles.policyClosing}>
          By using our website, you consent to our Privacy Policy.
        </p>
      </div>

      <div className={styles.policyFooter}>
        <Link href="/" className={styles.backLink}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
