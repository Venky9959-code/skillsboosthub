"use client";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

const PaymentButton = ({ amount }: { amount: number }) => {
  const { user } = useAuth();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    const res = await loadRazorpay();
    if (!res || !user) return;

    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const { order } = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: "SkillsBoostHub",
      order_id: order.id,
      handler: async function (response: any) {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          // 🔑 UNLOCK ACCESS
          await updateDoc(doc(db, "users", user.uid), {
            paymentStatus: "paid",
            paymentId: response.razorpay_payment_id,
            paidAt: new Date(),
          });

          alert("Payment Successful! Access unlocked.");
          window.location.reload();
        }
      },
    };

    new (window as any).Razorpay(options).open();
  };

  return (
    <button
      onClick={pay}
      className="bg-green-600 px-6 py-3 rounded-lg text-white"
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
