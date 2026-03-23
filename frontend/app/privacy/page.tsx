export default function Privacy() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ marginBottom: "30px" }}>Privacy Policy</h1>

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
        <p style={{ marginBottom: "20px", fontSize: "18px" }}>
          We respect your privacy.
        </p>

        <ul style={{ textAlign: "left", lineHeight: "1.8" }}>
          <li>✔ We collect basic user info</li>
          <li>✔ We never sell your data</li>
          <li>✔ Payments are secure via Razorpay</li>
          <li>✔ Your data is protected</li>
        </ul>
      </div>
    </div>
  );
}