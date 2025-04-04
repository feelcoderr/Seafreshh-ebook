"use client";
import { useState } from "react";
import Script from "next/script";

export default function PaymentForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const res = await initializeRazorpay();

      if (!res) {
        setMessage("Razorpay SDK failed to load");
        setLoading(false);
        return;
      }

      // Create order
      const data = await fetch("/api/create-order", {
        method: "POST",
      }).then((t) => t.json());

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "SeaFreshh",
        currency: "INR",
        amount: 9900,
        order_id: data.orderId,
        description: "SeaFreshh Recipe eBook",
        handler: async function (response) {
          // Send eBook after payment verification
          const sendData = await fetch("/api/send-ebook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              paymentId: response.razorpay_payment_id,
            }),
          }).then((t) => t.json());

          if (sendData.success) {
            setMessage(
              "Payment successful! The eBook has been sent to your email."
            );
          }
        },
        prefill: {
          email: email,
        },
        theme: {
          color: "#1976D2",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setMessage("Something went wrong, please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />

      <button onClick={makePayment} disabled={loading} className="btn">
        {loading ? "Processing..." : "DOWNLOAD NOW - ₹99 Only"}
      </button>

      {message && <p className="message">{message}</p>}

      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
