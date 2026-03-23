export default function Terms() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ marginBottom: "30px" }}>Terms & Conditions</h1>

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
        <h3>📦 Digital Products</h3>
        <p>All products are digital. No physical delivery.</p>

        <h3>⚡ Instant Access</h3>
        <p>Access is provided immediately after payment.</p>

        <h3>🚫 No Refund</h3>
        <p>No refunds once access is granted.</p>

        <h3>🔒 Usage</h3>
        <p>Content is for personal use only. Sharing is prohibited.</p>
      </div>
    </div>
  );
}