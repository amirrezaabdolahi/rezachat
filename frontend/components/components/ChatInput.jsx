"use client";
import { messagesData } from "@/fakeDatas";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatInput = () => {
    const [inputMessage, setInputMessage] = useState("");
    const currentChat = useSelector((state) => state.chat.selectedChat);
    const filteredChat = messagesData.data.filter(
        (chat) => chat.id === Number(currentChat)
    );

    const handleSendMessage = async () => {


        console.log(filteredChat[0].messages);

        filteredChat[0].messages.push({
            id: filteredChat[0].messages.length + 1,
            chat: 4,
            sender: "root",
            message: inputMessage,
            created_at: new Date().toLocaleString(),
        });
    };

    return (
        <div className="w-full flex gap-2 h-full p-2 ">
            <div className=" w-full h-full bg-white rounded-full text-end flex items-center p-2">
                <input
                    className="w-full h-full text-black outline-0"
                    value={inputMessage}
                    onChange={(e) => {
                        setInputMessage(e.target.value);
                    }}
                />
            </div>
            <button
                onClick={handleSendMessage}
                className="bg-white hover:bg-white/70 active:bg-white/80 active:scale-[0.9] transition-all text-black w-20 h-full rounded-full flex items-center justify-center cursor-pointer"
            >
                <Send />
            </button>
        </div>
    );
};

export default ChatInput;
