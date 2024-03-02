import { createSlice } from "@reduxjs/toolkit";
import {IMG_STORAGE_BASE_URL} from "../../config";

const initialState = {
    // user : null,
    // user_id : 1,
    // name: "aaa",
    // business: {}
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        setUser: (state, data) => {
            data = data.payload;
            if(data.profile_image &&  !data.profile_image.startsWith("blob")){
                data.profile_image = IMG_STORAGE_BASE_URL + data.profile_image;
            }
            state.user_id = data.id;
            state.name = data.firstName + " " + data.lastName;
            state.firstName = data.firstName;
            state.lastName = data.lastName;
            state.email = data.email;
            state.phone = data.phone_number;
            state.restaurant_address = data.restaurant_address;
            state.role = data.user_login_status ? data.user_login_status : "customer";
            // state.role = "super-admin";
            state.profile_picture = data.profile_image? data.profile_image : "https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png";
            state.user_status = data.user_status;
            state.register_from = data.register_from;
            state.email_verified_at = data.email_verified_at;
            // state.bussinessName = data.business_name;
            // state.businessType = data.business_type;
            // state.cuisineTypes = data.cuisine_type;
            // state.busines =  {};
        },
        setBusiness: (state, data) => {
            data = data.payload;
            if(data.business_image &&  !data.business_image.startsWith("blob")){
                data.business_image = IMG_STORAGE_BASE_URL + data.business_image;
            }
            state.busines_id =  data.id;
            state.busines_user_id = data.user_id;
            state.busines_business_name = data.business_name;
            state.busines_business_description = data.business_description;
            state.busines_business_image = data.business_image;
            state.busines_restaurant_address = data.restaurant_address;
            state.busines_starting_price = data.starting_price;
            state.busines_ordr_delivery_time = data.ordr_delivery_time;
            state.busines_business_type = data.business_type;
            state.busines_cuisine_types = data.cuisine_type;
        }
    }
})

export const { setUser, setBusiness } = userInfoSlice.actions;
export default userInfoSlice.reducer;
