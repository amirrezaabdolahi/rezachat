"use client";
import React from "react";
import UserSideBarBox from "./UserSideBarBox";
import { Plus } from "lucide-react";
import { Chat } from "@/types/chat";

interface UserSideBarProps {
    chats: Chat[];
}


const UserSiderBar: React.FC<UserSideBarProps> = ({ chats }) => {
    return (
        <div className="col-span-3 rounded-lg flex flex-col gap-2 p-2">
            {chats.map((chat) => (
                <UserSideBarBox key={chat.id} chat={chat} />
            ))}

            <button className="p-2 mx-4 cursor-pointer hover:bg-white/90 active:bg-white/80 bg-white text-black rounded-lg flex items-center justify-center">
                <Plus />
            </button>
        </div>
    );
};

export default UserSiderBar;
