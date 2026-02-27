import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  const body = await req.json();

  const generatedSignature = CryptoJS.HmacSHA256(
    body.razorpay_order_id + "|" + body.razorpay_payment_id,
    process.env.RAZORPAY_KEY_SECRET!
  ).toString();

  if (generatedSignature === body.razorpay_signature) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}
