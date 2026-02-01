"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchUserBox from "./SearchUserBox";
import { useLazySearchUsersQuery, useSearchUsersQuery } from "@/features/uiApi";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "@/features/uiSlice";

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchUsers, { data, isLoading, isError }] =
        useLazySearchUsersQuery();

    const isSearching = useSelector((s) => s.ui.isSearching);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!searchValue.trim()) return;

        const timeout = setTimeout(() => {
            searchUsers(searchValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue]);

    if (!isSearching) return null;

    return (
        <div
            className="absolute z-40 top-0 right-0 left-0 bottom-0 bg-black/50 flex items-center justify-center"
            onClick={() => {
                dispatch(UiActions.toggleIsSearching(false));
            }}
        >
            <div
                className="w-100 z-50 p-4"
                onClick={(e) => e.stopPropagation()}
            >
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
                        onClick={() => {
                            searchUsers(searchValue);
                        }}
                    />
                </div>
                <div className="w-full flex flex-col gap-2 bg-black py-2 mt-2 rounded-lg ">
                    {isLoading && (
                        <p className="text-white text-xs text-center">Loading...</p>
                    )}
                    {isError && <p className="text-red-500 text-xs">Error</p>}
                    {searchValue.length <= 0 && (
                        <p className="text-sm text-center">Search</p>
                    )}
                    {data?.data.length === 0 && searchValue.length > 2 && (
                        <p className="text-sm text-center">No user found</p>
                    )}
                    {searchValue.length >= 2 &&
                        data?.data?.map((user) => (
                            <SearchUserBox key={user.id} user={user} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
