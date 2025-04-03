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
    <div className="included-section">
      <h2 className="section-title">What's Inside? 🏆</h2>
      <p
        style={{
          fontSize: "18px",
          maxWidth: "800px",
          margin: "0 auto 60px auto",
          lineHeight: "1.6",
        }}
      >
        With our meticulously crafted{" "}
        <span className="blue-text">30+ authentic recipes</span>, you're not
        just getting a cookbook; you're getting a comprehensive guide to{" "}
        <span className="blue-text">mastering seafood cuisine</span>.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1000px",
          margin: "0 auto",
          gap: "20px",
        }}
      >
        {recipeTypes.map((type, index) => (
          <div
            key={index}
            style={{
              width: "320px",
              padding: "16px",
              border: "2px solid #1976d2",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
              }}
            >
              ✓
            </div>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
