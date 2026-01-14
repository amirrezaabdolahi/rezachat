"use client";
import { chats } from "@/fakeDatas";
import React from "react";
import UserSideBarBox from "./UserSideBarBox";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

const UserSiderBar = () => {
    const currentUser = useSelector((state) => state.user);

    const filteredChats = chats.filter((chat) => {
        if (chat.users.map((user) => user.id).includes(currentUser.id)) {
            return chat;
        }
    });

    console.log(filteredChats);

    return (
        <div className="col-span-3 bg-white/10 rounded-lg flex flex-col gap-2 p-2">
            {filteredChats?.map((chat, index) => (
                <UserSideBarBox key={chat.id} chat={filteredChats[index]} />
            ))}
            <button className="w-full p-2 cursor-pointer hover:bg-white/90 active:bg-white/80 bg-white text-black rounded-lg flex items-center justify-center">
                <Plus />
            </button>
        </div>
    );
};

export default UserSiderBar;
