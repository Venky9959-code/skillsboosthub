

import { motion } from "framer-motion";

const courses = [
  {
    title: "Full Stack Web Development",
    desc: "HTML, CSS, JavaScript, React, Node.js, Firebase",
    level: "Beginner → Advanced",
  },
  {
    title: "UI / UX Design",
    desc: "Figma, Wireframes, Prototyping, Design Systems",
    level: "Beginner",
  },
  {
    title: "Data Structures & Algorithms",
    desc: "Logic building, coding interviews, problem solving",
    level: "Intermediate",
  },
  {
    title: "AI Tools for Developers",
    desc: "ChatGPT, automation, productivity & workflows",
    level: "All Levels",
  },
];






export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0A1220] px-6 py-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-center mb-4">
          Our Courses 🎓
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Carefully designed programs to help you upgrade your skills,
          crack opportunities, and build confidence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {course.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {course.desc}
              </p>

              <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
                {course.level}
              </span>

              <button className="w-full mt-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold hover:shadow-lg transition">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
