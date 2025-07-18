// src/app/api/test-email/route.js
import { sendEmailWithPDFs } from "../../../lib/emailService.js";

export async function GET() {
  const result = await sendEmailWithPDFs("diptipariya@gmail.com", {
    orderId: "test123",
    name: "Test User",
  });
  return NextResponse.json(result);
}
