"use client";
import { chatActions } from "@/features/chat/slice/chatSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Message = ({ message }) => {
    const currentUser = useSelector((s) => s.user.currentUser);
    const isMe = message.sender === currentUser.id;
    const formatTime = (date) =>
        new Date(date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const dispatch = useAppDispatch();

    const handleMessageDoubleClick = (e, message) => {
        e.preventDefault();
        dispatch(chatActions.setSelectedsMessage(message));
    };

    const handleMessageRigthClick = (e, message) => {
        e.preventDefault();
        dispatch(
            chatActions.setOptionMessage({
                visible : true,
                x: e.clientX,
                y: e.clientY,
                message: message,
            }),
        );
        console.log(e);
    };

    return (
        <div
            key={message.id}
            className={`${message.content.length > 50 ? "w-150" : "w-max"} mt-2 p-2 px-4 text-sm select-none
                                        ${
                                            isMe
                                                ? "self-end bg-white text-black rounded-tl-full rounded-tr-full rounded-bl-full"
                                                : "self-start bg-black text-white rounded-tl-full rounded-tr-full rounded-br-full"
                                        }`}
            onDoubleClick={(e) => handleMessageDoubleClick(e, message)}
            onContextMenu={(e) => handleMessageRigthClick(e, message)}
        >
            <p>{message.content}</p>
            <small className="opacity-60">
                {formatTime(message.created_at)}
            </small>
        </div>
    );
};

export default Message;
