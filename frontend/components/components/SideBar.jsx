"use client";
import React, { useEffect } from "react";
import UserSiderBar from "./UserSiderBar";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatsQuery } from "@/features/chatApi";
import { userSliceActions } from "@/features/userSlice";

const SideBar = () => {
    const selectedChat = useSelector((s) => s.chat.selectedChat);
    const dispatch = useDispatch();

    const { data, isLoading } = useGetChatsQuery();
    useEffect(() => {
        if (data?.user) {
            dispatch(userSliceActions.setUser(data.user));
        }
    }, [data, dispatch]);

    if (isLoading) {
        return <p>loading...</p>;
    }

    return (
        <div
            className={` h-full ${selectedChat ? "hidden md:block col-span-full md:col-span-2" : "block md:block col-span-full md:col-span-2"} `}
        >
            <UserSiderBar chats={data?.chats} />
        </div>
    );
};

export default SideBar;
