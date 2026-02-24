import { Message } from "./message";
import { User } from "./user";

export interface Chat {
    id: number;
    name: string | null,
    users: User[],
    created_at: string,
    messages?: Message[]
}

export interface GetChatResponeseChat {
    id: number;
    name: string | null,
    users: User[],
    created_at: string,
}

export interface GetChatsResponse {
    user: User
    chats?: GetChatResponeseChat[] | null
}


//             "id": 7,
//             "name": "first posted chat room",
//             "users": [
//                 {
//                     "id": 1,
//                     "username": "root",
//                     "email": "root@gmail.com"
//                 },
//                 {
//                     "id": 3,
//                     "username": "amirreza",
//                     "email": ""
//                 },
//                 {
//                     "id": 5,
//                     "username": "hamid",
//                     "email": "hamid@gmail.com"
//                 }
//             ],
//             "created_at": "2026-01-22T14:24:19.499577Z"
//         },
//         "messages": [
//             {
//                 "id": 28,
//                 "content": "hi this is root",
//                 "created_at": "2026-01-22T14:27:08.943487Z",
//                 "is_deleted": false,
//                 "is_edited": false,
//                 "chat": 7,
//                 "sender": 1
//              },
//              {
//                  "id": 29,
//                  "content": "hi root this is amirreza",
//                  "created_at": "2026-01-22T14:29:25.708904Z",
//                  "is_deleted": false,
//                  "is_edited": false,
//                  "chat": 7,
//                  "sender": 3
//              }
//          ]