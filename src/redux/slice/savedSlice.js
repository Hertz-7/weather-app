import {createSlice , createSelector} from "@reduxjs/toolkit";

const savedSlice = createSlice({
    name : "Saved",
    initialState : [],
    reducers : {
        addtosaved : (state,action) => {
            console.log(action.payload.payload +" added to saved");
            state.push(action.payload)
        },
        removefromsaved : (state,action) => {
            const remcity = action.payload.payload;
            console.log(remcity +" removing from saved");
            state=state.filter((ele) => 
            ele.payload.toLowerCase()  !== remcity.toLowerCase());

        }

    }
});
export const getSaved = createSelector(
    state => state.saved,
    saved => saved);
export const {addtosaved, removefromsaved} = savedSlice.actions; 

export default savedSlice.reducer;