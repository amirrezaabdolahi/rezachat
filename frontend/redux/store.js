import { userReducer } from "@/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { UserAuthApi } from "@/features/UserAuthApi";
import { chatReducer } from "@/features/chatSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        chat : chatReducer,
        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(UserAuthApi.middleware);
    },
});

export default store;
