import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            if (action.payload == state.selectedChat) {
                state.selectedChat = null;
                return;
            }
            state.selectedChat = action.payload;
        },
    },
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
