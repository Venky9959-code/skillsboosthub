import PublicNavbar from "@/components/PublicNavbar";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <PublicNavbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">
          About SkillsBoostHub
        </h1>

        <div className="space-y-6 text-gray-700 text-lg">
          <p>
            SkillsBoostHub was created with one simple goal —
            to make quality skill education affordable and accessible for everyone.
          </p>

          <p>
            Many students and professionals struggle due to lack of
            practical skills, confidence, and guidance.
            SkillsBoostHub bridges that gap with simple, practical,
            and real-world learning.
          </p>

          <p>
            With a one-time lifetime access model, we ensure
            learning never stops due to financial barriers.
          </p>
        </div>
      </section>
    </div>
  );
}
