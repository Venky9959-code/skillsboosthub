"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useAuth } from "../../../../context/AuthContext";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
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

      // ✅ ONLY FIX: correct response usage
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,          // ✅ FIXED
        currency: "INR",
        name: "SkillsBoostHub",
        description: "Unlock All Courses & Resources",
        order_id: data.orderId,       // ✅ FIXED

        handler: async function (response: any) {
          await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          // 🔑 UNLOCK ACCESS (UNCHANGED)
          if (user) {
            await updateDoc(doc(db, "users", user.uid), {
              paymentStatus: "paid",
              paid: true,
              paymentId: response.razorpay_payment_id,
              paidAt: new Date(),
            });

            // 🔔 + 📧 NOTIFICATION (UNCHANGED)
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

          alert("🎉 Payment successful! Lifetime access unlocked.");
          window.location.reload();
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A1220] to-[#020617] flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl text-center">

        <h1 className="text-3xl font-bold mb-3">Unlock Full Access 🔓</h1>
        <p className="text-gray-400 mb-6">
          One-time payment. Lifetime learning.
        </p>

        <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-400 mb-1">Total Price</p>
          <h2 className="text-4xl font-bold text-green-400">₹198</h2>
          <p className="text-gray-400 text-sm mt-2">
            No subscriptions • No hidden charges
          </p>
        </div>

        <ul className="text-left text-gray-300 text-sm mb-8 space-y-2">
          <li>✅ All skill development courses</li>
          <li>✅ Recorded sessions access</li>
          <li>✅ PDFs & study materials</li>
          <li>✅ Future updates included</li>
          <li>✅ Lifetime access</li>
        </ul>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing Payment..." : "Pay ₹198 & Unlock Now"}
        </button>

        <p className="text-gray-400 text-xs mt-6">
          Secure payment powered by Razorpay 🔒
        </p>
      </div>
    </div>
  );
}
