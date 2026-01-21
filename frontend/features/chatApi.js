// features/chatApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/chat",
        credentials: "include",
    }),
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (chatId) => `/${chatId}/`,
            providesTags: (result, error, chatId) => [
                { type: "Messages", id: chatId },
            ],
        }),
        sendMessages: builder.mutation({
            query: ({ chatId, content }) => ({
                url: `/${chatId}/`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: (result, error, { chatId }) => [
                { type: "Messages", id: chatId },
            ],
        }),
    }),
});

export const { useGetMessagesQuery , useSendMessagesMutation } = chatApi;
