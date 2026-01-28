import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uiApi = createApi({
    reducerPath: "uiApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://127.0.0.1:8080/api/`,
        credentials: "include",
        headers: {
            "Authorization": "Token 7abd237c0de76bd1877fc38c6bd0eec943cc6827",
        },
    }),

    endpoints: (builder) => ({
        searchUsers: builder.query({
            query: (q) => `accounts/search-user/?q=${q}`,
        }),
    }),
});

export const { useSearchUsersQuery , useLazySearchUsersQuery } = uiApi;
