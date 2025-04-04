// src/app/thank-you/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FishLogo from "@/components/FishLogo";
import styles from "./thank-you.module.css";

export default function ThankYouPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

        <div className={styles.details}>
          <div className={styles.instructionsContainer}>
            <h3 className={styles.instructionsTitle}>Next Steps:</h3>
            <ul className={styles.instructions}>
              <li>
                <div className={styles.iconCircle}>📧</div>
                <div className={styles.instructionText}>
                  <strong>Check your email</strong>
                  <p>
                    We've sent your eBook to the email address you provided
                    during checkout.
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.iconCircle}>📁</div>
                <div className={styles.instructionText}>
                  <strong>Download your eBook</strong>
                  <p>
                    Click the download link in the email to get your copy of the
                    SeaFreshh Recipe eBook.
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
        </div>
      </div>
    </div>
  );
}
