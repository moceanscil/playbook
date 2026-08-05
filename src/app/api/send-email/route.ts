import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { to, subject, body } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text: body,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Email failed" },
      { status: 500 }
    );
  }
}
