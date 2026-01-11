"use server"

import { cookies } from "next/headers"



export async function SetTokenCookie(data) {
    (await cookies()).set("Token" , data)
}
export async function SetRefreshCookie(data) {
    (await cookies()).set("Refresh" , data)
}