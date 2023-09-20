import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId : null
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        setUser: (state, data) => {
            state.userId = data.id;
            state.name = data.first_name + " " + data.lastName;
            state.email = data.email;
            state.phone = data.phone;
            state.location = data.location;
            state.role = data.type;
            state.profilePicture = data.img? data.img : "https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png";
            state.bussinessName = data.business_name;
            state.businessType = data.business_type;
            state.cuisineTypes = data.cuisine_types;
        }
    }
})

export const { setUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
