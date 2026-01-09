import { Send } from "lucide-react";
import React from "react";

const ChatInput = () => {
    return (
        <div className="w-full flex gap-2 h-full p-2 ">
            <div className=" w-full h-full bg-white rounded-full text-end flex items-center p-2">
                <input className="w-full h-full text-black outline-0" />
            </div>
            <div className="bg-white text-black w-20 h-full rounded-full flex items-center justify-center cursor-pointer">
                <Send />
            </div>
        </div>  
    );
};

export default ChatInput;
