const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "20px",
  borderRadius: "14px",
  textAlign: "left",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
};

export default function Terms() {
  const sections = [
    {
      title: "Digital Products",
      icon: "📦",
      text: "All products are digital. No physical delivery will be made.",
    },
    {
      title: "Instant Access",
      icon: "⚡",
      text: "Access is provided immediately after successful payment.",
    },
    {
      title: "No Refund",
      icon: "🚫",
      text: "No refunds once access is granted.",
    },
    {
      title: "Usage Policy",
      icon: "🔒",
      text: "Content is for personal use only. Sharing or resale is prohibited.",
    },
  ];

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1>Terms & Conditions</h1>
      <p style={{ color: "#ccc", marginBottom: "40px" }}>
        Please read these terms carefully
      </p>

      <div style={{ display: "grid", gap: "20px", maxWidth: "700px", margin: "auto" }}>
        {sections.map((item, i) => (
          <div key={i} style={cardStyle}>
            <h3>{item.icon} {item.title}</h3>
            <p style={{ color: "#ccc" }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
