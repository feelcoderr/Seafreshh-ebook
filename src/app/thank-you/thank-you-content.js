// src/app/thank-you/thank-you-content.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./thank-you.module.css";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const payment_id = searchParams.get("payment_id");
  const email = searchParams.get("email");
  const [emailStatus, setEmailStatus] = useState("idle"); // idle, sending, success, error

  useEffect(() => {
    // Only send email if we have the required parameters
    if (payment_id && email) {
      // Check if this specific payment has already had an email sent
      const emailSentKey = `email_sent_${payment_id}`;
      const wasEmailSent = localStorage.getItem(emailSentKey);

      if (!wasEmailSent && emailStatus === "idle") {
        // Email hasn't been sent yet for this payment
        sendEmailWithPDFs();
      } else if (wasEmailSent) {
        // Email was already sent, update the UI to reflect that
        setEmailStatus("success");
      }
    }
  }, [payment_id, email, emailStatus]);

  const sendEmailWithPDFs = async () => {
    try {
      setEmailStatus("sending");

      // Call your send API endpoint
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          paymentId: payment_id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Mark this payment as having had an email sent
        localStorage.setItem(`email_sent_${payment_id}`, "true");
        setEmailStatus("success");
        console.log("Email sent successfully:", result);
      } else {
        setEmailStatus("error");
        console.error("Failed to send email:", result);
      }
    } catch (error) {
      setEmailStatus("error");
      console.error("Error sending email:", error);
    }
  };

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

        {/* Email Status Section with Loader */}
        <div className={styles.emailStatusContainer}>
          {emailStatus === "sending" && (
            <div className={styles.sendingContainer}>
              <div className={styles.loader}>
                <div className={styles.spinnerBox}>
                  <div className={styles.spinnerCircle}></div>
                </div>
              </div>
              <div className={styles.sendingText}>
                <h3>Sending your eBooks...</h3>
                <p>
                  We're sending your recipe books to <strong>{email}</strong>
                </p>
              </div>
            </div>
          )}

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
                <h3>eBooks Sent Successfully!</h3>
                <p>
                  The eBooks have been sent to <strong>{email}</strong>
                </p>
              </div>
            </div>
          )}

          {emailStatus === "error" && (
            <div className={styles.errorContainer}>
              <div className={styles.errorIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40">
                  <circle cx="12" cy="12" r="11" fill="#F44336" />
                  <path
                    d="M8 8l8 8M16 8l-8 8"
                    stroke="#fff"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.errorText}>
                <h3>Failed to Send eBooks</h3>
                <p>We encountered an issue sending your eBooks.</p>
                <button
                  onClick={sendEmailWithPDFs}
                  className={styles.retryButton}
                >
                  Try Again
                </button>
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
                    We've sent your eBook to {email}. Please check your inbox
                    (and spam folder if needed).
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
