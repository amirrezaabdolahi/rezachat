import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uiApi = createApi({
    reducerPath: "uiApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/users/`,
        credentials: "include",
    }),

    endpoints: (builder) => ({
        searchUsers: builder.query({
            query: (q) => ({
                url: `/?q=${q}`,
            }),
        }),
    }),
});

export const { useSearchUsersQuery, useLazySearchUsersQuery } = uiApi;
