"use client";
import { chats } from "@/fakeDatas";
import React from "react";
import UserSideBarBox from "./UserSideBarBox";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "@/features/user/slice/userSlice";


const UserSiderBar = ({chats}) => {

    return (
        <div className="col-span-3 rounded-lg flex flex-col gap-2 p-2">
            {chats?.map((chat) => (
                <UserSideBarBox key={chat.id} chat={chat} />
            ))}
            <button className=" p-2 mx-4 cursor-pointer hover:bg-white/90 active:bg-white/80 bg-white text-black rounded-lg flex items-center justify-center">
                <Plus />
            </button>
        </div>
    );
};

export default UserSiderBar;
