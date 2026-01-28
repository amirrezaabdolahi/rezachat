import ChatHeader from "@/components/components/ChatHeader";
import ChatInput from "@/components/components/ChatInput";
import ChatSection from "@/components/components/ChatSection";
import ProfileBar from "@/components/components/ProfileBar";
import SearchBox from "@/components/components/Search";
import UserSiderBar from "@/components/components/UserSiderBar";
import { ArrowRight, Search } from "lucide-react";
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
                <div className="col-span-2 h-full">
                    <UserSiderBar chats={chats} currentUser={currentUser} />
                </div>
                <div className="col-span-4 h-full flex flex-col px-2 py-10  relative">
                    <ProfileBar />
                    <div
                        className="w-full max-h-200 flex flex-col overflow-auto"
                        style={{ scrollbarWidth: "none" }}
                    >
                        <ChatSection />
                    </div>
                    <ChatInput />
                </div>
            </div>
        </div>
    );
}
