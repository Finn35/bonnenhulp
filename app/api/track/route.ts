import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { event, data } = await request.json();
    
    // Log the event (in production, you'd save this to your database)
    console.log("Tracked event:", event, data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

