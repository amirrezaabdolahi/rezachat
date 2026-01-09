import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

const ChatHeader = ({user}) => {
    return (
        <div className="bg-white/30 col-span-1 row-span-1 rounded-lg p-2">
            <div className="flex items-center justify-between w-full h-full select-none">
                <div className="bg-white/40 p-2 rounded-full hover:bg-white/50 active:bg-white/60">
                    <ArrowLeft />
                </div>
                <div className="w-13 h-13 rounded-full relative bg-white/40 flex items-center justify-center object-cover ">
                    {user.profile ? (
                        <Image
                            src={user.profile}
                            alt={"user profile image"}
                            className="w-full h-full rounded-full"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={"/profile.jpg"}
                            alt={"user profile image"}
                            className="w-full h-full rounded-full"
                            width={100}
                            height={100}
                        />
                    )}

                    {user.status === "online" ? (
                        <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-1 rounded-full" />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
