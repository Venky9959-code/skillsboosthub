export default function Privacy() {
  return (
    <div className="container">
      <h1>Privacy Policy</h1>

      <div className="card">
        <p>We respect your privacy.</p>

        <ul>
          <li>✔ We collect basic user info</li>
          <li>✔ We never sell your data</li>
          <li>✔ Payments are secure via Razorpay</li>
          <li>✔ Your data is protected</li>
        </ul>
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
        ul {
          text-align: left;
        }
      `}</style>
    </div>
  );
}