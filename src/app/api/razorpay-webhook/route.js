// /src/app/api/razorpay-webhook/route.js (Next.js 13+ with app directory)
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmailWithPDFs } from "../../../lib/emailService.js";

// Helper to get raw body
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function POST(req) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const rawBody = await getRawBody(req);
  //   const signature = req.headers["x-razorpay-signature"];
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  const isAuthentic = signature === expectedSignature;

  if (!isAuthentic) {
    console.error("❌ Invalid Razorpay webhook signature.");
    return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  console.log("event", event);
  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    console.log("✅ Payment Captured:", payment);
    const { email, name, razorpay_payment_id } = payment.notes || {};
    //  send email
    await sendEmailWithPDFs(email, {
      orderId: razorpay_payment_id,
      name,
    });
  }
  // Return success immediately without waiting for email to complete
  return NextResponse.json({
    success: true,
    message:
      "Payment verified successfully. Your recipe ebooks will be sent to your email shortly.",
  });
}
