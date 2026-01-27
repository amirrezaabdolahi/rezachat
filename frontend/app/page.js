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
            }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        chats = data?.chats;
        currentUser = data?.user;
    } catch (err) {
        console.error(err);
    }

    return (
        <div className="container w-full mx-auto h-screen flex items-center">
            <div className="grid grid-cols-12 w-full h-[90%] gap-4">
                {/* sideBar for choose the the contact */}
                <UserSiderBar chats={chats} currentUser={currentUser} />

                {/* main chat view */}
                <div className="col-span-9 grid grid-cols-1 gap-4 grid-rows-10 w-full h-full rounded-lg p-2 relative">
                    {/* chat header profile bar */}

                    <ProfileBar />

                    {/* <ChatHeader /> */}

                    {/* chat view chat room */}
                    <div className=" col-span-1 max-h-full row-span-8 rounded-lg relative chat-main overflow-hidden ">
                        <ChatSection />
                    </div>

                    {/* chat send message input */}
                    <div className=" col-span-1 row-span-1 rounded-lg   relative">
                        <ChatInput />
                    </div>
                </div>
            </div>
            <SearchBox />
        </div>
    );
}
