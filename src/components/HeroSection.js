import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="hero-section">
      <h1 className="hero-title">
        Master the Art of <span className="blue-text">Seafood</span>
        <br />
        Cooking – Exclusive <span className="blue-text">eBook</span>
      </h1>
      <p className="hero-subtitle">
        30+ Authentic Seafood Recipes | Just <strong>₹99</strong>
      </p>
      <div className="profile-images">
        <div className="profile-image">
          <img
            src="/images/profile-1.jpg"
            width={58}
            height={58}
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              margin: "auto",
            }}
          />
        </div>
        <div className="profile-image">
          <img
            src="/images/profile-2.jpg"
            width={58}
            height={58}
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              margin: "auto",
            }}
          />
        </div>
        <div className="profile-image">
          <img
            src="/images/profile-3.jpg"
            width={58}
            height={58}
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              margin: "auto",
            }}
          />
        </div>
      </div>
      <div className="rating">★ ★ ★ ★ ★</div>
      <p className="trust-text">
        Trusted by <strong>1000+</strong> Seafood Enthusiasts
      </p>
    </div>
  );
}
