export default function Contact() {
  const details = [
    { icon: "👤", label: "Name", value: "SkillsBoostHub" },
    { icon: "📧", label: "Email", value: "support@skillsboosthub.com" },
    { icon: "📞", label: "Phone", value: "+91 93905 64946" },
    { icon: "⏰", label: "Hours", value: "10:00 AM – 8:00 PM" },
  ];

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1>Contact Us</h1>
      <p style={{ color: "#ccc", marginBottom: "40px" }}>
        We’re here to help you 🚀
      </p>

      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {details.map((item, i) => (
          <div key={i} style={{ ...cardStyle, marginBottom: "15px" }}>
            <p><strong>{item.icon} {item.label}:</strong> {item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

