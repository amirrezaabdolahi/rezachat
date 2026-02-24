"use client";

import React from "react";
import Image from "next/image";
import { chatActions } from "@/features/chat/slice/chatSlice";
import { userSliceActions } from "@/features/user/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Chat } from "@/types/chat";

const UserSideBarBox = ({ chat }: { chat: Chat }) => {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.user.currentUser);

    const contact = chat.users.find((u) => u.id !== currentUser?.id);

    return (
        <div
                className="w-full overflow-hidden p-2 flex items-center justify-between bg-white/30 rounded-lg hover:bg-white/40 select-none active:bg-white/50 "
            onClick={() => {
                dispatch(chatActions.selectChat(chat.id));
                dispatch(chatActions.selectChatInfo(chat));
                dispatch(userSliceActions.setContact(contact));
            }}
        >
            <div className="flex gap-2 items-center">
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

                <div className="flex flex-col">
                    <p className="text-white font-bold">{contact.username}</p>
                    <p className="text-white/80 text-sm">{contact.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserSideBarBox;
