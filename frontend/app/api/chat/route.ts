import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const msg = message.toLowerCase();

    let reply = "I can help you with courses, pricing, or dashboard.";

    if (msg.includes("course")) {
      reply = "We offer courses like Communication, Leadership, and Skill Development.";
    } 
    else if (msg.includes("price") || msg.includes("payment")) {
      reply = "You can unlock all premium courses with a one-time payment of ₹198.";
    } 
    else if (msg.includes("login")) {
      reply = "Try logging out and logging in again. If issue persists, contact support.";
    } 
    else if (msg.includes("dashboard")) {
      reply = "Your dashboard contains courses, recorded sessions, and PDFs.";
    } 
    else if (msg.includes("hello") || msg.includes("hi")) {
      reply = "Hi 👋 How can I help you today?";
    }

    else if (msg.includes("best course")) {
      reply = "If you're starting, I recommend Communication + Leadership courses.";
    }

    else if (msg.includes("free")) {
      reply = "Currently, basic access is free. Upgrade to unlock full content.";
    }

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({
      reply: "Something went wrong. Please try again.",
    });
  }
}