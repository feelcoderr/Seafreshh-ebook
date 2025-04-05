import { Resend } from "resend";
import { downloadFileFromDrive } from "../../../lib/googleDrive.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Google Drive file IDs for your PDFs
    const pdf1FileId = process.env.PDF1_FILE_ID;
    const pdf2FileId = process.env.PDF2_FILE_ID;

    // Download PDFs from Google Drive
    const pdf1Buffer = await downloadFileFromDrive(pdf1FileId);
    const pdf2Buffer = await downloadFileFromDrive(pdf2FileId);

    const { email, paymentId } = await request.json();

    // Current date for the email
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const msg = {
      from: "Seafreshh <noreply@book.seafreshh.in>",
      to: email,
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
                      
                      <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #1976D2; background-color: #f8f9fa;">
                        <p style="margin: 0; font-style: italic; font-size: 15px; line-height: 1.5;">"Seafood has always been a passion of mine, and I'm thrilled to share these recipes that have been perfected over years of cooking. I hope they bring as much joy to your table as they have to mine."</p>
                        <p style="margin: 10px 0 0; font-weight: bold; font-size: 15px;">- Chef Rami</p>
                      </div>
                      
                      <p style="font-size: 16px; line-height: 1.5;">If you have any questions about the recipes or need cooking advice, feel free to reply to this email. We're here to help!</p>
                      
                      <p style="font-size: 16px; line-height: 1.5;">Happy cooking,<br>The SeaFreshh Team</p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f5f5f5; padding: 20px 40px; border-top: 1px solid #eeeeee;">
                      <p style="font-size: 14px; color: #666; margin: 0; text-align: center;">© 2025 SeaFreshh - Bringing the ocean's best to your kitchen</p>
                      <p style="font-size: 14px; color: #666; margin: 10px 0 0; text-align: center;">Order received on ${dateString}</p>
                      <p style="font-size: 14px; color: #666; margin: 10px 0 0; text-align: center;">Order ID: ${paymentId}</p>
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
    const { data, error } = await resend.emails.send(msg);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
