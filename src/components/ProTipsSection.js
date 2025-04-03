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
    <div className="included-section" style={{ backgroundColor: "#001f3f" }}>
      <h2 className="section-title">Pro Chef Tips Included 👨‍🍳</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1000px",
          margin: "40px auto 0",
          gap: "20px",
        }}
      >
        {tips.map((tip, index) => (
          <div
            key={index}
            style={{
              width: "320px",
              padding: "20px",
              border: "2px solid #1976d2",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#2196f3",
                marginBottom: "15px",
              }}
            >
              {tip.title}
            </div>
            <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
