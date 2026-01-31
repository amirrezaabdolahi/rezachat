import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q");

        const params = new URLSearchParams();

        params.append("q", q);

        const query = params.toString();

        const url = `${process.env.BASE_BACKEND_URL}api/accounts/search-user/${
            query ? `?${query}` : ""
        }`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: "خطا در ارتباط با API بک‌اند" },
                { status: res.status },
            );
        }

        const data = await res.json();

        // ⬅️ contract ثابت با frontend
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "خطا در ارتباط با Server بک‌اند" },
            { status: res.status },
        );
    }
}
