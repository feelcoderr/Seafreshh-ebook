// src/app/api/verify-payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { downloadFileFromDrive } from "../../../lib/googleDrive.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      name,
      email,
      phone,
      address,
      city,
    } = await request.json();

    // Verify payment signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
