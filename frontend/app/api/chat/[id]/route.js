import { cookies } from "next/headers";

export async function GET(request, { params }) {
    const token = cookies().get("Token")?.value;

    const res = await fetch(
        `${process.env.BASE_BACKEND_URL}api/chat/${params.id}/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    const data = await res.json();
    return Response.json(data);
}
export async function POST(request, { params }) {
    const token = cookies().get("Token")?.value;

    if (!token) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(
        `${process.env.BASE_BACKEND_URL}api/chat/${params.id}/sent_message/`,
        {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });
}
