import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const data = await resend.emails.send({
      from: "SkillsBoostHub <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    });

    console.log("Email sent:", data);

    return data;

  } catch (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
}