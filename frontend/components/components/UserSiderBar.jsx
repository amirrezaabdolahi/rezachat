import { chats, users } from "@/fakeDatas";
import React from "react";
import UserSideBarBox from "./UserSideBarBox";
import { Plus } from "lucide-react";

const UserSiderBar = () => {
    return (
        <div className="col-span-3 bg-white/10 rounded-lg flex flex-col gap-2 p-2">
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
