"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";

type Lesson = {
  id: string;
  title: string;
  type: string;
  content: string;
  order?: number;
};

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      const snap = await getDocs(
        collection(db, "courses", courseId as string, "lessons")
      );

      const data: Lesson[] = snap.docs.map((doc) => {
        const lessonData = doc.data() as Omit<Lesson, "id">;
        return {
          id: doc.id,      // ✔ ID only once
          ...lessonData,   // ✔ Lesson fields
        };
      });

      setLessons(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      setLoading(false);
    };

    loadLessons();
  }, [courseId]);

  return (
    <div className="text-white">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold"
      >
        {courseId} – Lessons
      </motion.h1>

      <p className="text-gray-400 mt-2 mb-8">
        Explore all lessons and materials.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p className="text-gray-400">No lessons added yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/dashboard/courses/${courseId}/lesson/${lesson.id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#141B30] p-6 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer transition"
              >
                <h2 className="text-xl font-semibold">
                  {index + 1}. {lesson.title}
                </h2>
                <p className="text-gray-400 capitalize">Type: {lesson.type}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
