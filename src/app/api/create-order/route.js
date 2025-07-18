// app/api/create-order/route.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { name, email, phone, address, city } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    console.log(
      "process.env.NEXT_PUBLIC_EBOOK_PRICE",
      process.env.NEXT_PUBLIC_EBOOK_PRICE
    );
    // Create order
    const order = await razorpay.orders.create({
      amount: process.env.NEXT_PUBLIC_EBOOK_PRICE, // in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        name: name,
        email: email, // Store email in order notes
        phone: phone,
        address: address,
        city: city || "",
      },
    });

    return NextResponse.json({
      orderId: order.id,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// // src/app/api/create-order/route.js
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(request) {
//   try {
//     const formData = await request.json();

//     // Initialize Razorpay
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET_KEY,
//     });

//     // Create order
//     const options = {
//       amount: 9900, // in paisa (₹299)
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city || "",
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json({
//       orderId: order.id,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Create order error:", error);
//     return NextResponse.json(
//       {
//         error: error.message,
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(request) {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET_KEY,
//     });

//     const options = {
//       amount: 9900, // amount in the smallest currency unit (paise)
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return NextResponse.json({ orderId: order.id });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
