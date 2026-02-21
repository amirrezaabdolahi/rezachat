export interface Message {
    id: number,
    content: string,
    created_at: string,
    is_deleted: boolean,
    is_edited: boolean,
    chat: number,
    sender: number,
}


//             "id": 28,
//             "content": "hi this is root",
//             "created_at": "2026-01-22T14:27:08.943487Z",
//             "is_deleted": false,
//             "is_edited": false,
//             "chat": 7,
//             "sender": 1
