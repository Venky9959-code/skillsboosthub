export default function Terms() {
  return (
    <div className="container">
      <h1>Terms & Conditions</h1>

      <div className="card">
        <h3>📦 Digital Products</h3>
        <p>All products are digital. No physical delivery.</p>

        <h3>⚡ Instant Access</h3>
        <p>Access is provided immediately after payment.</p>

        <h3>🚫 No Refund</h3>
        <p>No refunds once access is granted.</p>

        <h3>🔒 Usage</h3>
        <p>Personal use only. Sharing is prohibited.</p>
      </div>

      <style jsx>{`
        .container {
          padding: 60px 20px;
          text-align: center;
        }
        .card {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: auto;
        }
      `}</style>
    </div>
  );
}