"use client";

import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "@/public/currentProfile.jpg";
import { Search, Settings } from "lucide-react";
import Link from "next/link";
import { UiActions } from "@/features/uiSlice";

const ProfileBar = () => {
    const currentUser = useSelector((s) => s.user.currentUser);
    const currentChat = useSelector((s) => s.chat.chatInfo);
    const contact = useSelector((s) => s.user.contact);

    const dispatch = useDispatch();

    return (
        <div className="rounded-xl absolute top-0 right-0 left-0 bg-black/20 backdrop-blur-lg z-40 p-2 flex items-center justify-between ">
            <p className="text-xl font-bold text-white">
                {currentChat?.name
                    ? currentChat.name
                    : contact
                      ? contact.username
                      : currentUser.username}
            </p>
            <div className="flex items-center gap-2">
                <div
                    className="w-13 h-13 hover:bg-white/30 transition-all rounded-full bg-white/20 flex items-center justify-center"
                    onClick={() => dispatch(UiActions.toggleIsSearching(true))}
                >
                    <Search />
                </div>
                <Link
                    href={"/"}
                    className="w-13 h-13 hover:bg-white/30 transition-all rounded-full bg-white/20 flex items-center justify-center"
                >
                    <Settings />
                </Link>
                <div className="w-13 h-13 rounded-full relative drop-shadow-lg bg-white/40 flex items-center justify-center object-cover ">
                    {currentUser?.profile ? (
                        <Image
                            src={contact.profile}
                            alt={"contact profile image"}
                            className="w-full h-full rounded-full"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={profileImg.src}
                            alt={"contact profile image"}
                            className="w-full h-full rounded-full"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileBar;
