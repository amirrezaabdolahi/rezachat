import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("Token")?.value;
        const { id } = await params;

        console.log("+++++++>", token, id);
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const res = await fetch(
            `${process.env.BASE_BACKEND_URL}api/chat/${id}/del_message/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            },
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));

            return NextResponse.json(
                { error: errorData.error || "Failed to delete message" },
                { status: res.status },
            );
        }
        return NextResponse.json({ success: true }, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete message" },
            { status: 500 },
        );
    }
}
