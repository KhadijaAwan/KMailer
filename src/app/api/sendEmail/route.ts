import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: any) {
    try {
        const body = await request.json();
        const { fullname, email, subject, description } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ACCOUNT_ID,
                pass: process.env.GMAIL_ACCOUNT_SECRET,
            },
        });

        const mailOption = {
            from: process.env.GMAIL_ACCOUNT_ID,
            to: email,
            subject: subject,
            html: `<h3>${fullname} recently filled the NextJS Email Form.</h3><p>${description}</p>`
        }

        await transporter.sendMail(mailOption);
        return NextResponse.json({ message: "Email Sent Successfully!" }, { status: 200 },);
    }
    catch (error) {
        return NextResponse.json({ message: "Email Senting Failed!" }, { status: 500 },);
    }
}