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
    let pdf1Buffer, pdf2Buffer;
    // Download PDFs in parallel
    try {
      [pdf1Buffer, pdf2Buffer] = await Promise.all([
        downloadFileFromDrive(PDF1_FILE_ID),
        downloadFileFromDrive(PDF2_FILE_ID),
      ]);
    } catch (error) {
      console.log("error after downloading pdf promise ", error);
    }
    console.log("✅ Both PDF files downloaded");
    const dateString = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your SeaFreshh Recipe eBook is Here!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" style="max-width: 600px; border-radius: 8px; overflow: hidden; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0,0,0,0.05);" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 0;">
                      <div style="background-color: #1976D2; text-align: center; padding: 30px 20px;">
                        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Your SeaFreshh Recipe eBook</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Dive into delicious seafood recipes!</p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 30px 40px;">
                      <p style="margin-top: 0; font-size: 16px; line-height: 1.5;">Dear Seafood Lover,</p>
                      <p style="font-size: 16px; line-height: 1.5;">Thank you for purchasing the <strong>SeaFreshh Recipe eBook!</strong> We're excited to be part of your culinary journey.</p>
                      
                      <div style="background-color: #e8f4fd; border-radius: 6px; padding: 20px; margin: 25px 0;">
                        <h2 style="color: #1976D2; margin-top: 0; font-size: 18px;">📚 Your eBooks Are Attached</h2>
                        <p style="margin-bottom: 0; font-size: 15px; line-height: 1.5;">We've included both English and Gujarati versions of our recipe collection. Simply download and open the PDF files to start exploring 30+ delicious seafood recipes!</p>
                      </div>
                      
                      <h2 style="color: #1976D2; font-size: 18px; margin-top: 25px;">🔥 What's Inside Your eBook:</h2>
                      <ul style="padding-left: 20px; font-size: 15px; line-height: 1.6;">
                        <li><strong>30+ Authentic Seafood Recipes</strong> - From classic favorites to innovative new dishes</li>
                        <li><strong>Step-by-Step Instructions</strong> - Easy to follow, even for beginners</li>
                        <li><strong>Beautiful Food Photography</strong> - See what your dishes should look like</li>
                        <li><strong>Cooking Tips and Techniques</strong> - Master the art of seafood preparation</li>
                      </ul>
                      
                      <p style="font-size: 16px; line-height: 1.5;">If you have any questions about the recipes or need cooking advice, feel free to reply to this email. We're here to help!</p>
                      
                      <p style="font-size: 16px; line-height: 1.5;">Happy cooking,<br>The SeaFreshh Team</p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f5f5f5; padding: 20px 40px; border-top: 1px solid #eeeeee;">
                      <p style="font-size: 14px; color: #666; margin: 0; text-align: center;">© 2025 SeaFreshh - Bringing the ocean's best to your kitchen</p>
                      <p style="font-size: 14px; color: #666; margin: 10px 0 0; text-align: center;">Order received on ${dateString}</p>
                      <p style="font-size: 14px; color: #666; margin: 10px 0 0; text-align: center;">Order ID: ${orderDetails.orderId}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

    console.log(`Sending email to ${customerEmail}`);

    const emailInfo = await transporter.sendMail({
      from: "Seafreshh <noreply@book.seafreshh.in>",
      to: customerEmail,
      subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
      text: "Thank you for purchasing our SeaFreshh Recipe eBook!",
      html,
      attachments: [
        {
          filename: "SeaFreshh-Recipes-Gujarati.pdf",
          content: pdf1Buffer,
          contentType: "application/pdf",
        },
        {
          filename: "SeaFreshh-Recipes-English.pdf",
          content: pdf2Buffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log(`[Email] Sent successfully to ${customerEmail}`);
    return { success: true, info: emailInfo };
  } catch (error) {
    console.log("error at emailservice catch ", error);
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
