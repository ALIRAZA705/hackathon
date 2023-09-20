import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {
    cuisineListURI,
} from "../endpoints";

export const getCuisineList = (params) => {
    return getRequest(`${cuisineListURI}`);
}

