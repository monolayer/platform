import { NextResponse } from "next/server";
export declare function GET(request: Request): Promise<NextResponse<{
    runId: string;
}>>;
