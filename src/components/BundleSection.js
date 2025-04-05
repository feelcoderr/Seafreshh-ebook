"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Image from "next/image";

export default function BundleSection() {
  const { openOrderModal } = useContext(AppContext);
  const features = [
    "30થી પણ વધુ વિવિધ પ્રકારની સીફૂડ રેસીપી જેમાં કાઠીયાવાડી, ઇન્ડિયન, BBQ, ફ્રાય, ફિશ બિરયાની અને સૂપ વગેરે.",
    "સીફૂડ બનાવતા પહેલા ધ્યાનમાં રાખવામાં આવતા અમુક પરિબળો ની વિગતવાર માહિતી.",
    " ⁠સીફ્રેશ ની ખાસ પદ્ધતિઓ અને ટીપ્સ જે સ્વાદ બમણો કરી દેશે.",
    " ⁠ફક્ત 99 રૂપિયામાં સીફૂડ કૂકિંગ ની વિગતવાર માહિતી તમે સરળ ભાષામાં મેળવી શકશો",
    "જો તમે પહેલી વખત સીફૂડ ટ્રાય કરતા હોય તો આ બુક તમારા માટે ખૂબ જ ફાયદાકારક રહેશે",
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
            src="/images/ebook-cover.png"
            alt="Seafood Recipe eBook Cover"
            width={500}
            height={800}
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
            <button className="btn" onClick={openOrderModal}>
              DOWNLOAD NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
