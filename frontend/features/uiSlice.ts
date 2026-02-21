import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface UiState {
    isSearching : boolean
}

const initialState : UiState = {
    isSearching : false 
}



export const UiSlice = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        toggleIsSearching : (state , action : PayloadAction<boolean>) => {
            state.isSearching = action.payload
        }
    }
})



export const UiActions = UiSlice.actions
export const UIReducer = UiSlice.reducer