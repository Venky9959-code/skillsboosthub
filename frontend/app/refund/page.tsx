export default function Refund() {
  return (
    <div className="container">
      <h1>Refund Policy</h1>

      <div className="card">
        <p>All products are digital.</p>

        <h3>❌ No Cancellation</h3>
        <p>Orders cannot be cancelled after payment.</p>

        <h3>💸 Refunds</h3>
        <p>No refunds after access is provided.</p>

        <h3>⚠️ Exceptions</h3>
        <p>Duplicate payment or access issue only.</p>

        <h3>⏳ Processing</h3>
        <p>5–7 business days if approved.</p>
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