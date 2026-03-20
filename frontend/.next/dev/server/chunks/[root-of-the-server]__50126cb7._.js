module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/frontend/lib/resendEmail.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendEmail",
    ()=>sendEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function sendEmail(to, subject, html) {
    try {
        const data = await resend.emails.send({
            from: "SkillsBoostHub <onboarding@resend.dev>",
            to: [
                to
            ],
            subject: subject,
            html: html
        });
        console.log("Email sent:", data);
        return data;
    } catch (error) {
        console.error("Resend Email Error:", error);
        throw error;
    }
}
}),
"[project]/frontend/app/api/send-welcome-mail/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$resendEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/lib/resendEmail.ts [app-route] (ecmascript)");
;
;
async function POST(req) {
    const body = await req.json();
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$lib$2f$resendEmail$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(body.email, "Welcome to SkillsBoostHub 🚀", `
      <div style="font-family:Arial, sans-serif; background:#f6f8fc; padding:40px">
        
        <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.1)">
          
          <div style="background:linear-gradient(90deg,#7c3aed,#4f46e5); padding:30px; text-align:center; color:white">
            <h1 style="margin:0">SkillsBoostHub</h1>
            <p style="margin-top:8px">Learn. Grow. Get Hired.</p>
          </div>

          <div style="padding:35px">

            <h2 style="margin-top:0">Welcome ${body.name || "Student"} 👋</h2>

            <p>
              Your <strong>SkillsBoostHub</strong> account has been successfully created.
            </p>

            <p>
              You can now access your dashboard, attend webinars, and start building job-ready skills.
            </p>

            <div style="text-align:center; margin:30px 0">
              <a 
                href="https://skillsboosthub.com/dashboard"
                style="
                  background:#7c3aed;
                  color:white;
                  padding:14px 28px;
                  border-radius:8px;
                  text-decoration:none;
                  font-weight:bold;
                  display:inline-block;
                "
              >
                Go To Dashboard
              </a>
            </div>

            <p>
              If you have any questions, feel free to contact our support team.
            </p>

            <p>
              Happy Learning 🚀
            </p>

            <br/>

            <p style="color:#666;font-size:14px">
              — Team SkillsBoostHub
            </p>

          </div>

        </div>

      </div>
      `);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__50126cb7._.js.map