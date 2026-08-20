import { NextResponse } from "next/server";

/**
 * Shallow liveness check: proves the process can respond. It performs no
 * database or provider call and returns no secrets, environment values,
 * or dependency detail. See docs/12_DEPLOYMENT.md section 3.
 */
export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "ai-digital-invitation-platform",
      time: new Date().toISOString(),
    },
    { status: 200 },
  );
}
