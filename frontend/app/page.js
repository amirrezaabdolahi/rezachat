import ChatHeader from "@/components/components/ChatHeader";
import UserSiderBar from "@/components/components/UserSiderBar";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import Image from "next/image";

const user = {
    id: 1,
    username: "root",
    email: "amirenzevadev@gmail.com",
    status: "online",
};

export default function Home() {
    return (
        <div className="container w-full mx-auto h-screen flex items-center">
            <div className="grid grid-cols-12 w-full h-[90%] gap-4">
                {/* sideBar for choose the the contact */}
                <UserSiderBar />

                {/* main chat view */}
                <div className="col-span-9 grid grid-cols-1 gap-4 grid-rows-10 w-full h-full bg-white/10 rounded-lg p-2">

                    {/* chat header profile bar */}
                    <ChatHeader user={user} />

                    {/* chat view chat room */}
                    <div className="bg-white/20 col-span-1 row-span-9 rounded-lg relative chat-main overflow-hidden ">
                        
                    </div>

                </div>
            </div>
        </div>
    );
}
