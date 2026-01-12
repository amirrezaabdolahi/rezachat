import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
    messages: [],
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
        messages: (state, action) => {
            if (state.selectedChat === null) {
                state.messages = [];
                return;
            }
            state.messages = action.payload;
        },
        addMessage : (state , action) => {
            state.messages.push(action.payload)
        }
    },
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
