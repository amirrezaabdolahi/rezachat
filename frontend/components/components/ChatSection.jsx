"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "@/features/chatSlice";
import { useGetMessagesQuery } from "@/features/chatApi";
import Message from "./Message";

const ChatSection = () => {
    const bottomRef = useRef(null);
    const currentChat = useSelector((s) => s.chat.selectedChat);
    const { data, isLoading, error } = useGetMessagesQuery(currentChat, {
        skip: !currentChat,
    });

    useEffect(() => {
        if (!data?.messages?.length) return;

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [data?.messages?.length]);

    if (!currentChat) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <p>no chat selected</p>
            </div>
        );
    }
    if (isLoading)
        return (
            <div className="flex w-full h-full items-center justify-center">
                <p>loading...</p>
            </div>
        );
    if (error)
        return (
            <div className="flex w-full h-full items-center justify-center">
                <p>error loading messages</p>
            </div>
        );
    if (data?.messages?.length <= 0) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <p>no messages</p>;
            </div>
        );
    }

    return (
        <>
            {data.messages.map((message) => {
                return <Message key={message.id} message={message} />;
            })}
            <div ref={bottomRef} />
        </>
    );
};

export default ChatSection;
