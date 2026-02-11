"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "@/features/chat/slice/chatSlice";
import { chats } from "@/fakeDatas";
import { userSliceActions } from "@/features/user/slice/userSlice";
import { useGetMessagesQuery } from "@/features/chat/api/chatApi";

const ChatHeader = () => {
    const dispatch = useDispatch();
    const currentChatId = useSelector((state) => state.chat.selectedChat);
    const currentUser = useSelector((state) => state.user.currentUser);
    const contact = useSelector((state) => state.user.contact);

    if (!currentChatId && !contact) {
        return (
            <div className=" bg-white/30 col-span-1 row-span-1 flex items-center justify-center rounded-lg p-2">
                <p>contacts profile</p>
            </div>
        );
    }

    return (
        <div className="bg-white/30 col-span-1 row-span-1 rounded-lg p-2">
            <div className="flex items-center justify-between w-full h-full select-none">
                <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-full relative bg-white/40 flex items-center justify-center object-cover ">
                        {contact.profile ? (
                            <Image
                                src={contact.profile}
                                alt={"contact profile image"}
                                className="w-full h-full rounded-full"
                                width={100}
                                height={100}
                            />
                        ) : (
                            <Image
                                src={"/profile.jpg"}
                                alt={"contact profile image"}
                                className="w-full h-full rounded-full"
                                width={100}
                                height={100}
                            />
                        )}

                        {contact.status === "online" ? (
                            <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-1 rounded-full" />
                        ) : null}
                    </div>
                    <p className="font-bold">{contact.username}</p>
                </div>
                <div
                    className="bg-white/40 p-2 rounded-full hover:bg-white/50 active:bg-white/60"
                    onClick={() => {
                        dispatch(chatActions.selectChat(null));
                        dispatch(userSliceActions.setContact(null));
                    }}
                >
                    <ArrowLeft />
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
