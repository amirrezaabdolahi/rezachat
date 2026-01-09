import { users } from "@/fakeDatas";
import React from "react";
import UserSideBarBox from "./UserSideBarBox";

const UserSiderBar = () => {
    return (
        <div className="col-span-3 bg-white/10 rounded-lg flex flex-col gap-2 p-2">
            {users?.data?.map((user) => (
                <UserSideBarBox key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserSiderBar;
