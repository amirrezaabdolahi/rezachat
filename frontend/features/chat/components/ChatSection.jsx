"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../../message/components/Message";
import { useGetMessagesQuery } from "@/features/message/api/messageApi";

const ChatSection = () => {
    const bottomRef = useRef(null);
    const currentChat = useSelector((s) => s.chat.selectedChat);
    const { data, isLoading, error, refetch } = useGetMessagesQuery(
        currentChat,
        {
            skip: !currentChat,
            pollingInterval: 2000,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            refetchOnReconnect: true,
        },
    );

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
            <button
                onClick={() => refetch()}
                className="absolute top-20 right-2"
            >
                <p className="bg-white/40 p-2 rounded-full hover:bg-white/50 active:bg-white/60">
                    refresh
                </p>
            </button>
            {data.messages.map((message) => {
                return <Message key={message.id} message={message} />;
            })}
            <div ref={bottomRef} />
        </>
    );
};

export default ChatSection;
