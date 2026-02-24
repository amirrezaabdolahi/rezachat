"use client";

import { useSendMessageMutation } from "@/features/message/api/messageApi";
import { emojis } from "@/lib/imojisData";
import { useAppSelector } from "@/redux/hooks";
import { Send } from "lucide-react";
import React, { useState, ChangeEvent, KeyboardEvent } from "react"

const ChatInput: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const currentChat = useAppSelector((state) => state.chat.selectedChat); // number | null

  const [emojisType, setEmojisType] = useState("all");
  const [emoji, setEmoji] = useState(() =>
    emojis
      .filter((obj) => emojisType === "all" || obj.type === emojisType)
      .map((obj) => obj.icons)
  );

  const [isEmojiPanelOpen, setIsEmojiPanelOpen] = useState<boolean>(false);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (!currentChat || !inputMessage.trim()) return;

    try {
      await sendMessage({
        chatId: currentChat,
        content: inputMessage,
      }).unwrap();

      setInputMessage("");
    } catch (err) {
      console.error("send message failed", err);
    }
  };

  const handleImojiPanelOpen = () => setIsEmojiPanelOpen((prev) => !prev);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputMessage(e.target.value);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <>
      <div className="w-full flex gap-2 h-20 p-2 absolute bottom-0 right-0 left-0 bg-black/20 z-40 backdrop-blur-2xl rounded-lg ">
        <div className=" w-full h-full bg-white rounded-full text-end flex items-center p-2">
          <input
            className="w-full h-full text-black outline-0"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Message"
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <button
          onClick={handleImojiPanelOpen}
          className="bg-white hover:bg-white/70 active:bg-white/80 active:scale-[0.9] transition-all text-black w-20 h-full rounded-full flex items-center justify-center cursor-pointer text-2xl"
        >
          😀
        </button>
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-white hover:bg-white/70 active:bg-white/80 active:scale-[0.9] transition-all text-black w-20 h-full rounded-full flex items-center justify-center cursor-pointer"
        >
          <Send />
        </button>
      </div>

      <div
        className={`absolute right-0 w-100 h-auto bg-black/50 transition-all duration-300 rounded-lg  p-4
         ${
           isEmojiPanelOpen
             ? "bottom-20 scale-100 opacity-100 backdrop-blur-xl"
             : "bottom-0 scale-0 opacity-0 backdrop-blur-sm"
         }`}
      >
        <div
          className="w-full text-end cursor-pointer "
          onClick={handleImojiPanelOpen}
        >
          ❌
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            {emoji.map((icons, index) => (
              <div
                key={index}
                className="w-full grid grid-cols-6 border-b items-center justify-center py-2"
              >
                {icons.map((icon) => (
                  <button
                    key={icon.id}
                    className="text-xl text-center cursor-pointer"
                    onClick={() => setInputMessage((prev) => prev + icon.icon)}
                  >
                    {icon.icon}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInput;