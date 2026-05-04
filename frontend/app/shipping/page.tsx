export default function Shipping() {
  const sections = [
    {
      title: "Nature of Product",
      icon: "📦",
      text: "SkillsBoostHub provides only digital products such as online courses and learning materials.",
    },
    {
      title: "Delivery Time",
      icon: "⚡",
      text: "Access to the purchased course is provided instantly after successful payment.",
    },
    {
      title: "Possible Delay",
      icon: "⏳",
      text: "In rare cases, it may take up to 5–10 minutes due to technical reasons.",
    },
    {
      title: "Physical Shipping",
      icon: "🚚",
      text: "We do not ship any physical products. All content is delivered online.",
    },
    {
      title: "Support",
      icon: "📩",
      text: "If you do not receive access, please contact us at:",
      extra: "support@skillsboosthub.com",
    },
  ];

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        Shipping Policy
      </h1>

      <p style={{ color: "#ccc", marginBottom: "40px" }}>
        Digital Delivery Information
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        {sections.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "14px",
              textAlign: "left",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>
              {item.icon} {item.title}
            </h3>

            <p style={{ color: "#ccc" }}>{item.text}</p>

            {item.extra && (
              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                {item.extra}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}