"use client"

import { ArrowRight } from "lucide-react";
import React from "react";


const SearchUserBox = (
    {
        user
    }
) => {


    return (
        <div className="py-2 px-4 rounded-full text-sm flex items-center justify-between bg-white/20">
            <p className="">{user.username}</p>
            <button className="bg-white text-black rounded-full px-4 cursor-pointer ">
                <ArrowRight className="" size={20} />
            </button>
        </div>
    );
};

export default SearchUserBox;
