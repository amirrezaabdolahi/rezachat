import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "@/features/user/slice/userSlice"
import { chatReducer } from "@/features/chat/slice/chatSlice"
import { UIReducer } from "@/features/uiSlice"

import { UserAuthApi } from "@/features/user/api/UserAuthApi"
import { chatApi } from "@/features/chat/api/chatApi"
import { messageApi } from "@/features/message/api/messageApi"
import { uiApi } from "@/features/uiApi"

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        ui: UIReducer,

        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        [uiApi.reducerPath]: uiApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            UserAuthApi.middleware,
            chatApi.middleware,
            messageApi.middleware,
            uiApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch