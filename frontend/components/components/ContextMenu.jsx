"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "@/features/chatSlice";

const ContextMenu = () => {
    const dispatch = useDispatch();

    const optionMessage = useSelector((s) => s.chat.optionMessage);

    const { visible, x, y, message } = optionMessage;
    // اگر منو خالیه یا پیام وجود نداره، منو رو render نکن
    if (!visible) return null;

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(chatActions.closeOptionMessage());
    };

    return (
        <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 "
            onClick={handleClose}
        >
            <div
                style={{
                    position: "fixed",
                    top: y,
                    left: x,
                    background: "#222",
                    color: "#fff",
                    padding: "8px",
                    zIndex: 1000,
                }}
                className="rounded-lg w-50"
            >
                <ul className="list-none m-0 p-0">
                    <li className="p-1 hover:bg-gray-700 cursor-pointer">
                        Reply
                    </li>
                    <li className="p-1 hover:bg-gray-700 cursor-pointer">
                        Edit
                    </li>
                    <li className="p-1 hover:bg-red-600 cursor-pointer">
                        Delete
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContextMenu;
