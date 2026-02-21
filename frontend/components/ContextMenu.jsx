"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "@/features/chat/slice/chatSlice";
import { useDeleteMessageMutation } from "@/features/message/api/messageApi";
import { useAppDispatch } from "@/redux/hooks";

const ContextMenu = () => {
    const dispatch = useAppDispatch();

    const optionMessage = useSelector((s) => s.chat.optionMessage);
    const [deleteMessage, {}] = useDeleteMessageMutation();

    const { visible, x, y, message } = optionMessage;
    if (!visible) return null;

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(chatActions.closeOptionMessage());
    };

    const handleMessageDelete = () => {
        if (optionMessage) {
            deleteMessage({ messageId: message.id });
            dispatch(chatActions.closeOptionMessage());
        }
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
                    <li
                        className="p-1 hover:bg-red-600 cursor-pointer"
                        onClick={handleMessageDelete}
                    >
                        Delete
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContextMenu;
