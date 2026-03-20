"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useAuth } from "../../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/create-order", {
        method: "POST",
      });

      if (!res.ok) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "SkillsBoostHub",
        description: "Unlock All Courses & Resources",
        order_id: data.orderId,

        handler: async function (response: any) {
          await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
  ...response,
  userId: user?.uid,
}),
          });

          if (user) {
            await updateDoc(doc(db, "users", user.uid), {
              paymentStatus: "paid",
              paid: true,
              paymentId: response.razorpay_payment_id,
              paidAt: new Date(),
            });

            await fetch("/api/notify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.uid,
                email: user.email,
                title: "Payment Successful 🎉",
                message: "Lifetime access unlocked. Welcome aboard!",
                type: "success",
              }),
            });
          }

          // 🎉 Confetti effect
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
          });

          setSuccess(true);
        },

        theme: { color: "#2563eb" },
      };

      if (!(window as any).Razorpay) {
        alert("Razorpay SDK not loaded");
        setLoading(false);
        return;
      }

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1220] to-[#020617] flex items-center justify-center px-4 text-white relative">

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-black rounded-2xl p-8 text-center shadow-2xl max-w-sm"
            >
              <h2 className="text-2xl font-bold mb-4">
                🎉 Payment Successful!
              </h2>
              <p className="text-sm mb-6">
                Lifetime access unlocked successfully.
              </p>
              <button
                onClick={() => window.location.href = "/dashboard/home"}
                className="bg-green-500 text-white px-6 py-2 rounded-lg"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAYMENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-[#0B1224]/90 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl text-center"
      >

        <h1 className="text-4xl font-bold mb-4">
          Unlock Lifetime Access 🚀
        </h1>

        <p className="text-gray-400 mb-8">
          One-time payment. Unlimited learning. No subscriptions.
        </p>

        {/* PRICE */}
        <div className="relative mb-8 rounded-3xl p-[2px] bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
          <div className="bg-[#0B1224] rounded-3xl p-8">
            <span className="text-xs bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold">
              LIMITED OFFER
            </span>

            <h2 className="text-5xl font-bold mt-4 mb-2">₹198</h2>

            <p className="text-gray-400 text-sm">
              No recurring charges • Lifetime membership
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <ul className="text-left text-gray-300 text-sm mb-8 space-y-2">
          <li>✔ All premium courses</li>
          <li>✔ Recorded sessions access</li>
          <li>✔ Downloadable PDFs</li>
          <li>✔ Future updates included</li>
          <li>✔ Lifetime access</li>
        </ul>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          {loading ? "Processing..." : "Pay Securely & Unlock"}
        </motion.button>

        <p className="text-gray-500 text-xs mt-6">
          🔒 Secure Payment via Razorpay • Instant Activation
        </p>
      </motion.div>
    </div>
  );
}