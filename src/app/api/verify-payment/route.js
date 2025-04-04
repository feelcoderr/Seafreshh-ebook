// src/app/api/verify-payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

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

    const msg = {
      from: "Seafreshh <noreply@book.seafreshh.in>",
      to: email,
      subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
      text: "Thank you for purchasing our SeaFreshh Recipe eBook!",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1976D2;">Thank you for your purchase!</h2>
            <p>Dear Customer,</p>
            <p>Your SeaFreshh Recipe eBook is attached to this email. Enjoy cooking delicious seafood dishes!</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Happy Cooking!</p>
            <p>The SeaFreshh Team</p>
          </div>
        `,
      attachments: [
        {
          content: process.env.EBOOK_BASE64,
          filename: "SeaFreshh-Recipes.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };
    const { data, error } = await resend.emails.send(msg);

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
