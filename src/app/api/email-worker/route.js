import { NextResponse } from "next/server";
import { sendEmailWithPDFs } from "../../../lib/emailService.js";

const processedPayments = new Set();

export async function POST(req) {
  const event = await req.json();

  try {
    if (event.event === "payment.captured") {
      const payment = event.payload?.payment?.entity;
      const paymentId = payment?.id;
      if (processedPayments.has(paymentId))
        return NextResponse.json({ status: "skipped" });

      processedPayments.add(paymentId);

      const { name, email } = payment?.notes || {};
      const customerEmail = email || payment?.email || "";

      await sendEmailWithPDFs(customerEmail, {
        orderId: paymentId || null,
        name,
      });

      return NextResponse.json({ status: "done" });
    }
    return NextResponse.json({ status: "ignored" });
  } catch (err) {
    console.error("email-worker error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
