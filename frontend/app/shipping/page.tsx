export default function Shipping() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        Shipping Policy
      </h1>

      <p style={{ color: "#ccc", marginBottom: "30px" }}>
        Digital Delivery Information
      </p>

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
        <h3>📦 Nature of Product</h3>
        <p>
          SkillsBoostHub provides only digital products such as online courses
          and learning materials.
        </p>

        <h3>⚡ Delivery Time</h3>
        <p>
          Access to the purchased course is provided instantly after successful
          payment.
        </p>

        <h3>⏳ Possible Delay</h3>
        <p>
          In rare cases, it may take up to 5–10 minutes due to technical reasons.
        </p>

        <h3>🚚 Physical Shipping</h3>
        <p>
          We do not ship any physical products. All content is delivered online.
        </p>

        <h3>📩 Support</h3>
        <p>
          If you do not receive access, please contact us at:
          <br />
          <strong>support@skillsboosthub.com</strong>
        </p>
      </div>
    </div>
  );
}