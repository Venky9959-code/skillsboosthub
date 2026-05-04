import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // ₹1 TEST PAYMENT → 100 paise
    const order = await razorpay.orders.create({
      amount: 1 * 100,
      currency: "INR",
      receipt: "skillsboosthub_receipt",
    });

    // ✅ NORMALIZED RESPONSE (IMPORTANT)
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
