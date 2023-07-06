import {
    getRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {changePasswordReqURI, editUserProfileURI, forgotPasswordURI, loginURI, registerURI} from "../endpoints";

export const getLoginUser = (payload) => {
    return postRequest(loginURI, payload);
}

export const postRegisterUser = (payload) => {
    return postRequest(registerURI, payload);
}

export const postForgotPassword = (payload) => {
    return postRequest(forgotPasswordURI, payload);
}

export const postChangePasswordReq = (payload) => {
    return postRequest(changePasswordReqURI, payload);
}

export const postEditUserProfile = (payload) => {
    return postFormDataRequest(editUserProfileURI, payload);
}