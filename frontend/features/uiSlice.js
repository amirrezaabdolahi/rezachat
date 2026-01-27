import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    isSearching : false 
}



export const UiSlice = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        toggleIsSearching : (state , action) => {
            state.isSearching = action.payload
        }
    }
})


export const UIReducer = UiSlice.reducer