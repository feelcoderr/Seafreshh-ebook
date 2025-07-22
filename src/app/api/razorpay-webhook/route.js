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
  try {
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
    console.log("event?.payload?.order", event?.payload?.order);

    if (event.event === "payment.captured") {
      const payment =
        event.payload.payment.entity || event?.payload?.order?.entity;
      const paymentId = payment?.id;

      console.log("✅ Payment Captured:", payment);

      const { email, name } = payment?.notes || {};
      let customerEmail;
      // Check payment notes for email
      if (payment?.notes && payment?.notes.email) {
        customerEmail = payment.notes.email;
      } else if (payment.email) {
        customerEmail = payment.email;
      }

      //send email
      await sendEmailWithPDFs(email, {
        orderId: paymentId || null,
        name,
      });
    }
    // Return success immediately without waiting for email to complete
    return NextResponse.json({
      success: true,
      message:
        "Payment verified successfully. Your recipe ebooks will be sent to your email shortly.",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
