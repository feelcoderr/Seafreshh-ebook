// lib/emailService.js
import nodemailer from "nodemailer";
import { downloadFileFromDrive } from "./googleDrive.js";

// Retry config
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // milliseconds

// Setup transporter using environment variables
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.SMTP_USER, // No NEXT_PUBLIC_ for server-side secrets
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends an email with attached PDFs
 */
export async function sendEmailWithPDFs(
  customerEmail,
  orderDetails,
  retryCount = 0
) {
  try {
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("PDF1_FILE_ID:", process.env.PDF1_FILE_ID);

    if (!customerEmail || !orderDetails?.orderId) {
      throw new Error("Missing customer email or order ID");
    }

    console.log(
      `[Email] Attempt ${retryCount + 1} sending to: ${customerEmail}`
    );

    const { PDF1_FILE_ID, PDF2_FILE_ID } = process.env;

    if (!PDF1_FILE_ID || !PDF2_FILE_ID) {
      throw new Error("Missing PDF file IDs in env");
    }

    // Download PDFs in parallel
    const [pdf1Buffer, pdf2Buffer] = await Promise.all([
      downloadFileFromDrive(PDF1_FILE_ID),
      downloadFileFromDrive(PDF2_FILE_ID),
    ]);

    const dateString = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const html = `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color: #1976D2;">Your SeaFreshh Recipe eBook</h2>
        <p>Dear Customer,</p>
        <p>Thank you for your order. Your eBooks are attached.</p>
        <p>Order ID: <strong>${orderDetails.orderId}</strong><br>
           Order Date: <strong>${dateString}</strong></p>
        <p>Happy cooking!<br>SeaFreshh Team</p>
      </div>
    `;

    const emailInfo = await transporter.sendMail({
      from: `"SeaFreshh" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
      html,
      attachments: [
        {
          filename: "SeaFreshh-Recipes-Gujarati.pdf",
          content: pdf1Buffer,
        },
        {
          filename: "SeaFreshh-Recipes-English.pdf",
          content: pdf2Buffer,
        },
      ],
    });

    console.log(`[Email] Sent successfully to ${customerEmail}`);
    return { success: true, info: emailInfo };
  } catch (error) {
    console.error(`[Email] Error (attempt ${retryCount + 1}):`, error.message);

    if (retryCount < MAX_RETRIES) {
      console.log(`[Email] Retrying in ${RETRY_DELAY}ms...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
      return sendEmailWithPDFs(customerEmail, orderDetails, retryCount + 1);
    }

    throw new Error(
      `[Email] Failed after ${MAX_RETRIES} attempts: ${error.message}`
    );
  }
}
