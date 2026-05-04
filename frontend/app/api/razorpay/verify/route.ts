import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = body;

    // Generate signature
    const generatedSignature = CryptoJS.HmacSHA256(
      razorpay_order_id + "|" + razorpay_payment_id,
      process.env.RAZORPAY_KEY_SECRET!
    ).toString();

    // ✅ Verify payment first
    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // ✅ Only after successful verification
    if (userId) {
      await addDoc(collection(db, "notifications"), {
        userId: userId,
        title: "Payment Successful 🎉",
        message: "Lifetime access unlocked.",
        type: "success",
        read: false,
        createdAt: serverTimestamp(),
      });

      await sendEmail(
  body.email,
  "Payment Successful – SkillsBoostHub 🎉",
  `
  <h2>Payment Successful</h2>
  <p>Hi ${body.name || "Student"},</p>

  <p>Your payment of <b>₹198</b> was successful.</p>

  <p>You now have lifetime access to:</p>

  <ul>
    <li>All Courses</li>
    <li>Recorded Sessions</li>
    <li>PDF Materials</li>
  </ul>

  <p>Login and start learning 🚀</p>

  <a href="https://yourdomain.com/dashboard/home">
  Go To Dashboard
  </a>

  <br/><br/>
  Team SkillsBoostHub
  `
);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}