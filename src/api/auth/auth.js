import {
    getRequest,
    postRequest
} from "../methodCalls";
import {loginURI, registerURI} from "../endpoints";

export const getLoginUser = () => {
    return getRequest(loginURI);
}

export const postRegisterUser = () => {
    return postRequest(registerURI);
}
