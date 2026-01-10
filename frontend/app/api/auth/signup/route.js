import { NextResponse } from "next/server";


export async function POST(req , params) {
    const body = req.body;

    console.log(body);
}
