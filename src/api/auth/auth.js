import {
    getRequest,
    postRequest
} from "../methodCalls";
import {loginURI, registerURI} from "../endpoints";

export const getLoginUser = (payload) => {
    return postRequest(loginURI, payload);
}

export const postRegisterUser = (payload) => {
    return postRequest(registerURI, payload);
}
