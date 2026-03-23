export default function Shipping() {
  return (
    <div className="container">
      <h1>Shipping Policy</h1>
      <p className="subtitle">Digital Delivery Information</p>

      <div className="card">
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

      <style jsx>{`
        .container {
          padding: 60px 20px;
          text-align: center;
        }
        h1 {
          font-size: 36px;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 30px;
        }
        .card {
          background: #fff;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: auto;
          transition: 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        h3 {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}