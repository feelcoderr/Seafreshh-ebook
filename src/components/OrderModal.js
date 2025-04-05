// src/components/OrderModal.js
"use client";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import FishLogo from "./FishLogo";
import styles from "./OrderModal.module.css";

export default function OrderModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on the body when modal is open
      document.body.style.overflow = "hidden";
    }

    // Clean up function to re-enable scrolling when modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "This field is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Call the onSubmit callback with form data
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.modalGrid}>
          {/* Left Column - Product Details */}
          <div className={styles.productColumn}>
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/favicon.png"
                  alt="Seafood Recipe eBook"
                  width={50}
                  height={50}
                  className={styles.ebookImage}
                />
              </div>
              <h3>SeaFreshh</h3>
            </div>

            <div className={styles.ebookPreview}>
              <div className={styles.ebookImageContainer}>
                <Image
                  src="/images/ebook-cover.png"
                  alt="Seafood Recipe eBook"
                  width={240}
                  height={320}
                  className={styles.ebookImage}
                />
                <div className={styles.ebookShadow}></div>
              </div>

              <h2>Master the Art of Seafood Cooking</h2>
              <p className={styles.ebookDescription}>
                Unlock 30+ authentic seafood recipes and professional cooking
                techniques
              </p>

              <div className={styles.featureGrid}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🍽️</div>
                  <div className={styles.featureText}>30+ Premium Recipes</div>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>👨‍🍳</div>
                  <div className={styles.featureText}>Pro Chef Tips</div>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🔄</div>
                  <div className={styles.featureText}>10 Cooking Styles</div>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>⬇️</div>
                  <div className={styles.featureText}>Instant Download</div>
                </div>
              </div>

              <div className={styles.reviewsContainer}>
                <div className={styles.stars}>★★★★★</div>
                <p>Loved by 1000+ seafood enthusiasts</p>
              </div>
            </div>
          </div>

          {/* Right Column - Checkout Form */}
          <div className={styles.checkoutColumn}>
            <h2>Complete Your Purchase</h2>

            <div className={styles.pricingContainer}>
              <div className={styles.pricingDetails}>
                <div className={styles.pricingTitle}>
                  SeaFreshh Recipe eBook
                </div>
                <div className={styles.pricingOriginal}>₹499</div>
              </div>
              <div className={styles.pricingDiscount}>
                <div className={styles.discountLabel}>Limited Time Offer</div>
                <div className={styles.discountPrice}>₹99</div>
              </div>
              <div className={styles.savingsLabel}>You save ₹400 (80%)</div>
            </div>

            <form onSubmit={handleSubmit} className={styles.checkoutForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <div className={styles.phoneInput}>
                  <div className={styles.countryCode}>+91</div>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>

              <button
                type="submit"
                className={styles.payButton}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.loadingIndicator}>
                    <span className={styles.loadingDot}></span>
                    <span className={styles.loadingDot}></span>
                    <span className={styles.loadingDot}></span>
                  </span>
                ) : (
                  <>
                    <span className={styles.buttonIcon}>🔒</span>
                    Pay Securely ₹99
                  </>
                )}
              </button>
            </form>

            <div className={styles.securityNotice}>
              <div className={styles.securityItem}>
                <span className={styles.securityIcon}>📧</span>
                <span>Instant delivery to your email</span>
              </div>
              <div className={styles.securityItem}>
                <span className={styles.securityIcon}>🔒</span>
                <span>Secure payment processing</span>
              </div>
              <div className={styles.securityItem}>
                <span className={styles.securityIcon}>✅</span>
                <span>100% satisfaction guarantee</span>
              </div>
            </div>

            <div className={styles.paymentMethods}>
              <p>Powered by</p>
              <div className={styles.paymentLogo}>Razorpay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// // src/components/OrderModal.js
// "use client";
// import { useState } from "react";
// import styles from "./OrderModal.module.css";

// export default function OrderModal({ isOpen, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "This field is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "This field is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "This field is required";
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = "This field is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // Call the onSubmit callback with form data
//       await onSubmit(formData);
//     } catch (error) {
//       console.error("Form submission error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <div className={styles.modalHeader}>
//           <h2>Master the Art of Seafood Cooking</h2>
//           <button className={styles.closeButton} onClick={onClose}>
//             ×
//           </button>
//         </div>

//         <div className={styles.productInfo}>
//           <div className={styles.orderForm}>
//             <div className={styles.priceTag}>
//               <span>₹</span>
//               <span className={styles.price}>299</span>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className={styles.formGroup}>
//                 <div className={styles.phoneInput}>
//                   <div className={styles.countryCode}>+91</div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 {errors.phone && <p className={styles.error}>{errors.phone}</p>}
//               </div>

//               <div className={styles.formGroup}>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email ID"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p className={styles.error}>{errors.email}</p>}
//               </div>

//               <div className={styles.formGroup}>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 {errors.name && <p className={styles.error}>{errors.name}</p>}
//               </div>

//               <div className={styles.formGroup}>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//                 {errors.address && (
//                   <p className={styles.error}>{errors.address}</p>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className={styles.payButton}
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Pay Securely ₹299.00"}
//               </button>
//             </form>

//             <div className={styles.paymentNote}>
//               <p>
//                 The product will be delivered to the{" "}
//                 <strong>Gmail account</strong> you enter while making the
//                 payment.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
