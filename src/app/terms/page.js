// src/app/terms/page.js
import Link from "next/link";
import styles from "./policy.module.css";

export const metadata = {
  title: "Terms of Service - SeaFreshh",
  description: "Terms and conditions for using SeaFreshh services and products",
};

export default function TermsOfService() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyHeader}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            Sea<span className={styles.highlight}>freshh</span>
          </div>
        </Link>
        <h1 className={styles.policyTitle}>Terms and Conditions</h1>
        <p className={styles.lastUpdated}>Last Updated: April 2, 2025</p>
      </div>

      <div className={styles.policyContent}>
        <p className={styles.policyIntro}>
          Welcome to the ebook landing page of{" "}
          <strong>KCRV SEAFRESHH SEAFOODS PRIVATE LIMITED</strong>. By using our
          website and purchasing from us, you agree to comply with and be bound
          by the following Terms and Conditions. If you do not agree with any
          part of these terms, please do not use our website.
        </p>

        <section className={styles.policySection}>
          <h2>1. Definitions</h2>
          <ul>
            <li>
              <strong>"We," "Us," "Our"</strong> refers to{" "}
              <strong>KCRV SEAFRESHH SEAFOODS PRIVATE LIMITED</strong>,
              registered at 5 MILL, PARA SINGAL CHALI, 5999 AR QUT D-13-14,
              Porbandar, Gujarat 360575.
            </li>
            <li>
              <strong>"You," "Your," "User," "Visitor"</strong> refers to any
              individual accessing our website or purchasing from us.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>2. General Terms</h2>
          <ul>
            <li>
              The content on this website is for general information and is
              subject to change without notice.
            </li>
            <li>
              We do not provide any guarantees regarding the accuracy,
              reliability, completeness, or suitability of the information and
              products offered on this website.
            </li>
            <li>
              Your use of any information or materials on this website is
              entirely at your own risk. We shall not be liable for any
              inaccuracies or errors to the fullest extent permitted by law.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>3. Shipping and Delivery</h2>
          <ul>
            <li>
              For international buyers, orders are shipped through registered
              international courier services or speed post.
            </li>
            <li>
              For domestic buyers, orders are shipped through registered
              domestic courier services or speed post.
            </li>
            <li>
              Orders are processed and shipped within <strong>0-7 days</strong>{" "}
              or as per the agreed delivery date at the time of order
              confirmation.
            </li>
            <li>
              We are not liable for any delays caused by courier or postal
              authorities but guarantee to hand over the consignment within{" "}
              <strong>0-7 days</strong> from order confirmation and payment.
            </li>
            <li>
              The delivery address provided by the buyer is final, and we are
              not responsible for incorrect addresses.
            </li>
            <li>
              Order delivery will be confirmed via email as provided during
              registration.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>4. No Cancellations and Refunds</h2>
          <ul>
            <li>
              Once an order is placed,{" "}
              <strong>no cancellations or refunds</strong> will be entertained.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>5. Intellectual Property</h2>
          <ul>
            <li>
              The design, layout, graphics, and content on this website are
              owned by or licensed to us.
            </li>
            <li>
              Reproduction, distribution, or modification of any content without
              prior written consent is strictly prohibited.
            </li>
            <li>
              Trademarks not owned by us but appearing on the website are
              acknowledged.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>6. Unauthorized Use</h2>
          <ul>
            <li>
              Unauthorized use of our website or its content may lead to a claim
              for damages and/or legal consequences.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>7. External Links</h2>
          <ul>
            <li>
              Our website may include links to third-party websites for
              additional information.
            </li>
            <li>
              We do not endorse or take responsibility for the content of
              external websites.
            </li>
            <li>
              You may not link to our website without prior written consent from
              us.
            </li>
          </ul>
        </section>

        <section className={styles.policySection}>
          <h2>8. Governing Law</h2>
          <ul>
            <li>
              Any disputes arising out of the use of our website or purchase
              shall be subject to the <strong>laws of India</strong>.
            </li>
            <li>
              We are not liable for any loss or damage due to transaction
              failures caused by the cardholder exceeding preset limits with the
              acquiring bank.
            </li>
          </ul>
        </section>
      </div>

      <div className={styles.policyFooter}>
        <p>For any questions regarding these Terms, please contact us at:</p>
        <p>
          <strong>Email:</strong> seafreshh786@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> 9913969101
        </p>
        <Link href="/" className={styles.backLink}>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
