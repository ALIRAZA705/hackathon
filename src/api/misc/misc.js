import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {
    cuisineListURI, getDomains,
} from "../endpoints";

export const getCuisineList = (params) => {
    return getRequest(`${cuisineListURI}`);
}

export const getDomainName = (params) => {
    return getRequest(`${getDomains}`);
}

