"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/firebase/firebaseConfig"
import BackgroundParticles from "@/components/BackgroundParticles";
import Reveal from "@/components/Reveal";

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [showWelcomeAnim, setShowWelcomeAnim] = useState(true);
  const [celebrated, setCelebrated] = useState(false);
  const [nextSession,setNextSession] = useState<any>(null)

  const fireConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ["#3b82f6", "#a855f7", "#f59e0b", "#ec4899"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (profile?.paymentStatus === "paid" && !celebrated) {
      fireConfetti();
      setCelebrated(true);
    }
  }, [profile?.paymentStatus, celebrated]);

  useEffect(()=>{

  const fetchSession = async()=>{

    const q = query(
      collection(db,"sessions"),
      orderBy("date"),
      limit(1)
    )

    const snap = await getDocs(q)

    snap.forEach(doc=>{
      setNextSession(doc.data())
    })
  }

  fetchSession()

},[])

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcomeAnim(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] px-10 py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-96" />

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="relative w-full overflow-hidden">
       <BackgroundParticles />

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#020617] via-[#0A1220] to-black" />
      <div className="absolute top-[-200px] left-[-200px] w-[480px] h-[480px] bg-blue-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[480px] h-[480px] bg-purple-500/20 rounded-full blur-[140px]" />

      {/* 🧱 CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-2 pb-12 text-white space-y-16">

{/* ================= HERO SECTION (UPGRADED) ================= */}
<motion.div
  initial={showWelcomeAnim ? { opacity: 0, y: 30 } : false}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  className="relative"
>
  {/* Glass Wrapper */}
  <motion.div
    initial={{ scale: 0.96, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.7 }}
    className="relative overflow-hidden rounded-3xl 
               bg-white/5 backdrop-blur-2xl 
               border border-white/10 
               p-8 md:p-10"
  >
    {/* Subtle Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40 pointer-events-none" />

    <div className="relative space-y-4">
      <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.7 }}
  className="text-4xl md:text-5xl font-bold leading-tight"
>
  <DynamicGreeting name={profile?.name?.split(" ")[0] || "Champion"} />
</motion.h1>


   <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.7 }}
  className="space-y-2"
>
  <p className="text-gray-400 text-lg max-w-2xl">
    Your personal skill-development dashboard is ready.
    Track your learning, unlock premium content, and grow professionally —
    all in one powerful space.
  </p>

  <MotivationRotator />
</motion.div>
      {/* Small Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex flex-wrap gap-6 pt-4 text-sm text-gray-300"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Active Learner
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Dashboard Synced
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          Progress Tracking Enabled
        </div>
      </motion.div>
    </div>
  </motion.div>
</motion.div>

        {/* ================= ACCESS CARD ================= */}
        {!profile?.paymentStatus && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-yellow-400/50 via-orange-400/40 to-pink-500/50"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-8 bg-[#0B1224]/90 backdrop-blur-xl rounded-3xl p-8">
              <div>
                <h2 className="text-2xl font-semibold">🔒 Access Locked</h2>
                <p className="text-gray-400 mt-2 max-w-xl">
                  Unlock lifetime access to all premium courses, PDFs,
                  recorded sessions, and future updates with a one-time payment.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/payment")}
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Unlock ₹198
              </button>
            </div>
          </motion.div>
        )}
        

        {/* ================= 📊 PROGRESS WIDGETS (UPGRADED) ================= */}
<Reveal ><motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.6 }}
  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
>
  <ProgressCard title="Courses Completed" value={3} max={12} color="blue" />
  <ProgressCard title="Hours Learned" value={18} max={40} color="purple" />
  <ProgressCard title="PDFs Downloaded" value={7} max={15} color="pink" />
  <ProgressCard title="Sessions Attended" value={5} max={10} color="green" />
</motion.div> </Reveal>

       {/* ================= ⏱ CONTINUE LEARNING (UPGRADED) ================= */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.7 }}
  whileHover={{ y: -6 }}
  className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"
>
  <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 overflow-hidden">

    {/* Soft Glow Aura */}
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-40" />

    {/* Left Content */}
    <div className="relative space-y-3">
      <h2 className="text-2xl font-semibold">
        ⏱ Continue Learning
      </h2>

      <p className="text-gray-400 max-w-md">
        You're making great progress. Resume your last active course and keep
        your momentum going strong.
      </p>

      <div className="text-sm text-green-400 font-medium">
        🔥 75% Course Completion
      </div>
    </div>

    {/* Progress Ring + CTA */}
    <div className="relative flex items-center gap-6">

      <ProgressRing percentage={75} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/dashboard/courses")}
        className="relative px-8 py-3 rounded-xl font-semibold text-white
                   bg-gradient-to-r from-blue-500 to-purple-600
                   shadow-lg shadow-blue-500/30
                   transition-all duration-300"
      >
        Resume →
      </motion.button>
    </div>
  </div>
