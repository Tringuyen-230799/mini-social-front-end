import { NextRequest, NextResponse } from "next/server";
const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://localhost:5000';


interface Options {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  includeBody?: boolean;
  requireAuth?: boolean;
  clearCookie?: boolean;
}

export async function request(
  request: NextRequest,
  options: Options,
): Promise<NextResponse> {
  try {
    const {
      endpoint,
      method = "GET",
      includeBody = false,
      requireAuth = false,
      clearCookie = false,
    } = options;

    const sessionCookie = request.cookies.get("session");

    if (requireAuth && !sessionCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionCookie && {
        Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
      }),
    };

    // Prepare request config
    const config: RequestInit = {
      method,
      headers,
    };

    if (includeBody && (method === "POST" || method === "PUT")) {
      const body = await request.json();
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${EXPRESS_API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    const nextResponse = NextResponse.json(data);

    const cookies = response.headers.get("set-cookie");
    if (cookies) {
      nextResponse.headers.set("set-cookie", cookies);
    }

    if (clearCookie) {
      nextResponse.cookies.delete("session");
    }

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
