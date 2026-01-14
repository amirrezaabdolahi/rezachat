import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 1,
    username: "root",
    email: "root@gmail.com",
    status: "online",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const userReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
