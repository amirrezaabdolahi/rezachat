import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Message } from "@/types/message"
import { User } from "@/types/user"

export interface ChatInfo {
    id: number
    name: string
    users: User[]
    created_at: string
}

export interface OptionMessage {
    visible: boolean
    x: number | null
    y: number | null
    message: Message | null
}

export interface ChatState {
    selectedChat: number | null
    chatInfo: ChatInfo | null
    messages: Message[]
    selectedMessages: Message[]
    optionMessage: OptionMessage
}

const initialState: ChatState = {
    selectedChat: null,
    chatInfo: null,
    messages: [],
    selectedMessages: [],
    optionMessage: {
        visible: false,
        x: null,
        y: null,
        message: null,
    },
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        selectChat: (state, action: PayloadAction<number | null>) => {
            if (action.payload === state.selectedChat) {
                state.selectedChat = null
                state.chatInfo = null
                state.messages = []
                return
            }
            state.selectedChat = action.payload
        },

        selectChatInfo: (state, action: PayloadAction<ChatInfo>) => {
            if (state.selectedChat !== null) {
                state.chatInfo = action.payload
            }
        },

        setMessages: (state, action: PayloadAction<Message[]>) => {
            if (state.selectedChat === null) {
                state.messages = []
                return
            }
            state.messages = action.payload
        },

        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },

        setSelectedMessage: (state, action: PayloadAction<Message>) => {
            const exists = state.selectedMessages.some(
                (msg) => msg.id === action.payload.id
            )
            if (!exists) state.selectedMessages.push(action.payload)
        },

        setOptionMessage: (state, action: PayloadAction<OptionMessage>) => {
            const { visible, x, y, message } = action.payload

            if (state.optionMessage.message?.id === message?.id) {
                state.optionMessage = {
                    visible: false,
                    x: null,
                    y: null,
                    message: null,
                }
                return
            }

            state.optionMessage = { visible, x, y, message }
        },

        closeOptionMessage: (state) => {
            state.optionMessage = {
                visible: false,
                x: null,
                y: null,
                message: null,
            }
        },
    },
})

export const chatReducer = chatSlice.reducer
export const chatActions = chatSlice.actions