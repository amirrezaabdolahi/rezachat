import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/message",
    }),
    tagTypes: ["Messages"],
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
        deleteMessage: builder.mutation({
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
