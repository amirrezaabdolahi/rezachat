import { userReducer } from "@/features/user/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { UserAuthApi } from "@/features/user/api/UserAuthApi";
import { chatReducer } from "@/features/chat/slice/chatSlice";
import { chatApi } from "@/features/chat/api/chatApi";
import { UIReducer } from "@/features/uiSlice";
import { uiApi } from "@/features/uiApi";
import { messageApi } from "@/features/message/api/messageApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        ui: UIReducer,
        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [uiApi.reducerPath]: uiApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            UserAuthApi.middleware,
            chatApi.middleware,
            messageApi.middleware,
            uiApi.middleware,
        );
    },
});

export default store;
