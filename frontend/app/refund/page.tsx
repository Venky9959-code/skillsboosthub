export default function Refund() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ marginBottom: "30px" }}>Refund Policy</h1>

      <div
        style={{
          background: "rgba(255,255,255,0.05)", // 🔥 glass effect
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "16px",
          maxWidth: "600px",
          margin: "auto",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p style={{ marginBottom: "20px" }}>
          All products are digital.
        </p>

        <h3>❌ No Cancellation</h3>
        <p>Orders cannot be cancelled after payment.</p>

        <h3>💸 Refunds</h3>
        <p>No refunds after access is provided.</p>

        <h3>⚠️ Exceptions</h3>
        <p>Duplicate payment or access issue only.</p>

        <h3>⏳ Processing</h3>
        <p>5–7 business days if approved.</p>
      </div>
    </div>
  );
}