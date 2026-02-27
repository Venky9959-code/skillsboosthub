import Link from "next/link";
import PublicNavbar from "@/components/PublicNavbar";

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <PublicNavbar />

      {/* HEADER */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple & Affordable Pricing
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          One-time payment. Lifetime access. No subscriptions.  
          Learn skills at your own pace with SkillsBoostHub.
        </p>
      </section>

      {/* PRICING CARD */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="border rounded-2xl shadow-sm p-10 text-center">

          <p className="text-blue-600 font-semibold mb-2">
            🔥 Most Popular
          </p>

          <h2 className="text-3xl font-bold mb-4">
            SkillsBoostHub – Lifetime Access
          </h2>

          <p className="text-gray-600 mb-6">
            Pay once and get unlimited access to all learning resources.
          </p>

          {/* PRICE */}
          <div className="flex items-end justify-center gap-2 mb-8">
            <span className="text-5xl font-bold text-gray-900">₹198</span>
            <span className="text-gray-500 mb-1">/ lifetime</span>
          </div>

          {/* FEATURES */}
          <ul className="space-y-3 text-gray-700 mb-10 text-left max-w-md mx-auto">
            <li>✅ Lifetime access to all courses</li>
            <li>✅ Downloadable PDFs & notes</li>
            <li>✅ Recorded session access</li>
            <li>✅ Future content updates included</li>
            <li>✅ Learn anytime, anywhere</li>
          </ul>

          {/* CTA */}
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 transition"
          >
            Get Lifetime Access
          </Link>

          {/* TRUST NOTE */}
          <p className="text-sm text-gray-500 mt-6">
            No hidden charges • Secure payment • One-time purchase
          </p>
        </div>
      </section>

      {/* FAQ / TRUST SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <TrustItem
            title="One-Time Payment"
            desc="Pay once and access forever. No monthly fees."
          />
          <TrustItem
            title="Beginner Friendly"
            desc="Designed for students, freshers & professionals."
          />
          <TrustItem
            title="Skill-Focused Learning"
            desc="Practical skills that help in real-life growth."
          />
        </div>
      </section>
    </div>
  );
}

function TrustItem({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
