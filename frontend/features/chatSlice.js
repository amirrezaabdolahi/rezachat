import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
    chatInfo: {},
    messages: [],
    selectedMessages: [],
    optionMessage: {
        visible: false,
        x: null,
        y: null,
        message: null,
    },
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        selectChat: (state, action) => {
            if (action.payload == state.selectedChat) {
                state.selectedChat = null;
                state.chatInfo = {};
                return;
            }
            state.selectedChat = action.payload;
        },
        selectChatInfo: (state, action) => {
            if (state.selectedChat) {
                state.chatInfo = action.payload;
            }
        },
        messages: (state, action) => {
            if (state.selectedChat === null) {
                state.messages = [];
                return;
            }
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setSelectedsMessage: (state, action) => {
            const message = action.payload;

            const condition = state.selectedMessages.findIndex(
                (msg) => Number(msg.id) === message.id,
            );

            if (condition >= 0) {
                return;
            } else {
                state.selectedMessages.push(message);
            }
        },
        setOptionMessage: (state, action) => {
            const { visible, x, y, message } = action.payload;

            if (state.optionMessage?.message?.id === message.id) {
                state.optionMessage = {
                    visible: false,
                    x: null,
                    y: null,
                    message: null,
                };
                return;
            }

            state.optionMessage = { visible, x, y, message };
        },
        closeOptionMessage: (state) => {
            state.optionMessage = {
                visible: false,
                x: null,
                y: null,
                message: null,
            };
        },
    },
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
