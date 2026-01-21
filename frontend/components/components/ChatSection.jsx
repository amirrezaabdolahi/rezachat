"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "@/features/chatSlice";
import { useGetMessagesQuery } from "@/features/chatApi";

const ChatSection = () => {
    const currentChat = useSelector((s) => s.chat.selectedChat);
    const currentUser = useSelector((s) => s.user.currentUser);

    const { data, isLoading, error } = useGetMessagesQuery(currentChat, {
        skip: !currentChat,
    });

    if (!currentChat) {
        return <p>no chat selected</p>;
    }

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>error loading messages</p>;

    if (data?.messages?.length <= 0) {
        return <p>no messages</p>;
    }

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="flex flex-col gap-2 overflow-y-auto h-full p-4">
            {data.messages.length === 0 && (
                <p className="text-center text-gray-400">No messages yet</p>
            )}
            {data.messages.map((message) => {
                const isMe = message.sender === currentUser.id;

                return (
                    <div
                        key={message.id}
                        className={`w-max mt-2 p-2 px-4 text-sm
            ${
                isMe
                    ? "self-end bg-white text-black rounded-tl-full rounded-tr-full rounded-bl-full"
                    : "self-start bg-black text-white rounded-tl-full rounded-tr-full rounded-br-full"
            }`}
                    >
                        <p>{message.content}</p>
                        <small className="opacity-60">
                            {formatTime(message.created_at)}
                        </small>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatSection;
