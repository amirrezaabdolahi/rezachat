import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const res = await fetch(
            `${process.env.BASE_BACKEND_URL}api/accounts/register/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: data.error },
                { status: res.status }
            );
        }

        return NextResponse.json(
            { success: true, data: data },
            { status: res.status }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.detail },
            { status: error.status }
        );
    }
}
