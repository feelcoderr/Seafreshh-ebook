// lib/emailService.js
import { Resend } from "resend";
import { downloadFileFromDrive } from "./googleDrive.js";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_USER,
    pass: process.env.NEXT_PUBLIC_SMTP_PASS,
  },
});

// Maximum retries for email sending
const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds

export async function sendEmailWithPDFs(
  customerEmail,
  orderDetails,
  retryCount = 0
) {
  try {
    console.log(
      `Attempt ${retryCount + 1}: Preparing to send PDFs to ${customerEmail} for order ${orderDetails.orderId}`
    );

    if (!customerEmail) {
      throw new Error("Customer email is required");
    }

    if (!orderDetails || !orderDetails.orderId) {
      throw new Error("Order details with orderId are required");
    }

    // Get PDF file IDs from environment variables
    const pdf1FileId = process.env.PDF1_FILE_ID;
    const pdf2FileId = process.env.PDF2_FILE_ID;

    if (!pdf1FileId || !pdf2FileId) {
      throw new Error("PDF file IDs are not configured");
    }

    // Download PDFs from Google Drive in parallel
    console.log("Downloading PDFs from Google Drive");
    let pdf1Buffer, pdf2Buffer;
    console.log("Node version:", process.version);
    console.log("NODE_OPTIONS:", process.env.NODE_OPTIONS);
    try {
      [pdf1Buffer, pdf2Buffer] = await Promise.all([
        downloadFileFromDrive(pdf1FileId),
        downloadFileFromDrive(pdf2FileId),
      ]);
      console.log("PDFs downloaded successfully, preparing email");
    } catch (downloadError) {
      console.error("Error downloading PDFs:", downloadError);

      // Retry logic for PDF download
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying download in ${RETRY_DELAY}ms...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return sendEmailWithPDFs(customerEmail, orderDetails, retryCount + 1);
      } else {
        throw new Error(
          `Failed to download PDFs after ${MAX_RETRIES} attempts: ${downloadError.message}`
        );
      }
    }

    // Current date for the email
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create email data
    const emailData = {
      from: "Seafreshh <noreply@book.seafreshh.in>",
      to: customerEmail,
      subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
      text: "Thank you for purchasing our SeaFreshh Recipe eBook!",
      html: `
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
      `,
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
    };

    console.log(`Sending email to ${customerEmail}`);
    // sending email using node mailer

    try {
      const info = await transporter.sendMail(emailData);
      console.log(`Email sent successfully to ${customerEmail}`);
      return { success: true, info };
    } catch (error) {
      if (error) {
        console.error("Resend API error:", error);

        // Retry logic for email sending
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying email in ${RETRY_DELAY}ms...`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return sendEmailWithPDFs(customerEmail, orderDetails, retryCount + 1);
        } else {
          throw new Error(
            `Email sending failed after ${MAX_RETRIES} attempts: ${error.message || "Unknown error"}`
          );
        }
      }
    }

    // const { data, error } = await resend.emails.send(emailData);
  } catch (error) {
    console.error(`Failed to send email to ${customerEmail}:`, error);

    // Final retry attempt
    if (retryCount < MAX_RETRIES) {
      console.log(`Final retry attempt in ${RETRY_DELAY}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return sendEmailWithPDFs(customerEmail, orderDetails, retryCount + 1);
    }

    throw error;
  }
}

// // lib/emailService.js
// import { Resend } from "resend";
// import { downloadFileFromDrive } from "./googleDrive.js";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendEmailWithPDFs(customerEmail, orderDetails) {
//   try {
//     if (!customerEmail) {
//       throw new Error("Customer email is required");
//     }

//     if (!orderDetails || !orderDetails.orderId) {
//       throw new Error("Order details with orderId are required");
//     }

//     console.log(
//       `Preparing to send PDFs to ${customerEmail} for order ${orderDetails.orderId}`
//     );

//     // Get PDF file IDs from environment variables
//     const pdf1FileId = process.env.PDF1_FILE_ID;
//     const pdf2FileId = process.env.PDF2_FILE_ID;

//     if (!pdf1FileId || !pdf2FileId) {
//       throw new Error("PDF file IDs are not configured");
//     }

//     // Download PDFs from Google Drive in parallel
//     console.log("Downloading PDFs from Google Drive");
//     const [pdf1Buffer, pdf2Buffer] = await Promise.all([
//       downloadFileFromDrive(pdf1FileId),
//       downloadFileFromDrive(pdf2FileId),
//     ]);

//     console.log("PDFs downloaded successfully, preparing email");

//     // Current date for the email
//     const today = new Date();
//     const dateString = today.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     // Create and send the email
//     const emailData = {
//       from: "Seafreshh <noreply@book.seafreshh.in>",
//       to: customerEmail,
//       subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
//       text: "Thank you for purchasing our SeaFreshh Recipe eBook!",
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Your SeaFreshh Recipe eBook is Here!</title>
//         </head>
//         <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9;">
//           <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
//             <tr>
//               <td align="center" style="padding: 20px 0;">
//                 <table role="presentation" style="max-width: 600px; border-radius: 8px; overflow: hidden; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0,0,0,0.05);" width="100%" cellspacing="0" cellpadding="0" border="0">
//                   <!-- Header -->
//                   <tr>
//                     <td style="padding: 0;">
//                       <div style="background-color: #1976D2; text-align: center; padding: 30px 20px;">
//                         <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Your SeaFreshh Recipe eBook</h1>
//                         <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Dive into delicious seafood recipes!</p>
//                       </div>
//                     </td>
//                   </tr>

