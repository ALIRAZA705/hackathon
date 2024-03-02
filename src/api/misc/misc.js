import {
    deleteRequest,
    getRequest, patchRequest, postFormDataRequest,
    postRequest
} from "../methodCalls";
import {
    addNewDomainURI,
    cuisineListURI, getDomainDataByIdURI, getDomains,
} from "../endpoints";

export const getCuisineList = (params) => {
    return getRequest(`${cuisineListURI}`);
}

export const getDomainName = (params) => {
    return getRequest(`${addNewDomainURI}`);
}

export const getDomainDataById = (id) => {
    console.log("id herear", id)
    return getRequest(getDomainDataByIdURI+"/"+id);
}


