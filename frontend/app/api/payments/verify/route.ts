// app/api/payments/verify/route.ts
import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import admin from "firebase-admin"; // NOTE: if using firebase-admin server-side; if not, use firestore client + service account
import { getFirestore } from "firebase-admin/firestore";

/*
  If you already have firebase-admin initialized on server (with service account),
  use it. If not, you can use Firestore client with environment credentials.
  Below is an example using admin SDK. Make sure to initialize admin with your
  service account in a global file (or do the initialization here — but keep
  credentials secure).
*/

if (!admin.apps.length) {
  // initialize with your service account JSON or GOOGLE_APPLICATION_CREDENTIALS env var
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccountObject),
    // or rely on GOOGLE_APPLICATION_CREDENTIALS env var if set
  });
}

const db = getFirestore();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // expected: { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, product }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, product } = body;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const generatedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Signature valid => mark user as paid for product or subscription
    // Example: update Firestore users collection: add field `payments` or `hasPaidAllCourses: true`
    if (userId) {
      const userRef = db.collection("users").doc(userId);
      await userRef.set(
        {
          payments: admin.firestore.FieldValue.arrayUnion({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            product,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          }),
          hasPaidAllCourses: true, // or use a 'subscriptions' object
        },
        { merge: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("verify error", err);
    return NextResponse.json({ error: err.message || "verify failed" }, { status: 500 });
  }
}
