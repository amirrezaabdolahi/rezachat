import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const res = await fetch(
            `${process.env.BASE_BACKEND_URL}api/accounts/api-token-auth/`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json(
                { success: false, message: data.detail },
                { status: res.status }
            );
        }

        return NextResponse.json(
            { success: true, data: data },
            { status: res.status }
        );
    } catch (error) {
        console.log("error in route auth is :  ", error);
        return NextResponse.json(
            { success: false, message: error.detail },
            { status: error.status }
        );
    }
}
