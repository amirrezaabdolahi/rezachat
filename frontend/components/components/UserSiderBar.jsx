"use client";
import { chats } from "@/fakeDatas";
import React from "react";
import UserSideBarBox from "./UserSideBarBox";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "@/features/userSlice";


const UserSiderBar = ({chats , currentUser}) => {

    const dispath = useDispatch()

    if (currentUser) {
        dispath(userSliceActions.setUser(currentUser))
    }

    console.log(chats);

    return (
        <div className="col-span-3 rounded-lg flex flex-col gap-2 p-2">
            {chats?.map((chat) => (
                <UserSideBarBox key={chat.id} chat={chat} />
            ))}
            <button className="w-full p-2 cursor-pointer hover:bg-white/90 active:bg-white/80 bg-white text-black rounded-lg flex items-center justify-center">
                <Plus />
            </button>
        </div>
    );
};

export default UserSiderBar;
