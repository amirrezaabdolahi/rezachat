import ChatInput from "@/components/components/ChatInput";
import ChatSection from "@/components/components/ChatSection";
import ContextMenu from "@/components/components/ContextMenu";
import MainChatContainer from "@/components/components/MainChatContainer";
import ProfileBar from "@/components/components/ProfileBar";
import SearchBox from "@/components/components/Search";
import SideBar from "@/components/components/SideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
    const token = (await cookies()).get("Token");

    let chats = [];
    let currentUser = null;

    if (!token?.value) {
        redirect("/auth");
    }

    try {
        const response = await fetch(
            `${process.env.BASE_BACKEND_URL}api/chat/chats/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token.value}`,
                },
            },
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        chats = data?.chats;
        currentUser = data?.user;
    } catch (err) {
        console.error(err);
    }

    return (
        <div className="container h-screen mx-auto flex items-center">
            <div className="grid w-full grid-cols-6 h-[90%] gap-2 ">
                <SideBar chats={chats} currentUser={currentUser} />
                <MainChatContainer />
                <SearchBox />
            </div>
        </div>
    );
}
