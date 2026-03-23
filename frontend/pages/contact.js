export default function Contact() {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <p className="subtitle">We’re here to help you succeed 🚀</p>

      <div className="card">
        <p><strong>👤 Name:</strong> Venky Banavathu</p>
        <p><strong>📧 Email:</strong> support@skillsboosthub.com</p>
        <p><strong>📞 Phone:</strong> +91 XXXXX XXXXX</p>
        <p><strong>⏰ Hours:</strong> 10:00 AM – 8:00 PM</p>
      </div>

      <p className="note">We usually respond within 24 hours.</p>

      <style jsx>{`
        .container {
          padding: 60px 20px;
          text-align: center;
        }
        h1 {
          font-size: 36px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 30px;
        }
        .card {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          max-width: 400px;
          margin: auto;
          transition: 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .note {
          margin-top: 20px;
          color: green;
        }
      `}</style>
    </div>
  );
}