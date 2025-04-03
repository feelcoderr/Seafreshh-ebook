export default function LimitedOfferSection() {
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
            Get Your eBook Today for Just ₹99!
          </h3>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            📥 Instant Digital Download | 100% Satisfaction Guarantee
          </p>
          <p style={{ fontSize: "18px", marginBottom: "30px" }}>
            After purchase, the eBook will be delivered to your email address
            within minutes.
          </p>
          <button
            className="btn"
            style={{
              backgroundColor: "#003366",
              fontSize: "22px",
              padding: "15px 40px",
            }}
          >
            DOWNLOAD NOW
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
