"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { chatActions } from "@/features/chatSlice";
import { messagesData } from "@/fakeDatas";

const UserSideBarBox = ({ user }) => {
    const dispatch = useDispatch();

    return (
        <div
            key={user.id}
            className="w-full p-2 flex items-center justify-between bg-white/30 rounded-lg hover:bg-white/40 select-none active:bg-white/50 "
            onClick={() => {
                dispatch(chatActions.selectChat(user.id));
                dispatch(chatActions.messages(messagesData.data[user.id].messages));
            }}
        >
            <div className="flex gap-2 items-center">
                <div className="w-13 h-13 rounded-full relative bg-white/40 flex items-center justify-center object-cover ">
                    {user.profile ? (
                        <Image
                            src={user.profile}
                            alt={"user profile image"}
                            className="w-full h-full rounded-full"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={"/profile.jpg"}
                            alt={"user profile image"}
                            className="w-full h-full rounded-full"
                            width={100}
                            height={100}
                        />
                    )}

                    {user.status === "online" ? (
                        <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-1 rounded-full" />
                    ) : null}
                </div>

                <div className="flex flex-col">
                    <p className="text-white font-bold">{user.username}</p>
                    <p className="text-white/80 text-sm">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserSideBarBox;
