// src/app/thank-you/thank-you-content.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./thank-you.module.css";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Retrieve stored data from successful payment
    const storedEmail = localStorage.getItem("seafreshh_email");
    const storedOrderId = localStorage.getItem("seafreshh_order_id");

    if (storedEmail) setEmail(storedEmail);
    if (storedOrderId) setOrderId(storedOrderId);
  }, []);

  // Determine email status based on URL param
  const getEmailStatus = () => {
    if (status === "verification-error") {
      return "pending";
    }
    return "success";
  };

  const emailStatus = getEmailStatus();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.checkmark}>
            <svg viewBox="0 0 24 24" width="90" height="90">
              <circle cx="12" cy="12" r="11" fill="#1976D2" />
              <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className={styles.title}>Thank You for Your Purchase!</h2>
          <p className={styles.subtitle}>
            Your payment was successful, and your order is complete.
          </p>
        </div>

        {/* Email Status Section */}
        <div className={styles.emailStatusContainer}>
          {emailStatus === "success" && (
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <circle cx="12" cy="12" r="11" fill="#4CAF50" />
                  <path
                    d="M7 13l3 3 7-7"
                    stroke="#fff"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.successText}>
                <h3>eBooks On The Way!</h3>
                {email && (
                  <p>
                    Your recipe books have been sent to <strong>{email}</strong>
                  </p>
                )}
                {!email && (
                  <p>Your recipe books have been sent to your email address.</p>
                )}
                {orderId && (
                  <p className={styles.orderReference}>
                    Order Reference: <strong>{orderId}</strong>
                  </p>
                )}
              </div>
            </div>
          )}

          {emailStatus === "pending" && (
            <div className={styles.pendingContainer}>
              <div className={styles.pendingIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <circle cx="12" cy="12" r="11" fill="#FF9800" />
                  <path
                    d="M12 7v6M12 17v.5"
                    stroke="#fff"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.pendingText}>
                <h3>eBooks Processing</h3>
                <p>
                  Your recipes are being processed and will be sent to your
                  email shortly.
                </p>
                {email && (
                  <p>
                    They will be delivered to <strong>{email}</strong>
                  </p>
                )}
                {orderId && (
                  <p className={styles.orderReference}>
                    Order Reference: <strong>{orderId}</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles.instructionsContainer}>
            <h3 className={styles.instructionsTitle}>Next Steps:</h3>
            <ul className={styles.instructions}>
              <li>
                <div className={styles.iconCircle}>📧</div>
                <div className={styles.instructionText}>
                  <strong>Check your email</strong>
                  <p>
                    Your eBooks will arrive within 5-10 minutes. Please check
                    your inbox (and spam/promotions folders if needed).
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.iconCircle}>📁</div>
                <div className={styles.instructionText}>
                  <strong>Save your eBooks</strong>
                  <p>
                    The email includes both English and Gujarati versions.
                    Download and save them to your device for easy access.
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.iconCircle}>👨‍🍳</div>
                <div className={styles.instructionText}>
                  <strong>Start cooking!</strong>
                  <p>
                    Explore 30+ delicious seafood recipes and enjoy your
                    culinary journey.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.supportSection}>
            <h3>Need Help?</h3>
            <p>
              If you don't receive your eBooks within 30 minutes, please contact
              our support team at{" "}
              <a
                href="mailto:support@seafreshh.in"
                className={styles.emailLink}
              >
                support@seafreshh.in
              </a>
            </p>
            <Link href="/" className={styles.homeButton}>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
