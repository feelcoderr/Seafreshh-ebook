import Image from "next/image";

export default function BundleSection() {
  const features = [
    "Over 1000 customized templates that meet industry standards for startups",
    "Ready-to-use templates that save hours of documentation work",
    "Templates aligned with compliance and regulatory requirements",
    "Proven templates that give your startup a professional appearance",
    "Lifetime updates to stay current with latest business practices",
  ];

  return (
    <div className="bundle-section">
      <h2 className="section-title">Seafood Recipe eBook</h2>
      <p className="bundle-subtitle">
        Welcome to Your <span className="blue-text">One-Stop Solution</span> for
        Authentic
        <br />
        Seafood Recipes and Cooking Techniques!
      </p>
      <div className="bundle-container">
        <div className="bundle-image-wrapper">
          <Image
            src="/images/ebook-cover.avif"
            alt="Seafood Recipe eBook Cover"
            width={300}
            height={450}
            className="bundle-image"
          />
        </div>
        <div className="bundle-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">✓</div>
              <div>{feature}</div>
            </div>
          ))}
          <div className="price-container">
            <div className="price">
              <span className="original-price">₹ 499</span>
              <span className="discounted-price">₹ 99/-</span>
            </div>
            <button className="btn">DOWNLOAD NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}
