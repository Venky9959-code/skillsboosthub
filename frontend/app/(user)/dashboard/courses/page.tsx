"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1220] to-[#020617] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Your Courses 🎓
        </h1>
        <p className="text-gray-400">
          Learn the skills that schools and colleges never teach
        </p>
      </div>

      {/* COURSE GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

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

      </div>
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
    <div
      className="bg-white/10 hover:bg-white/20 p-6 rounded-2xl
                 transition-all hover:scale-[1.02] shadow-lg cursor-pointer"
    >
      <span className="inline-block text-xs bg-blue-600 px-3 py-1 rounded-full mb-4">
        {tag}
      </span>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
