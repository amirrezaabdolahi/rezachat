"use client";
import React, { useEffect } from "react";
import UserSiderBar from "./UserSiderBar";
import { useGetChatsQuery } from "@/features/chat/api/chatApi";
import { userSliceActions } from "@/features/user/slice/userSlice";
import SideUserLoading from "./SideUserLoading";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SideBar: React.FC = () => {
    const selectedChat = useAppSelector((s) => s.chat.selectedChat);
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetChatsQuery();

    useEffect(() => {
        if (data?.user) {
            dispatch(userSliceActions.setUser(data.user));
        }
    }, [data, dispatch]);

    const baseClasses = "h-full col-span-full md:col-span-2";
    const visibility = selectedChat ? "hidden md:flex" : "flex";

    if (isLoading) {
        return (
            <div className={`${baseClasses} ${visibility} gap-2 flex-col`}>
                <SideUserLoading />
                <SideUserLoading />
                <SideUserLoading />
                <SideUserLoading />
            </div>
        );
    }

    return (
        <div
            className={`${baseClasses} ${selectedChat ? "hidden md:block" : "block"}`}
        >
            <UserSiderBar chats={data?.chats ?? []} />
        </div>
    );
};

export default SideBar;
