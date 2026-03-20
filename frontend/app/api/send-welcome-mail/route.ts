import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resendEmail";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await sendEmail(
      body.email,
      "Welcome to SkillsBoostHub 🚀",
      `
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
      `
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}