"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link"; // ⭐ ADDED

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    color: "text-blue-400",
    icon: "📘",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch courses
  const fetchCourses = async () => {
    const snapshot = await getDocs(collection(db, "courses"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add or Update Course
  const saveCourse = async () => {
    if (!form.name.trim()) {
      alert("Course name is required");
      return;
    }

    if (editingId) {
      await updateDoc(doc(db, "courses", editingId), {
        ...form,
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "courses"), {
        ...form,
        createdAt: serverTimestamp(),
      });
    }

    setForm({
      name: "",
      description: "",
      color: "text-blue-400",
      icon: "📘",
    });

    fetchCourses();
  };

  // Delete Course
  const deleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  // Load course for editing
  const editCourse = (course: any) => {
    setEditingId(course.id);
    setForm({
      name: course.name,
      description: course.description,
      color: course.color,
      icon: course.icon,
    });
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Manage Courses</h1>

      {/* Form Section */}
      <div className="bg-[#141B30] p-6 rounded-xl border border-white/10 max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Course" : "Add New Course"}
        </h2>

        <input
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Course Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Emoji Icon (example: 📘)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />

        <select
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        >
          <option value="text-blue-400">Blue</option>
          <option value="text-green-400">Green</option>
          <option value="text-yellow-400">Yellow</option>
          <option value="text-purple-400">Purple</option>
          <option value="text-red-400">Red</option>
        </select>

        <button
          className="w-full bg-blue-600 p-3 rounded-lg mt-3 hover:bg-blue-700"
          onClick={saveCourse}
        >
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </div>

      {/* Courses List */}
      <h2 className="text-3xl font-semibold mt-10 mb-4">All Courses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#141B30] p-6 rounded-xl border border-white/10"
            >
              <h3 className={`text-2xl font-bold ${course.color}`}>
                {course.icon} {course.name}
              </h3>
              <p className="text-gray-400 mt-2">{course.description}</p>

              <div className="flex gap-3 mt-4">

                {/* ⭐ LESSONS BUTTON ADDED HERE ⭐ */}
                <Link href={`/admin/courses/${course.id}/lessons`}>
                  <button className="px-4 py-2 bg-blue-500 rounded-lg">
                    Lessons
                  </button>
                </Link>

                <button
                  onClick={() => editCourse(course)}
                  className="px-4 py-2 bg-yellow-500 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
                  className="px-4 py-2 bg-red-600 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
