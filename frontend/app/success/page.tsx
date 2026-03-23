"use client";

import { useSearchParams } from "next/navigation";
export default function Success() {
  const router = useRouter();
  const { payment_id } = router.query;

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1>🎉 Payment Successful</h1>
      <p>Your Payment ID: {payment_id}</p>

      <h3>🚀 Check your WhatsApp / Email for access</h3>

      <a href="https://wa.me/919390564946">
        <button>Join WhatsApp Group</button>
      </a>
    </div>
  );
}