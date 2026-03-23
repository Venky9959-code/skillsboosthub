import { useEffect } from "react";

export default function Home() {

  const handlePayment = async () => {
    const res = await fetch("/api/create-order", { method: "POST" });
    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "SkillsBoostHub",
      description: "Premium Digital Course",
      order_id: data.id,
      handler: function (response) {
        window.location.href = `/success?payment_id=${response.razorpay_payment_id}`;
      },
      theme: { color: "#6366f1" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container">
      <h1>🚀 Upgrade Your Skills & Start Earning</h1>
      <p className="subtitle">
        Learn High Income Skills & Start Your Online Journey Today
      </p>

      <div className="card">
        <h2>🔥 Special Offer ₹198</h2>
        <ul>
          <li>✔ Lifetime Access</li>
          <li>✔ Beginner Friendly</li>
          <li>✔ Step-by-Step Training</li>
          <li>✔ Real Earning Strategies</li>
        </ul>

        <button onClick={handlePayment}>💳 Enroll Now</button>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          color: white;
          min-height: 100vh;
        }
        .card {
          background: white;
          color: black;
          padding: 30px;
          border-radius: 15px;
          max-width: 400px;
          margin: 30px auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        button {
          background: #22c55e;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
        }
        button:hover {
          background: #16a34a;
        }
      `}</style>
    </div>
  );
}