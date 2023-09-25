    import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./state/userInfo";

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(userApi.middleware)

})
