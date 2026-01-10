import { userReducer } from "@/features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { UserAuthApi } from "@/features/UserAuthApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(UserAuthApi.middleware);
    },
});

export default store;
