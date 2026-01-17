"use server";

import { cookies } from "next/headers";

export async function SetTokenCookie(data) {
    (await cookies()).set("Token", data);
}
export async function GetTokenCookie() {
    const token = (await cookies()).get("Token");
}
