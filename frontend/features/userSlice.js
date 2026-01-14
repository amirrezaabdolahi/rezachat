import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 3,
    username: "ali",
    email: "ali@gmail.com",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const userReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
