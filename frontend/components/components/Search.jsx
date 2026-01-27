"use client";

import { ArrowRight, Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
    return (
        <div className="absolute z-999 top-0 right-0 left-0 bottom-0 bg-black/50 flex items-center justify-center">
            <div className="w-100">
                <div className="bg-white flex items-center rounded-full text-black px-4">
                    <input
                        className="placeholder:text-xs flex items-center py-2 text-xs w-full outline-0 rounded-full border"
                        placeholder="search for new contacts"
                    />
                    <Search className="cursor-pointer " />
                </div>
                <div className="w-full flex flex-col bg-black py-2 mt-2 rounded-lg ">
                    <div className="py-2 px-4 rounded-full text-sm flex items-center justify-between bg-white/20">
                        <p className="">root</p>
                        <button className="bg-white text-black rounded-full px-4 cursor-pointer ">
                            <ArrowRight className="" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
