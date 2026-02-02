"use client";
import React from "react";
import UserSiderBar from "./UserSiderBar";
import { useSelector } from "react-redux";

const SideBar = ({ chats, currentUser }) => {
    const selectedChat = useSelector((s) => s.chat.selectedChat);

    return (
        <div
            className={` h-full ${selectedChat ? "hidden md:block col-span-full md:col-span-2" : "block md:block col-span-full md:col-span-2"} `}
        >
            <UserSiderBar chats={chats} currentUser={currentUser} />
        </div>
    );
};

export default SideBar;
