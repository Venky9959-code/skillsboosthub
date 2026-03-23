"use client";

import { useSearchParams } from "next/navigation";

export default function Success() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1>🎉 Payment Successful</h1>

      <p>Your Payment ID: {paymentId}</p>

      <h3>🚀 Check your WhatsApp / Email for access</h3>

      <a href="https://wa.me/919390564946" target="_blank">
        <button
          style={{
            padding: "12px 25px",
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Join WhatsApp Group
        </button>
      </a>
    </div>
  );
}