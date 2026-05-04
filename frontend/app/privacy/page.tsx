const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "20px",
  borderRadius: "14px",
  textAlign: "left" as const , 
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
};

export default function Privacy() {
  const sections = [
    {
      title: "Information Collection",
      icon: "📊",
      text: "We collect basic user information like name and email.",
    },
    {
      title: "Data Usage",
      icon: "⚙️",
      text: "Used to provide services and improve user experience.",
    },
    {
      title: "Data Protection",
      icon: "🔐",
      text: "We never sell your data to third parties.",
    },
    {
      title: "Secure Payments",
      icon: "💳",
      text: "All payments are processed securely via Razorpay.",
    },
  ];

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: "#ccc", marginBottom: "40px" }}>
        Your data is safe with us
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

