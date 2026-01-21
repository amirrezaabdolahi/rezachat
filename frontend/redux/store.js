import { userReducer } from "@/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { UserAuthApi } from "@/features/UserAuthApi";
import { chatReducer } from "@/features/chatSlice";
import { chatApi } from "@/features/chatApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        chat : chatReducer,
        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
        [chatApi.reducerPath] : chatApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(UserAuthApi.middleware , chatApi.middleware);
    },
});

export default store;
