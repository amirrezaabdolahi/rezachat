import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const UserAuthApi = createApi({
    reducerPath : 'auth',
    baseQuery : fetchBaseQuery({
        baseUrl : "api/auth"
    }),
    endpoints:(builder) => {
        return {

        }
    }

})
