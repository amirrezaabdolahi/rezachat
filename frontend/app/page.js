import ChatHeader from "@/components/components/ChatHeader";
import ChatInput from "@/components/components/ChatInput";
import ChatSection from "@/components/components/ChatSection";
import UserSiderBar from "@/components/components/UserSiderBar";
import { messagesData } from "@/fakeDatas";
import {
    ArrowBigLeft,
    ArrowLeft,
    CalendarArrowDown,
    Plus,
    Send,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const user = {
    id: 1,
    username: "root",
    email: "amirenzevadev@gmail.com",
    status: "online",
};

export default function Home() {
    return (
        <div className="container w-full mx-auto h-screen flex items-center">
            <div className="grid grid-cols-12 w-full h-[90%] gap-4">
                {/* sideBar for choose the the contact */}
                <UserSiderBar />
                
                {/* main chat view */}
                <div className="col-span-9 grid grid-cols-1 gap-4 grid-rows-10 w-full h-full bg-white/10 rounded-lg p-2 relative">
                    {/* chat header profile bar */}
                    <ChatHeader />

                    {/* chat view chat room */}
                    <div className=" col-span-1 row-span-8 rounded-lg relative chat-main overflow-hidden ">
                        <ChatSection messagesData={messagesData} user={user} />
                    </div>

                    {/* chat send message input */}
                    <div className=" col-span-1 row-span-1 rounded-lg overflow-hidden ">
                        <ChatInput />
                    </div>
                </div>
            </div>
        </div>
    );
}
