"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

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
      className="relative max-w-7xl mx-auto  px-6 md:px-10 pt-2 pb-12 text-white space-y-12">

      <PageHeader
        title="PDF Library"
        subtitle="Download study materials and learning resources."
        icon="📄"
      />

      {/* LOCKED STATE */}
      {locked ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mt-20 max-w-xl mx-auto p-[1px] 
                     bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 
                     rounded-3xl"
        >
          <div className="bg-[#0B1224] text-white rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">
              🔒 PDFs are Locked
            </h2>

            <p className="mb-6 text-gray-400">
              Unlock lifetime access to all study materials, PDFs & notes
              with a one-time payment.
            </p>

            <button
              onClick={() => router.push("/dashboard/payment")}
              className="btn-primary px-8 py-3 rounded-xl font-semibold"
            >
              Unlock Now
            </button>
          </div>
        </motion.div>
      ) : (
        <Reveal>
          <div className="grid lg:grid-cols-4 gap-6">
            
            {/* PDF LIST */}
            <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl 
                            border border-white/10 rounded-2xl p-4 space-y-2">
              <h3 className="font-semibold mb-3">Available PDFs</h3>

              {pdfList.map((pdf, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePdf(pdf)}
                  className={`w-full text-left px-4 py-3 rounded-xl 
                              transition-all duration-300 ${
                    activePdf.file === pdf.file
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  📘 {pdf.title}
                </button>
              ))}
            </div>

            {/* PDF VIEWER */}
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-xl 
                            border border-white/10 p-4 rounded-2xl shadow-lg">
              <motion.iframe
                key={activePdf.file}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={activePdf.file}
                className="w-full h-[80vh] rounded-xl bg-black"
              />
            </div>

          </div>
        </Reveal>
      )}
    </motion.div>
  );
}