// features/chatApi.js
import { Chat, GetChatsResponse } from "@/types/chat";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateChatPayload {
    targetId: number
}


export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/chat",
        credentials: "include",
    }),
    tagTypes: ["Messages", "Chats"],
    endpoints: (builder) => ({
        getChats: builder.query<GetChatsResponse, void>({
            query: () => `/chats`,
            providesTags: ["Chats"],
        }),
        createChat: builder.mutation<Chat, CreateChatPayload>({
            query: ({ targetId }) => ({
                url: `/create`,
                method: "POST",
                body: { targetId },
            }),
            invalidatesTags: ["Chats"],
        }),
    }),
});

export const { useGetChatsQuery, useCreateChatMutation } = chatApi;
