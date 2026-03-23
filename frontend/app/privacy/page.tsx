export default function Privacy() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1>Privacy Policy</h1>

      <div
        style={{
          background: "#111",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <p>We respect your privacy.</p>

        <ul style={{ textAlign: "left", marginTop: "20px" }}>
          <li>✔ We collect basic user info</li>
          <li>✔ We never sell your data</li>
          <li>✔ Payments are secure via Razorpay</li>
          <li>✔ Your data is protected</li>
        </ul>
      </div>
    </div>
  );
}