//                   <!-- Main Content -->
//                   <tr>
//                     <td style="padding: 30px 40px;">
//                       <p style="margin-top: 0; font-size: 16px; line-height: 1.5;">Dear Seafood Lover,</p>
//                       <p style="font-size: 16px; line-height: 1.5;">Thank you for purchasing the <strong>SeaFreshh Recipe eBook!</strong> We're excited to be part of your culinary journey.</p>

//                       <div style="background-color: #e8f4fd; border-radius: 6px; padding: 20px; margin: 25px 0;">
//                         <h2 style="color: #1976D2; margin-top: 0; font-size: 18px;">📚 Your eBooks Are Attached</h2>
//                         <p style="margin-bottom: 0; font-size: 15px; line-height: 1.5;">We've included both English and Gujarati versions of our recipe collection. Simply download and open the PDF files to start exploring 30+ delicious seafood recipes!</p>
//                       </div>

//                       <h2 style="color: #1976D2; font-size: 18px; margin-top: 25px;">🔥 What's Inside Your eBook:</h2>
//                       <ul style="padding-left: 20px; font-size: 15px; line-height: 1.6;">
//                         <li><strong>30+ Authentic Seafood Recipes</strong> - From classic favorites to innovative new dishes</li>
//                         <li><strong>Step-by-Step Instructions</strong> - Easy to follow, even for beginners</li>
//                         <li><strong>Beautiful Food Photography</strong> - See what your dishes should look like</li>
//                         <li><strong>Cooking Tips and Techniques</strong> - Master the art of seafood preparation</li>
//                       </ul>

//                       <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #1976D2; background-color: #f8f9fa;">
//                         <p style="margin: 0; font-style: italic; font-size: 15px; line-height: 1.5;">"Seafood has always been a passion of mine, and I'm thrilled to share these recipes that have been perfected over years of cooking. I hope they bring as much joy to your table as they have to mine."</p>
//                         <p style="margin: 10px 0 0; font-weight: bold; font-size: 15px;">- Chef Anil, Founder of SeaFreshh</p>
//                       </div>

//                       <p style="font-size: 16px; line-height: 1.5;">If you have any questions about the recipes or need cooking advice, feel free to reply to this email. We're here to help!</p>

//                       <p style="font-size: 16px; line-height: 1.5;">Happy cooking,<br>The SeaFreshh Team</p>
//                     </td>
//                   </tr>

//                   <!-- Footer -->
//                   <tr>
//                     <td style="background-color: #f5f5f5; padding: 20px 40px; border-top: 1px solid #eeeeee;">
//                       <p style="font-size: 14px; color: #666; margin: 0; text-align: center;">© 2025 SeaFreshh - Bringing the ocean's best to your kitchen</p>
//                       <p style="font-size: 14px; color: #666; margin: 10px 0 0; text-align: center;">Order received on ${dateString}</p>
//                       <p style="font-size: 14px; color: #666; margin: 10px 0 0; text-align: center;">Order ID: ${orderDetails.orderId}</p>
//                     </td>
//                   </tr>
//                 </table>
//               </td>
//             </tr>
//           </table>
//         </body>
//         </html>
//       `,
//       attachments: [
//         {
//           filename: "SeaFreshh-Recipes-Gujarati.pdf",
//           content: pdf1Buffer,
//         },
//         {
//           filename: "SeaFreshh-Recipes-English.pdf",
//           content: pdf2Buffer,
//         },
//       ],
//     };

//     console.log(`Sending email to ${customerEmail}`);
//     const { data, error } = await resend.emails.send(emailData);

//     if (error) {
//       console.error("Resend API error:", error);
//       throw new Error(
//         `Email sending failed: ${error.message || "Unknown error"}`
//       );
//     }

//     console.log(`Email sent successfully to ${customerEmail}`);
//     return { success: true, data };
//   } catch (error) {
//     console.error(`Failed to send email to ${customerEmail}:`, error);
//     throw error;
//   }
// }

export async function sendSimpleEmailWithPDFs(customerEmail, orderDetails) {
  try {
    if (!customerEmail) {
      throw new Error("Customer email is required");
    }

    // Get PDF file IDs from environment variables
    const pdf1FileId = process.env.PDF1_FILE_ID;
    const pdf2FileId = process.env.PDF2_FILE_ID;

    if (!pdf1FileId || !pdf2FileId) {
      throw new Error("PDF file IDs are not configured");
    }

    // Download PDFs from Google Drive in parallel
    const [pdf1Buffer, pdf2Buffer] = await Promise.all([
      downloadFileFromDrive(pdf1FileId),
      downloadFileFromDrive(pdf2FileId),
    ]);

    // Simplified HTML email
    const simpleHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1976D2; color: white; padding: 20px; text-align: center;">
          <h1>Your SeaFreshh Recipe eBook</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear Seafood Lover,</p>
          <p>Thank you for purchasing the <strong>SeaFreshh Recipe eBook!</strong></p>
          <p>Your recipes are attached to this email in both English and Gujarati.</p>
          <p>Happy cooking!<br>The SeaFreshh Team</p>
        </div>
      </div>
    `;

    try {
      const info = await transporter.sendMail({
        from: "Seafreshh <noreply@book.seafreshh.in>",
        to: customerEmail,
        subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
        html: simpleHtml,
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

      return { success: true, data };
    } catch (error) {
      if (error) {
        console.error("Resend API error:", error);
        throw new Error(
          `Email sending failed: ${error.message || "Unknown error"}`
        );
      }
    }
    /*const { data, error } = await resend.emails.send({
      from: "Seafreshh <noreply@book.seafreshh.in>",
      to: customerEmail,
      subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
      html: simpleHtml,
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
    });*/
  } catch (error) {
    console.error(`Failed to send email to ${customerEmail}:`, error);
    throw error;
  }
}
