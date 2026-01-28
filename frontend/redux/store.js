import { userReducer } from "@/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { UserAuthApi } from "@/features/UserAuthApi";
import { chatReducer } from "@/features/chatSlice";
import { chatApi } from "@/features/chatApi";
import { UIReducer } from "@/features/uiSlice";
import { uiApi } from "@/features/uiApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        ui: UIReducer,
        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [uiApi.reducerPath]: uiApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            UserAuthApi.middleware,
            chatApi.middleware,
            uiApi.middleware
        );
    },
});

export default store;
