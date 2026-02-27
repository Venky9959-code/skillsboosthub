"use client";

import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

type Props = {
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
  notes?: Record<string, string>;
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
};

export default function RazorpayCheckout({
  amount,
  name,
  email,
  phone,
  notes,
  onSuccess,
  onError,
}: Props) {
  const { user } = useAuth();

  const loadRazorpaySdk = () =>
    new Promise((resolve, reject) => {
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });

  const pay = async () => {
    try {
      await loadRazorpaySdk();

      const resp = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await resp.json();
      if (!data.ok) throw new Error("Order creation failed");

      const order = data.order;

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SkillsBoostHub",
        description: "Course Payment",
        order_id: order.id,
        prefill: { name, email, contact: phone },
        notes: notes || {},
        handler: async function (response: any) {
          const verifyResp = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResp.json();

          if (verifyData.ok && verifyData.verified && user) {
            // 🔑 UNLOCK ACCESS
            await updateDoc(doc(db, "users", user.uid), {
              paymentStatus: "paid",
              paymentId: response.razorpay_payment_id,
              paidAt: new Date(),
            });

            onSuccess?.(verifyData);
          } else {
            onError?.(verifyData);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      onError?.(err);
    }
  };

  return (
    <button className="px-4 py-2 bg-blue-600 rounded" onClick={pay}>
      Pay ₹{amount}
    </button>
  );
}
