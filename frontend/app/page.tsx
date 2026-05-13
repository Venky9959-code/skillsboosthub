"use client";

/* 🔥 STATIC GENERATION HINT (PERFORMANCE) */
export const dynamic = "force-static";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import dynamicImport from "next/dynamic";

/* ✅ LOTTIE (CLIENT ONLY) */
const Lottie = dynamicImport(() => import("lottie-react"), {
  ssr: false,
});

/* ================= COUNTER COMPONENT ================= */
function Counter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const interval = 20;
    const step = Math.ceil(end / (duration / interval));

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(start);
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        relative overflow-hidden
        rounded-3xl
        bg-white/[0.04]
        border border-white/10
        backdrop-blur-2xl
        p-8 text-center
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

      <h4 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative z-10">
        {count}
        {suffix}
      </h4>

      <p className="text-gray-400 mt-3 relative z-10">
        {label}
      </p>
    </motion.div>
  );
}

/* ================= HERO ANIMATION VARIANTS ================= */
const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },

  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.7,
      ease: "easeOut" as any,
    },
  },
};

/* ================= HOME PAGE ================= */
export default function Home() {
  const [heroAnimation, setHeroAnimation] = useState<any>(null);

  /* ✅ LOAD LOTTIE JSON */
  useEffect(() => {
    fetch("/hero-animation.json")
      .then((res) => res.json())
      .then(setHeroAnimation)
      .catch(console.error);
  }, []);

  return (
    <main className="relative bg-[#020617] text-white overflow-x-hidden">

      {/* ================= PREMIUM BACKGROUND ================= */}
      <div className="fixed inset-0 -z-50 overflow-hidden">

        {/* MAIN BG */}
        <div className="absolute inset-0 bg-[#020617]" />

        {/* BLUE GLOW */}
        <div
          className="
            absolute top-[-300px] left-[-150px]
            w-[700px] h-[700px]
            bg-blue-500/15
            blur-[180px]
            rounded-full
          "
        />

        {/* PURPLE GLOW */}
        <div
          className="
            absolute bottom-[-300px] right-[-150px]
            w-[700px] h-[700px]
            bg-purple-500/15
            blur-[180px]
            rounded-full
          "
        />

        {/* GRID */}
        <div
          className="
            absolute inset-0 opacity-[0.03]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:80px_80px]
          "
        />
      </div>

      {/* ================= NAVBAR ================= */}
      <header
        className="
          fixed top-0 left-0 w-full z-50
          backdrop-blur-2xl
          bg-[#020617]/70
          border-b border-white/10
        "
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-4 cursor-pointer">

            <div className="relative">

              <Image
                src="/logo-new.png"
                alt="SkillsBoostHub Logo"
                width={72}
                height={72}
                priority
                className="
                  object-contain
                  drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]
                "
              />

              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full -z-10" />
            </div>

            <div className="leading-tight">

              <h1 className="text-3xl font-black tracking-wide">

                <span className="text-white">
                  Skills
                </span>

                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Boost
                </span>

                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Hub
                </span>
              </h1>

              <p className="text-[11px] uppercase tracking-[4px] text-gray-400 mt-1">
                Learn • Grow • Succeed
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/register"
                className="
                  px-7 py-3 rounded-2xl
                  bg-white/[0.05]
                  border border-white/10
                  backdrop-blur-xl
                  hover:bg-white/[0.08]
                  transition duration-300
                "
              >
                Register
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/login"
                className="
                  px-7 py-3 rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-500
                  to-purple-500
                  shadow-[0_10px_40px_rgba(59,130,246,0.35)]
                  hover:opacity-90
                  transition duration-300
                "
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden">

        {/* SPOTLIGHT */}
        <div
          className="
            absolute top-[-250px] left-1/2 -translate-x-1/2
            w-[900px] h-[900px]
            bg-blue-500/10 blur-[180px]
            rounded-full
          "
        />

        <div
          className="
            absolute bottom-[-250px] right-[-120px]
            w-[700px] h-[700px]
            bg-purple-500/10 blur-[180px]
            rounded-full
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >

            {/* BADGE */}
            <motion.div
              variants={heroItem}
              className="
                inline-flex items-center gap-3
                px-5 py-2 rounded-full
                bg-white/[0.04]
                border border-white/10
                backdrop-blur-xl
                mb-8
              "
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

              <span className="text-sm text-gray-300">
                AI Powered Premium Learning Platform
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h1
              variants={heroItem}
              className="
                text-6xl md:text-7xl
                font-black
                leading-[1.05]
              "
            >
              Learn Skills <br />

              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                That Build Careers
              </span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              variants={heroItem}
              className="
                mt-8 text-xl
                text-gray-400
                leading-relaxed
                max-w-2xl
              "
            >
              SkillsBoostHub helps students and professionals master
              real-world skills with premium courses, AI recommendations,
              interview preparation and career growth tools.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              variants={heroItem}
              className="mt-10 flex flex-wrap gap-5"
            >

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="
                    px-8 py-4 rounded-2xl
                    bg-gradient-to-r
                    from-blue-500
                    via-cyan-500
                    to-purple-500
                    font-semibold
                    shadow-[0_20px_50px_rgba(59,130,246,0.35)]
                    hover:opacity-90
                    transition duration-300
                  "
                >
                  🚀 Start Learning
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="
                    px-8 py-4 rounded-2xl
                    bg-white/[0.05]
                    border border-white/10
                    backdrop-blur-xl
                    hover:bg-white/[0.08]
                    transition duration-300
                  "
                >
                  ▶ Explore Platform
                </Link>
              </motion.div>
            </motion.div>

            {/* STATS */}
            <motion.div
              variants={heroItem}
              className="grid grid-cols-3 gap-5 mt-16"
            >

              <div className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl p-6">

                <h3 className="text-4xl font-black text-blue-400">
                  25K+
                </h3>

                <p className="text-gray-400 mt-2">
                  Students
                </p>
              </div>

              <div className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl p-6">

                <h3 className="text-4xl font-black text-purple-400">
                  150+
                </h3>

                <p className="text-gray-400 mt-2">
                  Courses
                </p>
              </div>

              <div className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl p-6">

                <h3 className="text-4xl font-black text-cyan-400">
                  98%
                </h3>

                <p className="text-gray-400 mt-2">
                  Success
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >

            <div
              className="
                relative
                rounded-[40px]
                overflow-hidden
                border border-white/10
                bg-white/[0.05]
                backdrop-blur-2xl
                shadow-[0_20px_80px_rgba(0,0,0,0.45)]
              "
            >

              {/* IMAGE */}
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                className="w-[650px] h-[700px] object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

              {/* FLOATING CARD */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="
                  absolute top-8 right-8
                  bg-white/10
                  backdrop-blur-2xl
                  border border-white/20
                  rounded-3xl
                  p-5
                "
              >

                <p className="text-sm text-gray-300">
                  Active Learners
                </p>

                <h3 className="text-4xl font-black mt-2">
                  25K+
                </h3>
              </motion.div>

              {/* PREMIUM CARD */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="
                  absolute bottom-8 left-8
                  max-w-sm
                  bg-white/10
                  backdrop-blur-2xl
                  border border-white/20
                  rounded-3xl
                  p-6
                "
              >

                <div className="flex items-center gap-4 mb-5">

                  <div
                    className="
                      w-14 h-14 rounded-2xl
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-500
                      flex items-center justify-center
                      text-2xl
                    "
                  >
                    ✨
                  </div>

                  <div>
                    <h3 className="font-bold text-xl">
                      Premium Learning
                    </h3>

                    <p className="text-xs text-gray-300">
                      AI Powered Platform
                    </p>
                  </div>
                </div>

                <p className="text-gray-200 leading-relaxed">
                  Smart recommendations, premium videos,
                  interview preparation and career growth resources.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


    {/* ================= TRUSTED BY ================= */}
<section className="relative py-20 overflow-hidden">

  {/* TOP FADE */}
  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#020617] to-transparent z-10" />

  {/* BOTTOM FADE */}
  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#020617] to-transparent z-10" />

  <div className="max-w-7xl mx-auto px-8">

    {/* TITLE */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center mb-12"
    >

      <p className="
        uppercase tracking-[6px]
        text-sm text-gray-500
      ">
        Trusted By Learners Worldwide
      </p>

      <h3 className="
        text-4xl md:text-5xl
        font-black mt-4
        bg-gradient-to-r
        from-white
        via-blue-300
        to-purple-400
        bg-clip-text text-transparent
      ">
        Collaborations & Learning Ecosystem
      </h3>
    </motion.div>

    {/* MARQUEE */}
    <div className="relative overflow-hidden">

      {/* LEFT FADE */}
      <div className="
        absolute left-0 top-0 z-20
        w-40 h-full
        bg-gradient-to-r
        from-[#020617]
        to-transparent
      " />

      {/* RIGHT FADE */}
      <div className="
        absolute right-0 top-0 z-20
        w-40 h-full
        bg-gradient-to-l
        from-[#020617]
        to-transparent
      " />

      {/* MOVING ROW */}
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "linear",
        }}
        className="flex gap-8 w-max"
      >

        {[
          {
            name: "Google",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
          },
          {
            name: "Microsoft",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
          },
          {
            name: "Amazon",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
          },
          {
            name: "Meta",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
          },
          {
            name: "Netflix",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
          },
          {
            name: "Spotify",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
           },
          {
            name: "GitHub",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          },
          {
            name: "OpenAI",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
          },

          /* DUPLICATE FOR LOOP */
          {
            name: "Google",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
          },
          {
            name: "Microsoft",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
          },
          {
            name: "Amazon",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
          },
          {
            name: "Meta",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
          },
          {
            name: "Netflix",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
          },
          {
           name: "Spotify",
           logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
          },
          {
            name: "GitHub",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          },
          {
            name: "OpenAI",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
          },
        ].map((company, i) => (

          <motion.div
            key={i}
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            className="
              relative overflow-hidden
              flex items-center gap-4
              px-8 py-5
              rounded-3xl
              bg-white/[0.04]
              border border-white/10
              backdrop-blur-2xl
              min-w-[260px]
            "
          >

            {/* GLASS REFLECTION */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-white/[0.08]
                via-transparent
                to-transparent
                pointer-events-none
              "
            />

            {/* LOGO */}
            <div className="
              w-14 h-14
              rounded-2xl
              bg-white
              flex items-center justify-center
              p-3
            ">

              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* NAME */}
            <div>

              <h4 className="text-xl font-bold">
                {company.name}
              </h4>

              <p className="text-sm text-gray-400">
                Learning Collaboration
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</section>



{/* ================= FEATURES ================= */}
<section className="relative py-28">

  <div className="max-w-7xl mx-auto px-8">

    {/* HEADER */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center mb-20"
    >

      <p className="
        uppercase tracking-[6px]
        text-sm text-blue-400
        mb-5
      ">
        Why Choose Us
      </p>

      <h2 className="
        text-5xl md:text-6xl
        font-black
        leading-tight
      ">
        Experience Learning <br />

        <span className="
          bg-gradient-to-r
          from-blue-400
          via-cyan-400
          to-purple-500
          bg-clip-text text-transparent
          animate-gradient bg-[length:200%_200%]
        ">
          Like Never Before
        </span>
      </h2>

      <p className="
        text-gray-400
        max-w-3xl mx-auto
        mt-8 text-lg
      ">
        Advanced AI-powered learning ecosystem designed
        to help students grow faster with personalized
        recommendations, premium content and career tools.
      </p>
    </motion.div>

    {/* FEATURE GRID */}
    <div className="grid lg:grid-cols-3 gap-8">

      {[
        {
          icon: "🤖",
          title: "AI Recommendations",
          desc: "Smart course suggestions tailored to your interests and career goals.",
        },
        {
          icon: "🎥",
          title: "Premium Video Library",
          desc: "Access high-quality lessons, interview prep and trending tech content.",
        },
        {
          icon: "🚀",
          title: "Career Growth",
          desc: "Build real-world skills with projects, assessments and mentorship.",
        },
        {
          icon: "📊",
          title: "Skill Analytics",
          desc: "Track your growth journey with advanced dashboards and progress insights.",
        },
        {
          icon: "🌐",
          title: "Global Community",
          desc: "Connect with learners, mentors and professionals worldwide.",
        },
        {
          icon: "⚡",
          title: "Lightning Fast Platform",
          desc: "Optimized modern experience powered by Next.js and Firebase.",
        },
      ].map((feature, i) => (

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -8,
            rotateX: 2,
            rotateY: 2,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative overflow-hidden
            rounded-[32px]
            bg-white/[0.04]
            border border-white/10
            backdrop-blur-2xl
            p-8
            group
          "
        >

          {/* GLOW */}
          <div className="
            absolute inset-0
            opacity-0 group-hover:opacity-100
            transition duration-500
            bg-gradient-to-br
            from-blue-500/10
            via-transparent
            to-purple-500/10
          " />

          {/* GLASS REFLECTION */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-white/[0.08]
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          {/* ICON */}
          <div className="
            relative z-10
            w-20 h-20
            rounded-3xl
            bg-gradient-to-r
            from-blue-500
            via-cyan-500
            to-purple-500
            flex items-center justify-center
            text-4xl
            shadow-[0_15px_40px_rgba(59,130,246,0.35)]
          ">
            {feature.icon}
          </div>

          {/* CONTENT */}
          <div className="relative z-10">

            <h3 className="
              text-2xl font-bold
              mt-8 mb-4
            ">
              {feature.title}
            </h3>

            <p className="
              text-gray-400
              leading-relaxed
              text-[15px]
            ">
              {feature.desc}
            </p>
          </div>

          {/* CORNER GLOW */}
          <div className="
            absolute -top-20 -right-20
            w-40 h-40
            bg-blue-500/10
            blur-[80px]
            rounded-full
          " />
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ================= COURSES ================= */}
      <section className="py-28 relative z-10">

        <div className="max-w-7xl mx-auto px-8">

          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-16"
          >
            Explore Premium Courses
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              "Web Development",
              "AI & ML",
              "Data Science",
            ].map((course, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="
                  relative overflow-hidden
                  rounded-3xl
                  bg-white/[0.04]
                  border border-white/10
                  backdrop-blur-2xl
                  p-8
                  shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                "
              >

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

                <div className="relative z-10">

                  <div
                    className="
                      w-16 h-16 rounded-2xl
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-500
                      flex items-center justify-center
                      text-3xl mb-6
                    "
                  >
                    🚀
                  </div>

                  <h4 className="text-2xl font-bold">
                    {course}
                  </h4>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    Industry-ready curriculum with mentorship,
                    projects and placement preparation.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COUNTERS ================= */}
      <section className="py-28">

        <div className="max-w-7xl mx-auto px-8">

          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-20"
          >
            Our Impact 📊
          </motion.h3>

          <div className="grid md:grid-cols-4 gap-8">

            <Counter
              value={2500}
              suffix="+"
              label="Students Trained"
            />

            <Counter
              value={30}
              suffix="+"
              label="Industry Courses"
            />

            <Counter
              value={1200}
              suffix="+"
              label="Successful Placements"
            />

            <Counter
              value={5}
              label="⭐ Average Rating"
            />
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-28">

        <div className="max-w-7xl mx-auto px-8">

          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-center mb-20"
          >
            What Students Say
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">

            {[1, 2, 3].map((r, i) => (

              <motion.div
                key={r}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -8,
                }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="
                  rounded-3xl
                  bg-white/[0.04]
                  border border-white/10
                  backdrop-blur-2xl
                  p-8
                "
              >

                <div className="flex gap-1 text-yellow-400 mb-5">

                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed">
                  “This platform completely transformed my career.
                  The UI, learning experience and premium courses
                  are amazing.”
                </p>

                <div className="flex items-center gap-4 mt-8">

                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />

                  <div>
                    <h4 className="font-semibold">
                      Student
                    </h4>

                    <p className="text-sm text-gray-400">
                      SkillsBoostHub User
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ================= TESTIMONIALS ================= */}
<section className="relative py-32 overflow-hidden">

  {/* BACKGROUND GLOW */}
  <div className="
    absolute top-0 left-1/2 -translate-x-1/2
    w-[700px] h-[700px]
    bg-purple-500/10
    blur-[180px]
    rounded-full
  " />

  <div className="max-w-7xl mx-auto px-8 relative z-10">

    {/* HEADER */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center mb-20"
    >

      <p className="
        uppercase tracking-[6px]
        text-sm text-purple-400
        mb-5
      ">
        Student Success Stories
      </p>

      <h2 className="
        text-5xl md:text-6xl
        font-black leading-tight
      ">
        Loved By Thousands <br />

        <span className="
          bg-gradient-to-r
          from-blue-400
          via-cyan-400
          to-purple-500
          bg-clip-text text-transparent
          animate-gradient bg-[length:200%_200%]
        ">
          Of Learners Worldwide
        </span>
      </h2>

      <p className="
        text-gray-400
        max-w-3xl mx-auto
        mt-8 text-lg
      ">
        Students and professionals are transforming
        their careers with SkillsBoostHub every day.
      </p>
    </motion.div>

    {/* TESTIMONIAL GRID */}
    <div className="grid lg:grid-cols-3 gap-8">

      {[
        {
          name: "Rahul Sharma",
          role: "Frontend Developer",
          review:
            "SkillsBoostHub completely changed my learning journey. The UI, premium videos and AI recommendations are incredible.",
          image:
            "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Priya Reddy",
          role: "Engineering Student",
          review:
            "The platform feels super modern and premium. I improved my communication and interview skills a lot.",
          image:
            "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Arjun Patel",
          role: "Software Engineer",
          review:
            "One of the best learning experiences online. Smooth animations, premium content and amazing performance.",
          image:
            "https://randomuser.me/api/portraits/men/68.jpg",
        },
      ].map((user, i) => (

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -8,
            rotateX: 2,
            rotateY: 2,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative overflow-hidden
            rounded-[32px]
            bg-white/[0.04]
            border border-white/10
            backdrop-blur-2xl
            p-8
            group
          "
        >

          {/* HOVER GLOW */}
          <div className="
            absolute inset-0
            opacity-0 group-hover:opacity-100
            transition duration-500
            bg-gradient-to-br
            from-blue-500/10
            via-transparent
            to-purple-500/10
          " />

          {/* GLASS REFLECTION */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-white/[0.08]
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          {/* STARS */}
          <div className="flex gap-1 relative z-10 mb-6">

            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="text-yellow-400 text-lg"
              />
            ))}
          </div>

          {/* REVIEW */}
          <p className="
            text-gray-300
            leading-relaxed
            text-lg
            relative z-10
          ">
            “{user.review}”
          </p>

          {/* USER */}
          <div className="
            flex items-center gap-4
            mt-10 relative z-10
          ">

            <img
              src={user.image}
              alt={user.name}
              className="
                w-16 h-16
                rounded-2xl
                object-cover
                border border-white/10
              "
            />

            <div>

              <h4 className="font-bold text-lg">
                {user.name}
              </h4>

              <p className="text-gray-400 text-sm">
                {user.role}
              </p>
            </div>
          </div>

          {/* CORNER GLOW */}
          <div className="
            absolute -bottom-20 -right-20
            w-40 h-40
            bg-purple-500/10
            blur-[80px]
            rounded-full
          " />
        </motion.div>
      ))}
    </div>
  </div>
</section>




      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-12">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8 text-gray-400">

          <div>

            <h4 className="text-white text-2xl font-black mb-3">
              SkillsBoostHub
            </h4>

            <p>
              Empowering careers through premium learning.
            </p>
          </div>

          <div>

            <h4 className="text-white font-bold mb-3">
              Quick Links
            </h4>

            <ul className="space-y-2">

              <li>
                <Link href="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>

            <h4 className="text-white font-bold mb-3">
              © 2025
            </h4>

            <p>
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}