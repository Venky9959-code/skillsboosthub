export default function Contact() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px" }}>Contact Us</h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        We’re here to help you succeed 🚀
      </p>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <p><strong>👤 Name:</strong> Venky Banavathu</p>
        <p><strong>📧 Email:</strong> support@skillsboosthub.com</p>
        <p><strong>📞 Phone:</strong> +91 93905 64946</p>
        <p><strong>⏰ Hours:</strong> 10:00 AM – 8:00 PM</p>
      </div>

      <p style={{ marginTop: "20px", color: "green" }}>
        We usually respond within 24 hours.
      </p>
    </div>
  );
}