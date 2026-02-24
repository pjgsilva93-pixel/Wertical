import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Wertical Contact <onboarding@resend.dev>",
    to: "pjgsilva93@gmail.com",
    subject: `New message from ${name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">New contact from Wertical</h2>
        <p style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</p>
        <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
        <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
        <p style="background: #f4f4f4; padding: 16px; border-radius: 8px;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
