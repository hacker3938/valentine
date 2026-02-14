import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECEIVER = process.env.RECEIVER_EMAIL || "your_email@example.com";

export async function POST(req: NextRequest) {
    try {
        const { type, text } = await req.json();
        let subject = "";
        let html = "";

        const baseStyle = `
      font-family: 'Georgia', serif; 
      color: #4a0404; 
      padding: 20px; 
      background-color: #fdf2f2; 
      border-radius: 10px; 
      border: 1px solid #fecaca;
    `;

        switch (type) {
            case "message":
                subject = "💌 Mumma Left You a Message";
                html = `
          <div style="${baseStyle}">
            <h1 style="color: #be123c;">New Message ❤️</h1>
            <p style="font-size: 18px; font-style: italic;">"${text}"</p>
            <hr style="border-color: #fecaca; margin: 20px 0;">
            <p style="font-size: 12px; color: #881337;">Sent from your Valentine Website</p>
          </div>
        `;
                break;

            case "proposal-yes":
                subject = "💍 She Said YES ❤️";
                html = `
          <div style="${baseStyle}; background-color: #fff1f2; border-color: #fda4af;">
            <h1 style="color: #e11d48; font-size: 32px;">SHE SAID YES! 💍</h1>
            <p style="font-size: 20px;">The golden glow explosion happened! Prepare the ring!</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `;
                break;

            case "proposal-no":
                subject = "💔 She Clicked NO (or tried to)";
                html = `
          <div style="${baseStyle}">
            <h1 style="color: #4c0519;">She clicked NO 😢</h1>
            <p>Maybe she was testing the button? Go ask her!</p>
          </div>
        `;
                break;

            default:
                return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Valentine <love@resend.dev>',
            to: [RECEIVER],
            subject: subject,
            html: html,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
