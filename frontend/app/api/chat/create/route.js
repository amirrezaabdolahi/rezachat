import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("Token")?.value;

        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }

        console.log("body is : ", body);

        const res = await fetch(
            `${process.env.BASE_BACKEND_URL}api/chat/chats/create/`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },

                body: JSON.stringify({ target_id: body.targetId }),
            },
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);

            return NextResponse.json(
                errorData || { success: false, message: "خطای بک‌اند" },
                { status: res.status },
            );
        }

        const data = await res.json();

        // ⬅️ contract ثابت با frontend
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "خطا در ارتباط با Server بک‌اند" },
            { status: 500 },
        );
    }
}
