import { NextResponse } from "next/server";
import { sendEmailWithPDFs } from "../../../lib/emailService.js";
import { downloadFileFromDrive } from "../../../lib/googleDrive.js";

const processedPayments = new Set();

export async function POST(req) {
  const { email, orderId, name } = await req.json();

  try {
    console.log("this is email worker");
    const { PDF1_FILE_ID, PDF2_FILE_ID } = process.env;

    if (!PDF1_FILE_ID || !PDF2_FILE_ID) {
      throw new Error("Missing PDF file IDs in env");
    }
    let pdf1Buffer, pdf2Buffer;
    // Download PDFs in parallel
    // try {
    //   [pdf1Buffer, pdf2Buffer] = await Promise.all([
    //     downloadFileFromDrive(PDF1_FILE_ID),
    //     downloadFileFromDrive(PDF2_FILE_ID),
    //   ]);
    // } catch (error) {
    //   console.log("error after downloading pdf promise ", error);
    // }
    await sendEmailWithPDFs({ email, orderId: orderId || null, name });

    return NextResponse.json({ status: "done" });
  } catch (err) {
    console.error("email-worker error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
