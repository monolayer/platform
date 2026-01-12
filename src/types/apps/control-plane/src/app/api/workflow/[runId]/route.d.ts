import { NextResponse } from "next/server";
export declare function GET(request: Request, context: {
    params: Promise<{
        runId: string;
    }>;
}): Promise<NextResponse<{
    result: unknown;
}> | NextResponse<{
    status: "cancelled" | "failed" | "pending" | "running";
}>>;
