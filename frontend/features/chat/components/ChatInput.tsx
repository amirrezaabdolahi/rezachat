"use client";

import { useSendMessageMutation } from "@/features/message/api/messageApi";
import { emojis } from "@/lib/imojisData";
import { useAppSelector } from "@/redux/hooks";
import { Send } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";

const ChatInput: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isEmojiPanelOpen, setIsEmojiPanelOpen] = useState<boolean>(false);
  const currentChat = useAppSelector((state) => state.chat.selectedChat);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const emojiGroups = useMemo(
    () => emojis.map((group) => group.icons),
    []
  );

  const trimmedMessage = inputMessage.trim();
  const isSendDisabled = !currentChat || !trimmedMessage || isLoading;

  const handleSendMessage = async () => {
    if (isSendDisabled || !currentChat) return;

    try {
      await sendMessage({
        chatId: currentChat,
        content: trimmedMessage,
      }).unwrap();
      setInputMessage("");
      setIsEmojiPanelOpen(false);
    } catch (err) {
      console.error("send message failed", err);
    }
  };

  const handleEmojiPanelToggle = () => {
    setIsEmojiPanelOpen((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-40 flex h-20 w-full gap-2 rounded-lg bg-black/20 p-2 backdrop-blur-2xl">
        <div className="flex h-full w-full items-center rounded-full bg-white p-2 text-end">
          <input
            className="h-full w-full text-black outline-0"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Message"
            onKeyDown={handleInputKeyDown}
            aria-label="Type a message"
          />
        </div>
        <button
          type="button"
          onClick={handleEmojiPanelToggle}
          className="flex h-full w-20 cursor-pointer items-center justify-center rounded-full bg-white text-2xl text-black transition-all hover:bg-white/70 active:scale-[0.9] active:bg-white/80"
          aria-label={isEmojiPanelOpen ? "Close emoji panel" : "Open emoji panel"}
        >
          {"\uD83D\uDE00"}
        </button>
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={isSendDisabled}
          className="flex h-full w-20 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-all hover:bg-white/70 active:scale-[0.9] active:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send />
        </button>
      </div>

      <div
        className={`absolute right-0 h-auto w-100 rounded-lg bg-black/50 p-4 transition-all duration-300 ${
          isEmojiPanelOpen
            ? "bottom-20 scale-100 opacity-100 backdrop-blur-xl"
            : "bottom-0 scale-0 opacity-0 backdrop-blur-sm"
        }`}
      >
        <button
          type="button"
          className="w-full cursor-pointer text-end"
          onClick={handleEmojiPanelToggle}
          aria-label="Close emoji panel"
        >
          {"\u274C"}
        </button>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            {emojiGroups.map((icons, index) => (
              <div
                key={index}
                className="grid w-full grid-cols-6 items-center justify-center border-b py-2"
              >
                {icons.map((icon) => (
                  <button
                    type="button"
                    key={icon.id}
                    className="cursor-pointer text-center text-xl"
                    onClick={() => setInputMessage((prev) => prev + icon.icon)}
                    aria-label="Add emoji"
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
