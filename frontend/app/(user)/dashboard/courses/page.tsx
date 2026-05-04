"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export default function CoursesPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile?.paymentStatus !== "paid") {
      router.replace("/dashboard/payment");
    }
  }, [profile, loading, router]);

  if (loading) {
   return (
  <div className="min-h-screen flex items-center justify-center bg-[#020617]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  </div>
);
  }

  return (
    <div className="relative max-w-7xl mx-auto  px-6 md:px-10 pt-2 pb-12 text-white space-y-12">

      <PageHeader
  title="Your Courses"
  subtitle="Learn the skills that schools and colleges never teach."
  icon="🎓"
/>

      {/* COURSE GRID */}
      <Reveal><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <CourseCard
          title="Soft Skills Mastery"
          desc="Communication, confidence & professional behavior"
          tag="Core Skill"
        />

        <CourseCard
          title="Leadership & Team Management"
          desc="How to lead, manage people & work as a team"
          tag="Career Growth"
        />

        <CourseCard
          title="Business & Entrepreneur Mindset"
          desc="How to think, plan & build your own business"
          tag="Future Ready"
        />

        <CourseCard
          title="Career Guidance"
          desc="Jobs, packages, interviews & career clarity"
          tag="Placement Focus"
        />

        <CourseCard
          title="Productivity & Time Management"
          desc="Focus, discipline & daily performance systems"
          tag="Life Skill"
        />

        <CourseCard
          title="Personal Growth & Mindset"
          desc="Confidence, consistency & self-belief"
          tag="Mindset"
        />

      </div> </Reveal>
    </div>
  );
}

function CourseCard({
  title,
  desc,
  tag,
}: {
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 220 }}
      className="relative group cursor-pointer"
    >
      <div className="relative p-[1px] rounded-2xl 
                      bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30">

        <div className="bg-white/10 backdrop-blur-xl 
                        border border-white/10 
                        rounded-2xl p-6 h-full 
                        transition-all duration-300
                        group-hover:border-white/20">

          <span className="inline-block text-xs 
                           bg-blue-600/80 
                           px-3 py-1 
                           rounded-full mb-4">
            {tag}
          </span>

          <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition">
            {title}
          </h3>

          <p className="text-gray-400 text-sm">
            {desc}
          </p>

          <div className="mt-6 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
            Explore Course →
          </div>
        </div>
      </div>
    </motion.div>
  );
}
