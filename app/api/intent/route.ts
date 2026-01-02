import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_type, page } = body;

    // Get referrer and user agent from headers
    const referrer = request.headers.get("referer") || null;
    const userAgent = request.headers.get("user-agent") || null;

    if (!event_type || !page) {
      return NextResponse.json(
        { error: "event_type and page are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("intent_events")
      .insert([
        {
          event_type,
          page,
          referrer,
          user_agent: userAgent,
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

