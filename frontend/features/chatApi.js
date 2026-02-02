// features/chatApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/chat",
        credentials: "include",
    }),
    tagTypes: ["Messages", "Chats"],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (chatId) => `/${chatId}/`,
            providesTags: (result, error, chatId) => [
                { type: "Messages", id: chatId },
            ],
        }),

        sendMessage: builder.mutation({
            query: ({ chatId, content }) => ({
                url: `/${chatId}/`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: (result, error, { chatId }) => [
                { type: "Messages", id: chatId },
            ],
        }),

        createChat: builder.mutation({
            query: ({ targetId }) => ({
                url: `/create/`,
                method: "POST",
                body: { targetId },
            }),
            invalidatesTags: ["Chats"],
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useCreateChatMutation,
} = chatApi;