</motion.div>

        {/* ================= QUICK ACCESS ================= */}
        <Reveal><div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Quick Access</h2>
            <p className="text-gray-400 text-sm mt-1">
              Jump directly into your learning resources
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Courses" desc="Soft skills, leadership & career growth" path="/dashboard/courses" locked={!profile?.paymentStatus} />
            <DashboardCard title="Recorded Sessions" desc="Request access if you missed a live class" path="/dashboard/recorded" locked={!profile?.paymentStatus} />
            <DashboardCard title="PDFs & Notes" desc="Downloadable study material" path="/dashboard/pdfs" locked={!profile?.paymentStatus} />
          </div>
        </div>
         </Reveal>
       {/* ================= 📅 RECENT ACTIVITY (UPGRADED TIMELINE) ================= */}
<Reveal><motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.6 }}
  className="space-y-8"
>
  <div>
    <h2 className="text-2xl font-semibold">📅 Recent Activity</h2>
    <p className="text-gray-400 text-sm mt-1">
      Your latest learning actions and milestones
    </p>
  </div>

  <div className="relative pl-6 border-l border-white/10 space-y-8">
    <TimelineItem
      icon="🎓"
      title="Completed Module"
      desc="Time Management"
      time="2 hours ago"
    />
    <TimelineItem
      icon="📄"
      title="Downloaded PDF"
      desc="Leadership Notes"
      time="Yesterday"
    />
    <TimelineItem
      icon="🎥"
      title="Watched Session"
      desc="Communication Skills"
      time="3 days ago"
    />
  </div>
</motion.div> </Reveal>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ProgressCard({
  title,
  value,
  max,
  color,
}: {
  title: string;
  value: number;
  max: number;
  color: "blue" | "purple" | "pink" | "green";
}) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorMap = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    pink: "from-pink-400 to-pink-600",
    green: "from-green-400 to-green-600",
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 overflow-hidden"
    >
      {/* Glow Accent */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${colorMap[color]}`}
      />

      <p className="text-gray-400 text-sm">{title}</p>

      <div className="mt-3 flex items-end gap-2">
        <CountUp target={value} />
        <span className="text-gray-400 text-sm">/ {max}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]}`}
        />
      </div>
    </motion.div>
  );
}


/* ================= DYNAMIC GREETING ================= */

function DynamicGreeting({ name }: { name: string }) {
  const hour = new Date().getHours();

  let greeting = "Welcome";
  let emoji = "👋";

  if (hour < 12) {
    greeting = "Good Morning";
    emoji = "🌅";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    emoji = "☀️";
  } else {
    greeting = "Good Evening";
    emoji = "🌙";
  }

  return (
    <>
      {greeting}{" "}
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
        {name}
      </span>{" "}
      {emoji}
    </>
  );
}

/* ================= MOTIVATION ROTATOR ================= */

function MotivationRotator() {
  const quotes = [
    "Small progress is still progress.",
    "Consistency beats intensity.",
    "You’re closer than you think.",
    "Level up your skills today.",
    "Discipline creates freedom.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      key={index}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-sm text-blue-400 font-medium"
    >
      ✨ {quotes[index]}
    </motion.p>
  );
}


function TimelineItem({
  icon,
  title,
  desc,
  time,
}: {
  icon: string;
  title: string;
  desc: string;
  time: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[14px] top-2 w-4 h-4 rounded-full 
                      bg-gradient-to-br from-blue-400 to-purple-500 
                      shadow-lg shadow-blue-500/30" />

      {/* Card */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      p-5 transition-all duration-300
                      group-hover:border-white/20
                      group-hover:bg-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-xl">{icon}</div>
          <h4 className="font-semibold">{title}</h4>
        </div>

        <p className="text-gray-400 text-sm">{desc}</p>

        <div className="mt-3 text-xs text-blue-400 font-medium">
          {time}
        </div>
      </div>
    </motion.div>
  );
}


function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Animated Progress */}
        <motion.circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        {percentage}%
      </div>
    </div>
  );
}




function ActivityItem({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-gray-300">
      {text}
    </div>
  );
}


function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span className="text-2xl font-bold">{count}</span>;
}


function DashboardCard({ title, desc, path, locked }: any) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onClick={() => router.push(locked ? "/dashboard/payment" : path)}
      className="relative group cursor-pointer"
    >
      {/* Animated Border Layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      <motion.div
        whileHover={{ rotateX: 4, rotateY: -4 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative rounded-2xl p-[1.5px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-white/20">

          {/* Locked Badge */}
          {locked && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-4 right-4 text-xs bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full backdrop-blur-md border border-yellow-400/30"
            >
              🔒 Locked
            </motion.span>
          )}

          <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition">
            {title}
          </h3>

          <p className="text-gray-400 group-hover:text-gray-300 transition">
            {desc}
          </p>

          {/* Hover Arrow */}
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-6 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition"
          >
            Open →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= SKELETONS ================= */

function Skeleton({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/10 ${className}`}>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-white/10 space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
