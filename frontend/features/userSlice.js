import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    contact: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setContact: (state, action) => {
            // if (action.payload.id === state.contact.id) {
            //     state.contact = null;
            // }
            state.contact = action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
