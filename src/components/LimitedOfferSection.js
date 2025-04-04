// src/components/LimitedOfferSection.js
"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function LimitedOfferSection() {
  const { openOrderModal } = useContext(AppContext);

  return (
    <div className="access-section">
      <div className="access-container">
        <h2 className="section-title" style={{ color: "#333" }}>
          Limited-Time Offer!
        </h2>

        <div
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "800px",
            margin: "30px auto",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>
            Get Your Bundle Today for Just ₹299!
          </h3>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            📥 Instant Digital Download | 100% Satisfaction Guarantee
          </p>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            After purchase, the bundle will be delivered to your email address
            within minutes.
          </p>
          <button
            className="btn"
            style={{
              backgroundColor: "#003366",
              fontSize: "22px",
              padding: "15px 40px",
            }}
            onClick={openOrderModal}
          >
            BUY NOW
          </button>
        </div>

        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
            <strong>Secure Payment</strong> | <strong>Instant Access</strong> |
            <strong>100% Satisfaction Guarantee</strong>
          </p>
          <p style={{ fontSize: "16px", color: "#555" }}>
            Have questions? Contact us or DM us on social media.
          </p>
        </div>
      </div>
    </div>
  );
}
