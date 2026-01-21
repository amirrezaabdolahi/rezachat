"use server";

import { cookies } from "next/headers";

export async function SetTokenCookie(data) {
    (await cookies()).set("Token", data);
}
export async function GetTokenCookie() {
    const token = (await cookies()).get("Token");
}

// (await cookies()).set({
//   name: "Token",
//   value: data,
//   httpOnly: true,  // JS نمی‌تونه بخونه
//   secure: true,    // فقط HTTPS
//   path: "/",       // cookie برای کل سایت
//   maxAge: 60 * 60 * 24, // 1 روز
// });