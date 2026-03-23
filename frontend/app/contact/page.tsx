export default function Contact() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        Contact Us
      </h1>

      <p style={{ color: "#ccc", marginBottom: "30px" }}>
        We’re here to help you succeed 🚀
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.05)", // 🔥 glass effect
          backdropFilter: "blur(10px)",
          padding: "25px",
          borderRadius: "16px",
          maxWidth: "400px",
          margin: "auto",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p><strong>👤 Name:</strong> Venky Banavathu</p>
        <p><strong>📧 Email:</strong> support@skillsboosthub.com</p>
        <p><strong>📞 Phone:</strong> +91 93905 64946</p>
        <p><strong>⏰ Hours:</strong> 10:00 AM – 8:00 PM</p>
      </div>

      <p style={{ marginTop: "20px", color: "#22c55e" }}>
        We usually respond within 24 hours.
      </p>
    </div>
  );
}