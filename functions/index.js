const functions = require("firebase-functions");
const express = require("express");
const Razorpay = require("razorpay");
const admin = require("firebase-admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(express.json());

/* ------------------------------------
   EMAIL TRANSPORT (GMAIL)
------------------------------------ */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().mail.user,   // your gmail
    pass: functions.config().mail.pass,   // app password
  },
});

/* ------------------------------------
   RAZORPAY SETUP
------------------------------------ */
const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.key_secret,
});

/* ------------------------------------
   CREATE ORDER
------------------------------------ */
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    });

    res.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ------------------------------------
   VERIFY PAYMENT (UNCHANGED FLOW)
------------------------------------ */
app.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      email,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", functions.config().razorpay.key_secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ ok: false, verified: false });
    }

    // 1️⃣ Unlock access
    await db.collection("users").doc(userId).set(
      {
        paymentStatus: "paid",
        paid: true,
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // 2️⃣ Store payment
    await db.collection("payments").add({
      userId,
      razorpay_order_id,
      razorpay_payment_id,
      amount: 198,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 3️⃣ Create notification (EMAIL SENT LATER VIA TRIGGER)
    await db.collection("notifications").add({
      userId,
      email,
      title: "Payment Successful 🎉",
      message:
        "Your payment was successful. Lifetime access is now unlocked!",
      type: "success",
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ ok: true, verified: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/* ------------------------------------
   🔔 SEND EMAIL WHEN NOTIFICATION CREATED
------------------------------------ */
exports.sendNotificationEmail = functions.firestore
  .document("notifications/{id}")
  .onCreate(async (snap) => {
    const data = snap.data();
    if (!data.email) return;

    const userSnap = await db.collection("users").doc(data.userId).get();
    const settings = userSnap.data()?.notificationSettings;

    // Respect user preference
    if (settings?.email === false) return;

    await transporter.sendMail({
      from: "SkillsBoostHub <no-reply@skillsboosthub.com>",
      to: data.email,
      subject: data.title,
      html: `<p>${data.message}</p>`,
    });
  });

/* ------------------------------------
   🎉 WELCOME EMAIL ON REGISTRATION
------------------------------------ */
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  await db.collection("users").doc(user.uid).set(
    {
      email: user.email,
      notificationSettings: {
        email: true,
        inApp: true,
        sound: true,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await transporter.sendMail({
    from: "SkillsBoostHub <no-reply@skillsboosthub.com>",
    to: user.email,
    subject: "Welcome to SkillsBoostHub 🎉",
    html: `
      <h2>Welcome!</h2>
      <p>Your account has been created successfully.</p>
      <p>Complete payment to unlock lifetime access.</p>
    `,
  });
});

exports.api = functions.https.onRequest(app);
