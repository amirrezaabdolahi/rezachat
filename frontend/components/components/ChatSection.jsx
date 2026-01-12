"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "@/features/chatSlice";

const ChatSection = ({ messagesData, user }) => {
    const currentChat = useSelector((state) => state.chat.selectedChat);
    const messages = useSelector((state) => state.chat.messages);
    const dispatch = useDispatch();

    if (!currentChat) {
        return (
            <div className="absolute left-0 right-0 bottom-0 top-0 flex items-center justify-center">
                <p>no chat seleted</p>
            </div>
        );
    }

    return (
        <div className="absolute left-0 right-0 bottom-0 p-4">
            {messages?.map((message) => (
                <React.Fragment key={message.id}>
                    {message.sender === user.username ? (
                        <div className="bg-white text-black mt-2 justify-self-end p-2 px-4 rounded-tl-full rounded-tr-full  rounded-bl-full ">
                            {message.message}
                        </div>
                    ) : (
                        <div className="bg-black text-white mt-2 justify-self-start p-2 px-4 rounded-tl-full rounded-tr-full  rounded-br-full  ">
                            {message.message}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ChatSection;
