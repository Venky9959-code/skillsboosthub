"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const pdfList = [
  {
    title: "Soft Skills Handbook",
    file: "/pdfs/soft-skills.pdf",
  },
  {
    title: "Communication Skills Notes",
    file: "/pdfs/communication.pdf",
  },
  {
    title: "Leadership & Teamwork",
    file: "/pdfs/leadership.pdf",
  },
];

export default function PdfPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [activePdf, setActivePdf] = useState(pdfList[0]);

  const locked = profile?.paymentStatus !== "paid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gradient-to-br from-[#0A1220] to-[#020617] text-white p-6 md:p-10"
    >
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          PDFs & Study Notes 📄
        </h1>
        <p className="text-gray-400">
          Well-structured notes to revise and grow faster
        </p>
      </div>

      {/* LOCKED */}
      {locked ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center justify-center mt-20 bg-yellow-400 text-black p-10 rounded-2xl max-w-xl mx-auto shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-3">
            🔒 PDFs are Locked
          </h2>
          <p className="mb-6 text-center">
            Unlock lifetime access to all study materials, PDFs & notes
            with a one-time payment.
          </p>
          <button
            onClick={() => router.push("/dashboard/payment")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Unlock Now
          </button>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-6">
          {/* PDF LIST */}
          <div className="lg:col-span-1 bg-white/10 p-4 rounded-xl border border-white/10 space-y-2">
            <h3 className="font-semibold mb-3">Available PDFs</h3>

            {pdfList.map((pdf, idx) => (
              <button
                key={idx}
                onClick={() => setActivePdf(pdf)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activePdf.file === pdf.file
                    ? "bg-blue-600"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                📘 {pdf.title}
              </button>
            ))}
          </div>

          {/* PDF VIEWER */}
          <div className="lg:col-span-3 bg-white/10 p-4 rounded-xl border border-white/10 shadow-lg">
            <iframe
              src={activePdf.file}
              className="w-full h-[80vh] rounded-xl bg-black"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
