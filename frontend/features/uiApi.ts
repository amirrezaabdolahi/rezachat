import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SearchUsersResponse {
    id: number
    username: string
    email: string
}

export const uiApi = createApi({
    reducerPath: "uiApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/users/`,
        credentials: "include",
    }),

    endpoints: (builder) => ({
        searchUsers: builder.query<SearchUsersResponse[], string>({
            query: (q) => ({
                url: `/?q=${q}`,
            }),
        }),
    }),
});

export const { useSearchUsersQuery, useLazySearchUsersQuery } = uiApi;
