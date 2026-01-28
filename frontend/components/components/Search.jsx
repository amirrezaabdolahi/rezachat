"use client";

import { ClockFading, Search } from "lucide-react";
import React, { useState } from "react";
import SearchUserBox from "./SearchUserBox";
import { useLazySearchUsersQuery, useSearchUsersQuery } from "@/features/uiApi";

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState("");

    const { isLoading, data, isError } = useSearchUsersQuery("amir");

    const handleSearch = () => {
        if (!isLoading) {
            console.log(data);
        }
    };

    return (
        <div className="absolute z-999 top-0 right-0 left-0 bottom-0 bg-black/50 flex items-center justify-center">
            <div className="w-100">
                <div className="bg-white flex items-center rounded-full text-black px-4">
                    <input
                        className="placeholder:text-xs flex items-center py-2 text-xs w-full outline-0 rounded-full border"
                        placeholder="search for new contacts"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <Search
                        className="cursor-pointer "
                        onClick={handleSearch}
                    />
                </div>
                <div className="w-full flex flex-col gap-2 bg-black py-2 mt-2 rounded-lg ">
                    <SearchUserBox />
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
