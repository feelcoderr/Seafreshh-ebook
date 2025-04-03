import FishLogo from "./FishLogo";

export default function BannerBottom() {
  return (
    <div className="bottom-banner">
      <div className="banner-content">
        <img
          src="/images/favicon.png"
          width={50}
          height={50}
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
        <div className="banner-text">
          <strong>Seafood Recipe eBook</strong>
          <br />
          30+ Authentic Recipes
        </div>
      </div>
      <div className="banner-price">
        <span className="banner-original-price">Rs 499</span>
        <span className="banner-discount-price">₹ 99/-</span>
        <button className="btn btn-dark">Download Now</button>
      </div>
    </div>
  );
}
