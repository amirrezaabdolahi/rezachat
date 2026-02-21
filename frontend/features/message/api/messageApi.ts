import { Chat } from "@/types/chat";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SendMessagePayload {
    chatId: number
    content: string
}

interface DeleteMessagePayload {
    messageId: number
}


export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/message",
    }),
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        getMessages: builder.query<Chat, number>({
            query: (chatId) => `/${chatId}/`,
            providesTags: (result, error, chatId) => [
                { type: "Messages", id: chatId },
            ],
        }),
        sendMessage: builder.mutation<Chat, SendMessagePayload>({
            query: ({ chatId, content }) => ({
                url: `/${chatId}/`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: (result, error, { chatId }) => [
                { type: "Messages", id: chatId },
            ],
        }),
        deleteMessage: builder.mutation<Chat, DeleteMessagePayload>({
            query: ({ messageId }) => ({
                url: `/message/${messageId}/`,
                method: "POST",
            }),
            invalidatesTags: ["Messages"],
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useDeleteMessageMutation,
} = messageApi;
