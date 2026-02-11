import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/auth",
    }),
    endpoints: (builder) => {
        return {
            SigninUser: builder.mutation({
                query: (data) => ({
                    method: "POST",
                    url: "/signin",
                    body: data,
                }),
            }),
            SignupUser: builder.mutation({
                query: (data) => ({
                    method: "POST",
                    url: "/signup",
                    body: data,
                }),
            }),
        };
    },
});

export const { useSigninUserMutation, useSignupUserMutation } = UserAuthApi;
