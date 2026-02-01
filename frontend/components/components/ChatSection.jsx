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
        return <p>no chat selected</p>;
    }
    if (isLoading) return <p>loading...</p>;
    if (error) return <p>error loading messages</p>;
    if (data?.messages?.length <= 0) {
        return <p>no messages</p>;
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
