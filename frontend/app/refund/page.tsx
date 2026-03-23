export default function Refund() {
  const sections = [
    {
      title: "No Cancellation",
      icon: "❌",
      text: "Orders cannot be cancelled after payment.",
    },
    {
      title: "Refund Policy",
      icon: "💸",
      text: "No refunds once access is granted.",
    },
    {
      title: "Exceptions",
      icon: "⚠️",
      text: "Only for duplicate payments or access issues.",
    },
    {
      title: "Processing Time",
      icon: "⏳",
      text: "Refunds (if approved) are processed within 5–7 days.",
    },
  ];

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1>Refund Policy</h1>
      <p style={{ color: "#ccc", marginBottom: "40px" }}>
        Understand our refund rules
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