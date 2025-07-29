// /src/app/api/razorpay-webhook/route.js (Next.js 13+ with app directory)
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmailWithPDFs } from "../../../lib/emailService.js";
const processedPayments = new Set(); // to track payment id, that don't repeat sending mails
import { qstash } from "../../../lib/qstash.js";

// Helper to get raw body
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
// Extracted processor for async work
async function processWebhookEvent(event) {
  try {
    if (event.event === "payment.captured") {
      const payment =
        event.payload.payment.entity || event?.payload?.order?.entity;
      const paymentId = payment?.id;
      //if payment is already processed
      if (processedPayments.has(paymentId)) {
        console.log(`Skipping duplicate webhook for: ${paymentId}`);
        return;
      }
      processedPayments.add(paymentId); // Mark as seen
      console.log("Processing payment:", paymentId);

      const { email, name } = payment?.notes || {};
      let customerEmail = payment?.notes?.email || payment?.email || "";

      // Send email asynchronously
      await sendEmailWithPDFs(customerEmail, {
        orderId: paymentId || null,
        name,
      });
    }
  } catch (error) {
    console.error("Async processing error:", error);
  }
}

export async function POST(req) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  try {
    // const rawBody = await getRawBody(req);
    const rawBody = await req.text(); //  FIX: get raw text safely
    //   const signature = req.headers["x-razorpay-signature"];
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isAuthentic = signature === expectedSignature;

    if (!isAuthentic) {
      console.error("Invalid Razorpay webhook signature.");
      return NextResponse.json({ status: "unauthorized" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    console.log(
      "🔔 Incoming Event:",
      event.event,
      "Payment ID:",
      event?.payload?.payment?.entity?.id
    );
    // Send to QStash for async processing
    await qstash.publishJSON({
      url: `${process.env.BASE_URL}/api/email-worker`, // e.g. https://your-vercel-domain/api/email-worker
      body: event,
    });
    return NextResponse.json({ status: "ok" });
    /*// Respond immediately
    const response = NextResponse.json({ status: "ok" });
    //  Async processing
    (async () => {
      await processWebhookEvent(event);
    })();
    return response;*/
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
