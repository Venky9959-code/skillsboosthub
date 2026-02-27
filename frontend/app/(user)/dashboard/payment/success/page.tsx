"use client";
import Lottie from "lottie-react";
import successAnim from "@/assets/success.json";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center mt-20">
      <Lottie animationData={successAnim} loop={false} />
      <h1 className="text-4xl font-bold mt-4">Payment Successful 🎉</h1>
      <p className="text-gray-400 mt-2">
        Lifetime access unlocked!
      </p>
    </div>
  );
}
