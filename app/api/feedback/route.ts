import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pain_point,
      pain_point_other,
      would_use,
      current_tool,
      email,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    } = body;

    if (!pain_point) {
      return NextResponse.json(
        { error: "pain_point is required" },
        { status: 400 }
      );
    }

    // Get referrer and user agent from headers
    const referrer = request.headers.get("referer") || null;
    const userAgent = request.headers.get("user-agent") || null;

    const { data, error } = await supabase
      .from("intent_feedback")
      .insert([
        {
          pain_point,
          pain_point_other: pain_point_other || null,
          would_use: would_use || null,
          current_tool: current_tool || null,
          email: email || null,
          referrer,
          user_agent: userAgent,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_term: utm_term || null,
          utm_content: utm_content || null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Er ging iets mis. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

