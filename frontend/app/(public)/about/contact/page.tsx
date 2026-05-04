import PublicNavbar from "@/components/PublicNavbar";

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <PublicNavbar />

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Contact & Enquiry
        </h1>
        <p className="text-gray-600 mb-12">
          Have questions? We’re here to help you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="border rounded-xl p-8">
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">
              Get support or ask questions via email.
            </p>
            <a
              href="mailto:support@skillsboosthub.com"
              className="text-blue-600 font-medium"
            >
              support@skillsboosthub.com
            </a>
          </div>

          <div className="border rounded-xl p-8">
            <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              Quick help and guidance on WhatsApp.
            </p>
            <a
              href="https://wa.me/919390564946"
              target="_blank"
              className="text-green-600 font-medium"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
