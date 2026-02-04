import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.BASE_BACKEND_URL}/api/chat/chats/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return NextResponse.json(
        errorData || { success: false, message: "خطای بک‌اند" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // فقط اطمینان حاصل کن data موجوده
    return NextResponse.json(
      { chats: data?.chats || [], user: data?.user || null },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "خطا در ارتباط با Server بک‌اند" },
      { status: 500 }
    );
  }
}
