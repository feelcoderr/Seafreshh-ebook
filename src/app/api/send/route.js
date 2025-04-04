import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, paymentId } = await request.json();
    const msg = {
      from: "Seafreshh <noreply@book.seafreshh.in>",
      to: email,
      subject: "Your SeaFreshh Recipe eBook is Here! 🦐",
      text: "Thank you for purchasing our SeaFreshh Recipe eBook!",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1976D2;">Thank you for your purchase!</h2>
            <p>Dear Customer,</p>
            <p>Your SeaFreshh Recipe eBook is attached to this email. Enjoy cooking delicious seafood dishes!</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Happy Cooking!</p>
            <p>The SeaFreshh Team</p>
          </div>
        `,
      attachments: [
        {
          content: process.env.EBOOK_BASE64,
          filename: "SeaFreshh-Recipes.pdf",
          type: "application/pdf",
          disposition: "attachment",
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
