import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";



interface UserState {
    currentUser: User | null
    contact: User | null
}

const initialState: UserState = {
    currentUser: null,
    contact: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
        setContact: (state, action: PayloadAction<User | null>) => {
            if (action.payload && action.payload.id === state.contact?.id) {
                state.contact = null;
                return;
            }
            state.contact = action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
