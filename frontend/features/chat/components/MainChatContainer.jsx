"use client";

import React from "react";
import { useSelector } from "react-redux";
import ProfileBar from "../../../components/ProfileBar";
import ChatSection from "./ChatSection";
import ChatInput from "./ChatInput";
import ContextMenu from "../../../components/ContextMenu";

const MainChatContainer = () => {
    const selectedChat = useSelector((s) => s.chat.selectedChat);

    return (
        <div
            className={` h-dvh ${selectedChat ? "block md:block col-span-full md:col-span-4" : "hidden md:block col-span-full md:col-span-4"}  h-full  flex-col px-2 py-10 relative`}
        >
            <ProfileBar />
            <div className="absolute top-0 right-0 left-0 bottom-0 py-20 overflow-hidden flex flex-col ">
                <div
                    className="w-full h-full flex flex-col overflow-auto"
                    style={{ scrollbarWidth: "none" }}
                >
                    <ChatSection />
                </div>
            </div>
            <ChatInput />
            <ContextMenu />
        </div>
    );
};

export default MainChatContainer;
