import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        console.log(body);

        console.log( request.headers.get("authorization") || "");

        const res = await fetch(
            `${process.env.BASE_BACKEND_URL}api/chat/chats/create/`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: request.headers.get("authorization") || "",
                },

                body: JSON.stringify(body),
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
