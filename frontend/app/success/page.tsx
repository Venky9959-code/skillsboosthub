"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ marginBottom: "10px" }}>🎉 Payment Successful</h1>

      <p style={{ color: "#ccc", marginBottom: "20px" }}>
        Payment ID: {paymentId}
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.05)", // 🔥 glass UI
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "16px",
          maxWidth: "500px",
          margin: "auto",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>
          🚀 Check your WhatsApp / Email for access
        </h3>

        <a href="https://wa.me/919390564946" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: "12px 25px",
              background: "#22c55e",
              color: "#fff", // ✅ FIXED (was dark before)
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Join WhatsApp Group
          </button>
        </a>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<p style={{ color: "#fff" }}>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}