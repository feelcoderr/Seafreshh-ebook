// app/api/webhooks/razorpay/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmailWithPDFs } from "../../../../lib/emailService.js";

export const maxDuration = 60;

export async function POST(request) {
  console.log("Razorpay webhook received");

  try {
    // Clone the request to ensure we can read the body as text
    const clonedRequest = request.clone();

    // Get the raw request body as text
    const rawBody = await clonedRequest.text();

    const razorpaySignature = request.headers.get("x-razorpay-signature");
    console.log("razorpay signature", razorpaySignature);
    if (!razorpaySignature) {
      console.error("Missing Razorpay signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Verify webhook signature using your webhook secret
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    console.log("webhook secret", webhookSecret);
    if (!webhookSecret) {
      console.error("RAZORPAY_WEBHOOK_SECRET environment variable is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    // Verify that the signatures match
    if (razorpaySignature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody);
    console.log(`Webhook event: ${payload.event}`);

    // Only process payment.authorized or payment.captured events
    if (
      payload.event === "payment.authorized" ||
      payload.event === "payment.captured"
    ) {
      const payment = payload.payload.payment.entity;
      const paymentId = payment.id;

      // Get customer email - first try to get from notes, then from customer info
      let customerEmail = null;

      // Check payment notes for email
      if (payment.notes && payment.notes.email) {
        customerEmail = payment.notes.email;
      }
      // Try to get from order notes if available
      else if (
        payload.payload.order &&
        payload.payload.order.entity &&
        payload.payload.order.entity.notes &&
        payload.payload.order.entity.notes.email
      ) {
        customerEmail = payload.payload.order.entity.notes.email;
      }
      // As a last resort, try the customer's email if available
      else if (payment.email) {
        customerEmail = payment.email;
      }

      if (!customerEmail) {
        console.error(`No email found for payment ${paymentId}`);
        return NextResponse.json(
          {
            error: "No email found in payment data",
            payment: paymentId,
          },
          { status: 400 }
        );
      }

      console.log(`Processing payment ${paymentId} for email ${customerEmail}`);

      try {
        sendEmailWithPDFs(customerEmail, { orderId: paymentId })
          .then((result) => {
            console.log(
              `Email sent successfully to ${customerEmail} for payment ${paymentId}`
            );
          })
          .catch((error) => {
            console.error(`Failed to send email to ${customerEmail}:`, error);
          });

        // Respond to Razorpay immediately
        return NextResponse.json({
          status: "processing",
          message: "Email sending initiated",
        });
      } catch (emailError) {
        console.error(`Error initiating email sending:`, emailError);
        // Still return a 200 response to Razorpay
        return NextResponse.json({
          status: "error",
          message: "Error initiating email sending",
        });
      }
    }

    // For other event types, just acknowledge receipt
    return NextResponse.json({
      status: "ignored",
      message: `Event ${payload.event} not processed`,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
