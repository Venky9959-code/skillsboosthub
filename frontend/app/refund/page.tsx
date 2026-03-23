export default function Refund() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1>Refund Policy</h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <p>All products are digital.</p>

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