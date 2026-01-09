import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name : 'amir'
}


const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {

    }
})


export const userReducer = userSlice.reducer
export const userSliceActions = userSlice.actions

