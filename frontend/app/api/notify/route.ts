import { NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, email, title, message, type = "info" } = body;

    // 1️⃣ Store in Firestore (In-App Notification)
    await addDoc(collection(db, "notifications"), {
      userId,
      email,
      title,
      message,
      type,
      read: false,
      createdAt: serverTimestamp(),
    });

    // 2️⃣ Send Email
    if (email) {
      await resend.emails.send({
        from: "SkillsBoostHub <no-reply@skillsboosthub.com>",
        to: email,
        subject: title,
        html: `
          <h2>${title}</h2>
          <p>${message}</p>
          <p><strong>SkillsBoostHub Team</strong></p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Notify error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
