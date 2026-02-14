
import MainChatContainer from "@/features/chat/components/MainChatContainer";
import SearchBox from "@/features/search/components/Search";
import SideBar from "@/features/user/components/SideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
    const token = (await cookies()).get("Token");
    if (!token?.value) {
        redirect("/auth");
    }

    return (
        <div className="container h-screen mx-auto ">
            <div className="grid w-full grid-cols-6 h-dvh gap-2 ">
                <SideBar />
                <MainChatContainer />
                <SearchBox />
            </div>
        </div>
    );
}
