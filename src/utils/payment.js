import Script from "next/script";

export const initializeRazorpay = () => {
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

export const handleFormSubmit = async (formData) => {
  try {
    const res = await initializeRazorpay();

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      return;
    }

    // Create order on your server
    const orderData = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (!orderData.orderId) {
      throw new Error("Failed to create order");
    }

    // Configure Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: "Seafreshh",
      currency: "INR",
      amount: 9900, // in paisa
      order_id: orderData.orderId,
      description: "Master the Art of Seafood Cooking",
      image: "/images/logo.png", // your logo
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
        city: formData.city || "",
      },
      theme: {
        color: "#4c31ef",
      },
      handler: async function (response) {
        // Verify payment on your server
        const verifyData = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            ...formData,
          }),
        }).then((res) => res.json());

        if (verifyData.success) {
          // Redirect to thank you page with parameters
          // The email will be sent from the thank-you page
          window.location.href = `/thank-you`;
        } else {
          alert("Payment verification failed. Please contact support.");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong. Please try again later.");
  }
};
