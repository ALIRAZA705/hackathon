import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // user : null,
    userId : 1,
    name: "aaa",
    email: "ada@mail.com"
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        setUser: (state, data) => {
            data = data.payload;
            state.userId = data.id;
            state.name = data.first_name + " " + data.last_name;
            state.email = data.email;
            state.phone = data.phone_number;
            state.restaurant_address = data.restaurant_address;
            state.role = data.type? data.type : "super-admin";
            state.profilePicture = data.img? data.img : "https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png";
            state.bussinessName = data.business_name;
            state.businessType = data.business_type;
            state.cuisineTypes = data.cuisine_type;
        }
    }
})

export const { setUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
