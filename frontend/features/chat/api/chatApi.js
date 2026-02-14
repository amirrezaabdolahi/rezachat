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
        getChats: builder.query({
            query: () => `/chats`,
            providesTags: ["Chats"],
        }),
        createChat: builder.mutation({
            query: ({ targetId }) => ({
                url: `/create`,
                method: "POST",
                body: { targetId },
            }),
            invalidatesTags: ["Chats"],
        }),
    }),
});

export const {
    useGetChatsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
    useCreateChatMutation,
    useDeleteMessageMutation,
} = chatApi;
